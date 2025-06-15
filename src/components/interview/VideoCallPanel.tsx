
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VideoControls } from './VideoControls';
import { VideoStream } from './VideoStream';
import { ParticipantsList } from './ParticipantsList';
import { ScreenShareModal } from './ScreenShareModal';
import { Maximize, Minimize } from 'lucide-react';

export const VideoCallPanel = () => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [isScreenSharing, setIsScreenSharing] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isHandRaised, setIsHandRaised] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showParticipants, setShowParticipants] = React.useState(false);
  const [showScreenShare, setShowScreenShare] = React.useState(false);

  const mockParticipants = [
    {
      id: '1',
      name: 'John Doe',
      role: 'interviewer' as const,
      isMuted: false,
      isVideoOff: false,
      isHandRaised: false,
      connectionQuality: 'excellent' as const,
      isLocal: true,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'candidate' as const,
      isMuted: false,
      isVideoOff: false,
      isHandRaised: false,
      connectionQuality: 'good' as const,
      isLocal: false,
    },
  ];

  const handleScreenShare = () => {
    if (isScreenSharing) {
      setIsScreenSharing(false);
    } else {
      setShowScreenShare(true);
    }
  };

  const handleSelectScreenSource = (sourceId: string) => {
    console.log('Selected screen source:', sourceId);
    setIsScreenSharing(true);
  };

  return (
    <Card className={`h-full bg-dark-secondary border-border-dark flex flex-col relative ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <h3 className="text-white font-medium">Video Call</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-text-secondary hover:text-white h-8 w-8"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 p-4 space-y-4 relative">
        {/* Main Video Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Candidate Video (Main) */}
          <VideoStream
            name="Sarah Chen"
            initials="SC"
            isLocal={false}
            isMuted={false}
            isVideoOff={isVideoOff}
            isSpeaking={true}
            connectionQuality="good"
            className="aspect-video"
          />

          {/* Interviewer Video (Secondary) */}
          <VideoStream
            name="John Doe"
            initials="JD"
            isLocal={true}
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            isSpeaking={false}
            connectionQuality="excellent"
            className="aspect-video lg:max-w-[300px] lg:max-h-[200px] lg:absolute lg:bottom-20 lg:right-8"
          />
        </div>

        {/* Screen Share Content (when active) */}
        {isScreenSharing && (
          <div className="absolute inset-4 bg-gray-900 rounded-lg border border-tech-green z-10">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-dark-primary font-bold text-xl">📺</span>
                </div>
                <p className="text-white font-medium">Screen sharing active</p>
                <p className="text-text-secondary text-sm">Sharing: Entire Screen</p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsScreenSharing(false)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700"
            >
              Stop Sharing
            </Button>
          </div>
        )}
      </div>

      {/* Video Controls */}
      <VideoControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        isChatOpen={isChatOpen}
        isHandRaised={isHandRaised}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleVideo={() => setIsVideoOff(!isVideoOff)}
        onToggleScreenShare={handleScreenShare}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onToggleHand={() => setIsHandRaised(!isHandRaised)}
        onShowParticipants={() => setShowParticipants(!showParticipants)}
        onLeaveInterview={() => console.log('Leave interview')}
      />

      {/* Participants List */}
      <ParticipantsList
        participants={mockParticipants}
        isOpen={showParticipants}
        onClose={() => setShowParticipants(false)}
        onMuteParticipant={(id) => console.log('Mute participant:', id)}
        onRemoveParticipant={(id) => console.log('Remove participant:', id)}
      />

      {/* Screen Share Modal */}
      <ScreenShareModal
        isOpen={showScreenShare}
        onClose={() => setShowScreenShare(false)}
        onSelectSource={handleSelectScreenSource}
      />
    </Card>
  );
};
