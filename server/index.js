const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { AccessToken } = require('twilio').jwt;
const VideoGrant = AccessToken.VideoGrant;
const axios = require('axios');
// const { createClient } = require('@deepgram/sdk'); // Removed - no longer using Deepgram
const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');
const http = require('http');

// Load environment variables
dotenv.config({ path: __dirname + '/.env' });
console.log('Environment variables loaded from:', __dirname + '/.env');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://127.0.0.1:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Twilio credentials from environment variables
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySid = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

// Deepgram variables removed - now using browser-based speech recognition
// const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
// const deepgram = createClient(deepgramApiKey);
// const deepgramSockets = {};

// AssemblyAI credentials from environment variables
const assemblyApiKey = process.env.ASSEMBLY_API_KEY;

// In-memory store for transcripts (use a database in production)
const transcripts = {};

// Endpoint to generate Twilio access token
app.post('/api/twilio/token', (req, res) => {
  const { identity, roomName } = req.body;
  
  if (!identity || !roomName) {
    return res.status(400).json({ error: 'Identity and room name are required' });
  }

  try {
    console.log('Generating Twilio token with credentials:');
    console.log('Account SID:', twilioAccountSid);
    console.log('API Key SID:', twilioApiKeySid);
    console.log('For identity:', identity);
    console.log('Room name:', roomName);
    
    // Create an access token
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySid,
      twilioApiKeySecret,
      { identity }
    );

    // Create a video grant and add it to the token
    const videoGrant = new VideoGrant({ room: roomName });
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    const tokenString = token.toJwt();
    console.log('Token generated successfully');
    
    res.json({
      token: tokenString,
      identity,
      roomName
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ 
      error: 'Failed to generate token',
      message: error.message,
      details: JSON.stringify(error)
    });
  }
});

// Endpoint to get AssemblyAI real-time transcription token
app.get('/api/assembly/token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.assemblyai.com/v2/realtime/token',
      { expires_in: 3600 }, // 1 hour token
      {
        headers: {
          'Authorization': assemblyApiKey,
          'Content-Type': 'application/json',
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting AssemblyAI token:', error);
    res.status(500).json({ error: 'Failed to get transcription token' });
  }
});

// Endpoint to transcribe audio file
app.post('/api/assembly/transcribe', async (req, res) => {
  const { audioUrl } = req.body;
  
  if (!audioUrl) {
    return res.status(400).json({ error: 'Audio URL is required' });
  }
  
  try {
    // Submit the audio file for transcription
    const submitResponse = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      {
        audio_url: audioUrl,
        speaker_labels: true,
        language_code: 'en_us'
      },
      {
        headers: {
          'Authorization': assemblyApiKey,
          'Content-Type': 'application/json',
        }
      }
    );
    
    const transcriptId = submitResponse.data.id;
    res.json({ transcriptId, status: 'processing' });
  } catch (error) {
    console.error('Error submitting transcription:', error);
    res.status(500).json({ error: 'Failed to submit transcription' });
  }
});

// Endpoint to check transcription status
app.get('/api/assembly/transcript/:transcriptId', async (req, res) => {
  const { transcriptId } = req.params;
  
  try {
    const response = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      {
        headers: {
          'Authorization': assemblyApiKey,
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error checking transcription:', error);
    res.status(500).json({ error: 'Failed to check transcription' });
  }
});

// Deepgram endpoint removed - now using browser-based speech recognition
// app.get('/api/deepgram/token', async (req, res) => {
//   // This endpoint is no longer needed since we're using Web Speech API
//   res.status(404).json({ error: 'Deepgram integration has been replaced with browser-based speech recognition' });
// });

// Deepgram stream endpoint removed - now using browser-based speech recognition
// app.post('/api/deepgram/stream', (req, res) => {
//   // This endpoint is no longer needed since we're using Web Speech API
//   res.status(404).json({ error: 'Deepgram integration has been replaced with browser-based speech recognition' });
// });

// Endpoint to get all transcripts for a room
app.get('/api/transcripts/:roomId', (req, res) => {
  const { roomId } = req.params;
  
  if (!transcripts[roomId]) {
    transcripts[roomId] = [];
  }
  
  res.json(transcripts[roomId]);
});

// Endpoint to add a transcript to a room
app.post('/api/transcripts/:roomId', (req, res) => {
  const { roomId } = req.params;
  const { speaker, text } = req.body;
  
  if (!speaker || !text) {
    return res.status(400).json({ error: 'Speaker and text are required' });
  }
  
  if (!transcripts[roomId]) {
    transcripts[roomId] = [];
  }
  
  const transcriptLine = {
    id: uuidv4(),
    speaker,
    text,
    timestamp: new Date().toISOString()
  };
  
  transcripts[roomId].push(transcriptLine);
  
  // Broadcast to all connected WebSocket clients for this room
  broadcastToRoom(roomId, {
    type: 'transcript',
    line: transcriptLine
  });
  
  res.status(201).json(transcriptLine);
});

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// WebSocket connections by room
const roomConnections = {};

// Set up ping interval to keep connections alive
const pingInterval = setInterval(() => {
  console.log('Performing WebSocket health check...');
  let totalClients = 0;
  let closedConnections = 0;
  
  Object.keys(roomConnections).forEach(roomId => {
    roomConnections[roomId].forEach((ws, clientId) => {
      totalClients++;
      
      if (ws.isAlive === false) {
        console.log(`Client ${clientId} in room ${roomId} is not responding, terminating connection`);
        ws.terminate();
        roomConnections[roomId].delete(clientId);
        closedConnections++;
        return;
      }
      
      ws.isAlive = false;
      try {
        ws.ping();
      } catch (error) {
        console.error(`Error pinging client ${clientId}:`, error);
        ws.terminate();
        roomConnections[roomId].delete(clientId);
        closedConnections++;
      }
    });
    
    // Clean up empty rooms
    if (roomConnections[roomId].size === 0) {
      console.log(`Room ${roomId} is now empty after health check, removing room`);
      delete roomConnections[roomId];
    }
  });
  
  console.log(`WebSocket health check complete: ${totalClients} total clients, ${closedConnections} connections closed`);
}, 30000); // Check every 30 seconds

// Clean up interval on server close
process.on('SIGINT', () => {
  clearInterval(pingInterval);
  process.exit(0);
});

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const roomId = url.searchParams.get('room');
    const clientId = uuidv4();
    
    console.log(`New WebSocket connection established:
      - URL: ${req.url}
      - Client ID: ${clientId}
      - Room ID: ${roomId}
      - Remote Address: ${req.socket.remoteAddress}
    `);
    
    if (!roomId) {
      console.log('No room ID provided, closing connection');
      ws.close(1000, 'No room ID provided');
      return;
    }
    
    // Add ping/pong for connection health monitoring
    ws.isAlive = true;
    
    ws.on('pong', () => {
      ws.isAlive = true;
    });
    
    // Initialize room if needed
    if (!roomConnections[roomId]) {
      console.log(`Creating new room: ${roomId}`);
      roomConnections[roomId] = new Map();
    } else {
      console.log(`Adding client to existing room: ${roomId} (current clients: ${roomConnections[roomId].size})`);
    }
    
    // Add this connection to the room
    roomConnections[roomId].set(clientId, ws);
    
    // Initialize room transcript if needed
    if (!transcripts[roomId]) {
      console.log(`Initializing transcript for room: ${roomId}`);
      transcripts[roomId] = [];
    }
    
    // Send existing transcripts to new connection
    console.log(`Sending ${transcripts[roomId].length} existing transcript lines to client ${clientId}`);
    try {
      ws.send(JSON.stringify({
        type: 'init',
        transcripts: transcripts[roomId]
      }));
    } catch (sendError) {
      console.error(`Error sending initial transcripts to client ${clientId}:`, sendError);
    }
    
    // Handle messages from client
    ws.on('message', (message) => {
      try {
        // Handle ping message specially
        if (message.toString() === 'ping') {
          ws.send('pong');
          return;
        }
        
        const data = JSON.parse(message.toString());
        console.log(`Received message from client ${clientId} in room ${roomId}: ${message.toString().substring(0, 100)}...`);
        
        if (data.type === 'transcript') {
          const { speaker, text } = data;
          
          if (!speaker || !text) {
            console.log('Received invalid transcript data (missing speaker or text)');
            return;
          }
          
          const transcriptLine = {
            id: uuidv4(),
            speaker,
            text,
            timestamp: new Date().toISOString()
          };
          
          console.log(`Adding transcript from ${speaker}: "${text.substring(0, 50)}..."`);
          transcripts[roomId].push(transcriptLine);
          
          // Broadcast to all clients in this room
          console.log(`Broadcasting transcript to ${roomConnections[roomId].size} clients in room ${roomId}`);
          broadcastToRoom(roomId, {
            type: 'transcript',
            line: transcriptLine
          });
        }
      } catch (error) {
        console.error(`Error processing WebSocket message from client ${clientId}:`, error);
        console.error(error.stack);
      }
    });
    
    // Handle errors
    ws.on('error', (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
      console.error(error.stack);
      
      // Try to send an error message to the client
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Server encountered an error'
          }));
        }
      } catch (sendError) {
        console.error(`Error sending error message to client ${clientId}:`, sendError);
      }
    });
    
    // Handle client disconnection
    ws.on('close', (code, reason) => {
      console.log(`Client ${clientId} disconnected from room ${roomId}. Code: ${code}, Reason: ${reason || 'No reason provided'}`);
      if (roomConnections[roomId]) {
        roomConnections[roomId].delete(clientId);
        console.log(`Removed client ${clientId} from room ${roomId}. Remaining clients: ${roomConnections[roomId].size}`);
        
        // Clean up empty rooms
        if (roomConnections[roomId].size === 0) {
          console.log(`Room ${roomId} is now empty, removing room`);
          delete roomConnections[roomId];
        }
      }
    });
  } catch (error) {
    console.error('Error in WebSocket connection handler:', error);
    console.error(error.stack);
    ws.close(1011, 'Internal Server Error');
  }
});

// Deepgram WebSocket server removed - now using browser-based speech recognition
// const deepgramWss = new WebSocket.Server({ noServer: true });
// Deepgram WebSocket handling is no longer needed since we're using Web Speech API

// setupRealtimeTranscription function removed - now using browser-based speech recognition
// This function is no longer needed since we're using Web Speech API in the browser

// Broadcast message to all clients in a room
function broadcastToRoom(roomId, message) {
  try {
    if (!roomConnections[roomId]) {
      console.log(`Cannot broadcast to room ${roomId} - room does not exist`);
      return;
    }
    
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    let closedCount = 0;
    
    console.log(`Broadcasting message to ${roomConnections[roomId].size} clients in room ${roomId}`);
    
    roomConnections[roomId].forEach((ws, clientId) => {
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(messageString);
          sentCount++;
        } else {
          console.log(`Cannot send to client ${clientId} - WebSocket state: ${ws.readyState}`);
          closedCount++;
          
          // Clean up closed connections
          if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
            console.log(`Removing closed connection for client ${clientId}`);
            roomConnections[roomId].delete(clientId);
          }
        }
      } catch (clientError) {
        console.error(`Error sending message to client ${clientId}:`, clientError);
      }
    });
    
    console.log(`Broadcast complete - sent to ${sentCount} clients, skipped ${closedCount} closed connections`);
    
    // Clean up empty rooms
    if (roomConnections[roomId].size === 0) {
      console.log(`Room ${roomId} is now empty after broadcast, removing room`);
      delete roomConnections[roomId];
    }
  } catch (error) {
    console.error(`Error broadcasting to room ${roomId}:`, error);
    console.error(error.stack);
  }
}

// Upgrade HTTP server to support WebSockets
server.on('upgrade', (request, socket, head) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;
    const searchParams = url.searchParams;
    const roomId = searchParams.get('room');
    
    console.log(`WebSocket upgrade request received:
      - URL: ${request.url}
      - Pathname: ${pathname}
      - Room ID: ${roomId}
      - Headers: ${JSON.stringify(request.headers)}
    `);
    
    // Handle WebSocket connections for transcripts
    if (pathname === '/transcripts') {
      console.log(`Processing WebSocket upgrade for /transcripts with room=${roomId}`);
      wss.handleUpgrade(request, socket, head, (ws) => {
        console.log('WebSocket connection successfully upgraded');
        wss.emit('connection', ws, request);
      });
    } 
    // Deepgram WebSocket routing removed - now using browser-based speech recognition
    // else if (pathname === '/deepgram') {
    //   // This path is no longer needed since we're using Web Speech API
    // }
    else {
      console.log(`Unhandled WebSocket path: ${pathname}, closing connection`);
      // Close the connection if the path is not recognized
      socket.destroy();
    }
  } catch (error) {
    console.error('Error handling WebSocket upgrade:', error);
    console.error(error.stack);
    socket.destroy();
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});