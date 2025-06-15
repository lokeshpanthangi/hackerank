import React, { useEffect, useRef } from 'react';
import { useInterview } from '@/contexts/InterviewContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface TranscriptViewProps {
  className?: string;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({ className = '' }) => {
  const { transcriptLines } = useInterview();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new transcripts arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [transcriptLines]);
  
  return (
    <Card className={`p-4 h-full ${className}`}>
      <h3 className="text-lg font-semibold mb-2">Interview Transcript</h3>
      
      <ScrollArea ref={scrollAreaRef} className="h-[calc(100%-2rem)] pr-4">
        {transcriptLines.length === 0 ? (
          <p className="text-text-secondary text-sm italic">
            No transcript available yet. Start recording to capture the conversation.
          </p>
        ) : (
          <div className="space-y-4">
            {transcriptLines.map((line, index) => (
              <div key={index} className="transcript-line">
                <div className="flex items-start gap-2">
                  <span 
                    className={`font-medium ${
                      line.speaker.includes('Interviewer') ? 'text-blue-500' : 'text-green-500'
                    }`}
                  >
                    {line.speaker}:
                  </span>
                  <span className="text-black">{line.text}</span>
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {line.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default TranscriptView;