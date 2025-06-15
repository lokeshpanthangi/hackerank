// Add type definition for import.meta.env
interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  VITE_WS_BASE_URL?: string;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// API base URL from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// WebSocket base URL
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 
  (API_BASE_URL.replace('http://', 'ws://').replace('https://', 'wss://'));

// API endpoints
export const API_ENDPOINTS = {
  // Twilio endpoints
  TWILIO_TOKEN: `${API_BASE_URL}/api/twilio/token`,
  
  // Deepgram endpoints
  DEEPGRAM_TOKEN: `${API_BASE_URL}/api/deepgram/token`,
  DEEPGRAM_STREAM: `${API_BASE_URL}/api/deepgram/stream`,
  DEEPGRAM_WS: (roomId: string, identity: string, sessionId?: string) => 
    `${WS_BASE_URL}/deepgram?room=${roomId}&identity=${identity}${sessionId ? `&session=${sessionId}` : ''}`,
  
  // Transcript endpoints
  TRANSCRIPTS: (roomId: string) => `${API_BASE_URL}/api/transcripts/${roomId}`,
  TRANSCRIPT_WS: (roomId: string) => `${WS_BASE_URL}/transcripts?room=${roomId}`,
  
  // AssemblyAI endpoints (deprecated)
  ASSEMBLY_TOKEN: `${API_BASE_URL}/api/assembly/token`,
  ASSEMBLY_TRANSCRIBE: `${API_BASE_URL}/api/assembly/transcribe`,
  ASSEMBLY_TRANSCRIPT: (transcriptId: string) => `${API_BASE_URL}/api/assembly/transcript/${transcriptId}`
}; 