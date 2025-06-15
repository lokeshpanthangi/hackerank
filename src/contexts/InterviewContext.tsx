import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AgentAnalysisResult } from '@/integrations/openai/codeQualityAnalysis';

// Define the shape of our context state
interface InterviewContextState {
  // Code editor state
  code: string;
  language: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  
  // Problem statement state
  problemStatement: string;
  roleLevel: string;
  setProblemStatement: (statement: string) => void;
  setRoleLevel: (level: string) => void;
  
  // Analysis state
  analysisResults: {
    correctness: AgentAnalysisResult;
    complexity: AgentAnalysisResult;
    edgeCases: AgentAnalysisResult;
    performance: AgentAnalysisResult;
    security: AgentAnalysisResult;
    style: AgentAnalysisResult;
    overallSummary: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      hiringRecommendation: string;
      summary: string;
    };
  } | null;
  setAnalysisResults: (results: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  lastAnalysisTime: Date | null;
  setLastAnalysisTime: (time: Date | null) => void;
  
  // Chat state
  messages: Array<{
    id: string;
    sender: string;
    role: string;
    content: string;
    timestamp: Date;
  }>;
  addMessage: (message: { sender: string; role: string; content: string; }) => void;
  
  // Notes state
  notes: string;
  setNotes: (notes: string) => void;
  
  // Transcript state
  transcript: string;
  setTranscript: (transcript: string) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  transcriptLines: Array<{
    speaker: string;
    text: string;
    timestamp: Date;
  }>;
  addTranscriptLine: (line: { speaker: string; text: string; }) => void;
}

// Create the context with a default value
const InterviewContext = createContext<InterviewContextState | undefined>(undefined);

// Provider component
export const InterviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Code editor state
  const [code, setCode] = useState<string>(`// Two Sum Problem
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`);
  const [language, setLanguage] = useState<string>('javascript');
  
  // Problem statement state
  const [problemStatement, setProblemStatement] = useState<string>(
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'
  );
  const [roleLevel, setRoleLevel] = useState<string>('mid-level');
  
  // Analysis state
  const [analysisResults, setAnalysisResults] = useState<InterviewContextState['analysisResults']>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<Date | null>(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'John Doe',
      role: 'Interviewer',
      content: 'Welcome to the interview! Please feel free to ask any questions during our session.',
      timestamp: new Date()
    },
    {
      id: '2',
      sender: 'Sarah Chen',
      role: 'Candidate',
      content: 'Thank you! I\'m excited to get started. Should I begin with the coding challenge?',
      timestamp: new Date()
    }
  ]);
  
  const addMessage = (message: { sender: string; role: string; content: string; }) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        ...message,
        timestamp: new Date()
      }
    ]);
  };
  
  // Notes state
  const [notes, setNotes] = useState<string>(
    `Candidate shows strong understanding of JavaScript fundamentals.
    
- Quickly identified the optimal approach for the Two Sum problem
- Used appropriate data structure (HashMap/Map) for O(n) solution
- Good communication skills while explaining the solution
- Asked clarifying questions about edge cases
                    
Areas for improvement:
- Could add more comments to explain the code
- Consider discussing time and space complexity earlier`
  );
  
  // Transcript state
  const [transcript, setTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcriptLines, setTranscriptLines] = useState<Array<{
    speaker: string;
    text: string;
    timestamp: Date;
  }>>([]);
  
  const addTranscriptLine = (line: { speaker: string; text: string; }) => {
    const newLine = {
      ...line,
      timestamp: new Date()
    };
    
    setTranscriptLines(prev => [...prev, newLine]);
    
    // Also update the full transcript
    setTranscript(prev => {
      const newEntry = `[${newLine.timestamp.toLocaleTimeString()}] ${newLine.speaker}: ${newLine.text}\n`;
      return prev + newEntry;
    });
    
    // Optionally add to messages as well
    addMessage({
      sender: line.speaker,
      role: line.speaker === 'Interviewer' ? 'Interviewer' : 'Candidate',
      content: line.text
    });
  };
  
  // Create the context value object
  const contextValue: InterviewContextState = {
    code,
    language,
    setCode,
    setLanguage,
    problemStatement,
    roleLevel,
    setProblemStatement,
    setRoleLevel,
    analysisResults,
    setAnalysisResults,
    isAnalyzing,
    setIsAnalyzing,
    lastAnalysisTime,
    setLastAnalysisTime,
    messages,
    addMessage,
    notes,
    setNotes,
    transcript,
    setTranscript,
    isRecording,
    setIsRecording,
    transcriptLines,
    addTranscriptLine
  };
  
  return (
    <InterviewContext.Provider value={contextValue}>
      {children}
    </InterviewContext.Provider>
  );
};

// Custom hook for using the context
export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}; 