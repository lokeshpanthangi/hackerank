const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@deepgram/sdk');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for room participants
const rooms = new Map();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('public'));

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Deepgram API key from environment variables
const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

// Initialize Deepgram client
const deepgram = createClient(deepgramApiKey);

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  // Generate a unique ID for this client
  const clientId = uuidv4();
  
  // Parse URL to get query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomName = url.searchParams.get('room') || 'default-room';
  const identity = url.searchParams.get('identity') || 'anonymous';
  
  console.log(`New connection: ${identity} (${clientId}) joined room ${roomName}`);
  
  // Initialize room if it doesn't exist
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Map());
  }
  
  // Add this client to the room
  const room = rooms.get(roomName);
  room.set(clientId, {
    ws,
    identity,
    isAlive: true
  });
  
  // Setup ping/pong for connection health monitoring
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  
  // Send room info to the client
  ws.send(JSON.stringify({
    type: 'room-info',
    roomName,
    clientId,
    participants: Array.from(room.values()).map(p => p.identity)
  }));
  
  // Broadcast to room that a new participant joined
  broadcastToRoom(roomName, clientId, {
    type: 'participant-joined',
    identity,
    clientId
  });
  
  // Set up Deepgram transcription for this client
  setupRealtimeTranscription(ws, roomName, identity, clientId);
  
  // Handle WebRTC signaling
  setupWebRTCSignaling(ws, roomName, clientId);
  
  // Handle client disconnect
  ws.on('close', () => {
    console.log(`Connection closed: ${identity} (${clientId}) left room ${roomName}`);
    
    // Remove client from room
    if (rooms.has(roomName)) {
      rooms.get(roomName).delete(clientId);
      
      // Broadcast to room that a participant left
      broadcastToRoom(roomName, clientId, {
        type: 'participant-left',
        identity,
        clientId
      });
      
      // Remove room if empty
      if (rooms.get(roomName).size === 0) {
        rooms.delete(roomName);
        console.log(`Room ${roomName} is now empty and has been removed`);
      }
    }
  });
});

// Function to set up real-time transcription with Deepgram
function setupRealtimeTranscription(ws, roomName, identity, clientId) {
  console.log(`Setting up real-time transcription for ${identity} in room ${roomName}`);
  
  // Create a Deepgram WebSocket connection
  const dgSocket = deepgram.transcription.live({
    punctuate: true,
    smart_format: true,
    model: 'nova-2',
    language: 'en',
    encoding: 'linear16',
    sample_rate: 16000,
    channels: 1,
    interim_results: true
  });
  
  // When the Deepgram socket is open, notify the client
  dgSocket.addListener('open', () => {
    console.log(`Deepgram connection open for ${identity}`);
    ws.send(JSON.stringify({ 
      type: 'can-open-mic',
      message: 'Deepgram connection is ready to receive audio'
    }));
  });
  
  // Handle audio data from client
  ws.on('message', (message) => {
    try {
      // Check if message is a string (control message) or binary (audio data)
      if (message instanceof Buffer) {
        // Forward audio data to Deepgram if connection is open
        if (dgSocket.getReadyState() === WebSocket.OPEN) {
          dgSocket.send(message);
        }
      } else {
        // Parse control messages
        const data = JSON.parse(message.toString());
        
        if (data.type === 'ice-candidate' || data.type === 'video-offer' || data.type === 'video-answer') {
          // WebRTC signaling messages are handled by setupWebRTCSignaling
          return;
        }
      }
    } catch (error) {
      console.error(`Error processing message from ${identity}:`, error);
    }
  });
  
  // Handle transcription results from Deepgram
  dgSocket.addListener('transcriptReceived', (transcription) => {
    try {
      const data = JSON.parse(transcription);
      
      // Check if we have valid transcript data
      if (data.channel && 
          data.channel.alternatives && 
          data.channel.alternatives.length > 0) {
        
        const transcript = data.channel.alternatives[0].transcript;
        
        // Only process non-empty transcripts
        if (transcript && transcript.trim()) {
          // Create transcript message
          const transcriptMessage = {
            type: 'transcript-result',
            speaker: identity,
            text: transcript,
            is_final: data.is_final,
            timestamp: new Date().toISOString()
          };
          
          // Send to the client who is speaking
          ws.send(JSON.stringify(transcriptMessage));
          
          // Only broadcast final transcripts to avoid cluttering
          if (data.is_final) {
            // Broadcast to all other clients in the room
            broadcastToRoom(roomName, clientId, transcriptMessage);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing Deepgram transcription for ${identity}:`, error);
    }
  });
  
  // Handle Deepgram errors
  dgSocket.addListener('error', (error) => {
    console.error(`Deepgram error for ${identity}:`, error);
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Deepgram encountered an error'
    }));
  });
  
  // Handle Deepgram connection close
  dgSocket.addListener('close', () => {
    console.log(`Deepgram connection closed for ${identity}`);
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Deepgram connection closed'
    }));
  });
  
  // Handle client disconnect to clean up Deepgram connection
  ws.on('close', () => {
    if (dgSocket.getReadyState() === WebSocket.OPEN) {
      dgSocket.finish();
    }
  });
}

// Function to set up WebRTC signaling
function setupWebRTCSignaling(ws, roomName, clientId) {
  ws.on('message', (message) => {
    try {
      // Only process string messages for signaling
      if (message instanceof Buffer) return;
      
      const data = JSON.parse(message.toString());
      
      // Handle WebRTC signaling messages
      if (data.type === 'video-offer' || data.type === 'video-answer' || data.type === 'ice-candidate') {
        // Forward the message to the target client
        const targetClientId = data.target;
        
        if (targetClientId && rooms.has(roomName) && rooms.get(roomName).has(targetClientId)) {
          const targetClient = rooms.get(roomName).get(targetClientId);
          
          if (targetClient.ws.readyState === WebSocket.OPEN) {
            targetClient.ws.send(JSON.stringify({
              ...data,
              source: clientId
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error processing WebRTC signaling message:', error);
    }
  });
}

// Function to broadcast message to all clients in a room except the sender
function broadcastToRoom(roomName, senderClientId, message) {
  if (!rooms.has(roomName)) return;
  
  const room = rooms.get(roomName);
  room.forEach((client, clientId) => {
    if (clientId !== senderClientId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message));
    }
  });
}

// Set up ping interval to keep connections alive
const pingInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// Clean up interval on server close
wss.on('close', () => {
  clearInterval(pingInterval);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Deepgram transcription server running on port ${PORT}`);
});
