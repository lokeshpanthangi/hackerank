import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { VideoCallPanel } from '@/components/interview/VideoCallPanel';
import { CodeEditorPanel } from '@/components/interview/CodeEditorPanel';
import { ChatNotesPanel } from '@/components/interview/ChatNotesPanel';
import { AIAnalysisPanel } from '@/components/interview/AIAnalysisPanel';
import { Settings, LogOut, Users, Circle, Timer, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/ui/back-button';

const InterviewRoom = () => {
  const [elapsedTime, setElapsedTime] = React.useState(1847); // 30:47 in seconds
  const [isRecording, setIsRecording] = React.useState(true);
  const [participantCount, setParticipantCount] = React.useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for code sharing between editor and analysis panel
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  
  // Reference to the AI Analysis panel
  const aiAnalysisPanelRef = useRef<any>(null);

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEndInterview = () => {
    // In a real app, we would save the interview data before navigating away
    navigate('/interviews');
  };
  
  // Handler for code updates from the editor
  const handleCodeUpdate = (code: string, language: string) => {
    setCurrentCode(code);
    setCurrentLanguage(language);
    
    // If we had a direct ref to the analysis panel component, we could call methods on it
    if (aiAnalysisPanelRef.current) {
      aiAnalysisPanelRef.current.handleCodeUpdate(code, language);
    }
  };

  return (
    <div className="h-screen w-full bg-dark-primary flex flex-col">
      {/* Header Bar */}
      <header className="bg-dark-secondary border-b border-border-dark px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-4">
            <BackButton 
              label="Back to Interviews" 
              to="/interviews"
              className="text-text-secondary hover:text-text-primary"
            />
            <div className="h-6 w-px bg-border-dark mx-2"></div>
            <div>
              <h1 className="text-white font-semibold text-lg">Senior Frontend Developer Interview</h1>
              <p className="text-text-secondary text-sm">Sarah Chen</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-dark-primary px-3 py-1 rounded">
              <Timer className="w-4 h-4 text-tech-green" />
              <span className="text-white font-mono">{formatTime(elapsedTime)}</span>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <Circle className="w-3 h-3 text-tech-green fill-current" />
              <span className="text-tech-green text-sm font-medium">Active</span>
            </div>
            
            {/* Participants */}
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm">{participantCount} participants</span>
            </div>
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="flex items-center space-x-2 bg-red-900/20 px-3 py-1 rounded">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm">Recording</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-dark-secondary border-border-dark">
              <DropdownMenuItem className="text-white hover:bg-dark-primary">
                Audio Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-dark-primary">
                Video Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-dark-primary">
                Recording Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="destructive" 
            size="sm" 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleEndInterview}
          >
            <LogOut className="w-4 h-4 mr-2" />
            End Interview
          </Button>
        </div>
      </header>

      {/* Main Content Area - 4 Panel Layout */}
      <div className="flex-1 p-4 bg-dark-primary">
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* Top Row */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="horizontal">
              {/* Video Call Panel - Top Left */}
              <ResizablePanel defaultSize={50} minSize={25}>
                <VideoCallPanel />
              </ResizablePanel>
              
              <ResizableHandle withHandle className="bg-border-dark hover:bg-tech-green/20" />
              
              {/* Code Editor Panel - Top Right */}
              <ResizablePanel defaultSize={50} minSize={25}>
                <CodeEditorPanel onCodeChange={handleCodeUpdate} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-border-dark hover:bg-tech-green/20" />
          
          {/* Bottom Row */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="horizontal">
              {/* Chat & Notes Panel - Bottom Left */}
              <ResizablePanel defaultSize={50} minSize={25}>
                <ChatNotesPanel />
              </ResizablePanel>
              
              <ResizableHandle withHandle className="bg-border-dark hover:bg-tech-green/20" />
              
              {/* AI Analysis Panel - Bottom Right */}
              <ResizablePanel defaultSize={50} minSize={25}>
                <AIAnalysisPanel 
                  ref={aiAnalysisPanelRef}
                  initialCode={currentCode}
                  initialLanguage={currentLanguage}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default InterviewRoom;
