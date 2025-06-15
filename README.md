# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2a3253da-a36a-4ae9-a22d-3b6bf299d2f7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2a3253da-a36a-4ae9-a22d-3b6bf299d2f7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2a3253da-a36a-4ae9-a22d-3b6bf299d2f7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Hacerank - Technical Interview Platform

A comprehensive platform for conducting technical interviews with code editing, video calls, and AI-powered analysis.

## Features

- **Code Editor**: Monaco-based editor with syntax highlighting and multiple language support
- **Video Calls**: Real-time video conferencing with Twilio Video
- **Transcription**: Interview transcription using AssemblyAI
- **AI Analysis**: Multi-agent AI system for code quality and communication analysis
- **Candidate Summary Reports**: Comprehensive evaluation of candidate performance

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Twilio account with API credentials
- AssemblyAI account with API key
- OpenAI API key (for AI analysis features)

### Environment Setup

1. Clone the repository
2. Create two `.env` files:

   a. In the root directory (for frontend):
   ```sh
   # Client Configuration
   VITE_API_BASE_URL=http://localhost:5000
   VITE_WS_BASE_URL=ws://localhost:5000
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

   b. In the server directory (for backend):
   ```sh
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Twilio Credentials
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_API_KEY_SID=your_api_key_sid
   TWILIO_API_KEY_SECRET=your_api_key_secret

   # Deepgram Credentials
   DEEPGRAM_API_KEY=your_deepgram_api_key

   # AssemblyAI Credentials
   ASSEMBLY_API_KEY=your_assembly_ai_key
   ```

> **IMPORTANT**: Never commit these `.env` files to version control. They are already added to `.gitignore` to prevent accidental exposure of sensitive credentials.

### Installation

1. Install server dependencies:
```
cd server
npm install
```

2. Install client dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev:all
```

This will start both the frontend (Vite) and backend (Express) servers.

## Architecture

### Frontend

- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Shadcn/UI**: Component library
- **Monaco Editor**: Code editing
- **React Router**: Navigation
- **Twilio Video**: Video conferencing
- **Context API**: State management

### Backend

- **Express**: API server
- **Twilio SDK**: Token generation and room management
- **AssemblyAI**: Transcription services
- **OpenAI SDK**: AI analysis

### AI Analysis System

The platform uses a multi-agent AI system for comprehensive candidate evaluation:

1. **Code Quality Agents**:
   - Correctness Analysis
   - Complexity Analysis
   - Edge Case Handling
   - Performance Analysis
   - Security Analysis
   - Style Analysis

2. **Communication Analysis Agent**:
   - Evaluates clarity, technical accuracy, collaboration style, and more
   - Uses interview transcript and chat messages

3. **Candidate Report Summarizer**:
   - Combines insights from code and communication analysis
   - Provides overall assessment, strengths, weaknesses, and hiring recommendation

## License

MIT

## Code Quality Analysis Feature

This feature uses specialized AI agents to analyze code from different perspectives:

1. **Correctness**: Identifies logical errors and functional correctness issues
2. **Complexity**: Evaluates code complexity and maintainability
3. **Edge Cases**: Finds potential edge cases and boundary conditions
4. **Performance**: Analyzes algorithmic efficiency and optimization opportunities
5. **Security**: Detects security vulnerabilities and risks
6. **Style & Readability**: Assesses code clarity and adherence to best practices

A summarizer agent then provides an overall assessment with hiring recommendations.

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your-openai-api-key
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Using the Code Quality Analysis

1. Navigate to the Interview Room
2. Enter code in the Code Editor Panel
3. In the AI Analysis Panel, provide a problem statement and select the role level
4. Click "Analyze Code" to start the analysis
5. View results in the different tabs for each analysis perspective
6. The Summary tab provides an overall assessment with hiring recommendations

## Development Mode

In development mode, the system uses mock responses to avoid API costs. To use real OpenAI API calls, set:

```typescript
const useMock = false;
```

in the `runAnalysis` function in `CodeQualityAnalysis.tsx`.

## Architecture

- `src/integrations/openai/codeQualityAnalysis.ts`: Core agent-based analysis service
- `src/components/interview/CodeQualityAnalysis.tsx`: UI component for displaying analysis results
- `src/components/interview/ProblemStatementInput.tsx`: UI for entering problem statements
- `src/components/interview/AIAnalysisPanel.tsx`: Container component that integrates everything
- `src/components/interview/CodeEditorPanel.tsx`: Code editor that sends code to the analysis panel

## Agent Prompts

Each agent has a specialized prompt that focuses on a specific aspect of code quality. The prompts are designed to return structured JSON responses that can be easily displayed in the UI.

# Hacerank Interview Platform

A technical interview platform with real-time video calling and transcription features.

## Features

- Real-time video calling using Twilio Video
- Live speech-to-text transcription using Deepgram
- Multi-device support for interviewers and candidates
- Shared transcription between participants
- Code editor with syntax highlighting
- Interview notes and evaluation

## Setup Instructions

### Prerequisites

- Node.js 14+ and npm
- A Deepgram account with API key
- Twilio account with Video API credentials

### Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following:
   ```
   PORT=5000
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_API_KEY_SID=your_twilio_api_key_sid
   TWILIO_API_KEY_SECRET=your_twilio_api_key_secret
   DEEPGRAM_API_KEY=your_deepgram_api_key
   ```

4. Start the server:
   ```
   npm start
   ```

### Client Setup

1. Navigate to the client directory:
   ```
   cd ..
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the client:
   ```
   npm run dev
   ```

## Using the Multi-Device Interview Feature

### For Interviewers

1. Start an interview session by navigating to:
   ```
   http://localhost:5173/interview/video?room=YOUR_ROOM_ID&role=interviewer
   ```

2. Share the candidate link with your interviewee:
   ```
   http://localhost:5173/interview/video?room=YOUR_ROOM_ID&role=candidate
   ```

3. Both participants will join the same video room and can see/hear each other.

4. Click the "Start Recording" button to begin transcribing your speech.

5. Both participants' transcriptions will be shared in real-time.

## Troubleshooting

- **Video not showing**: Ensure camera permissions are granted in your browser
- **Transcription not working**: Check your internet connection and verify your Deepgram API key
- **Connection issues**: Make sure both server and client are running and on the same network

## License

MIT
