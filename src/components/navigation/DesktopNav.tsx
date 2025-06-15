import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Code, 
  Video, 
  MessageSquare, 
  Brain,
  FileText,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md w-full justify-start",
        isActive 
          ? "bg-tech-green/10 text-tech-green border-l-2 border-tech-green" 
          : "text-text-secondary hover:text-text-primary hover:bg-dark-primary"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
};

const DesktopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const mainNavItems = [
    { label: 'Dashboard', icon: Home, path: '/recruiter-dashboard' },
    { label: 'Candidates', icon: Users, path: '/candidates' },
    { label: 'Interviews', icon: Calendar, path: '/interviews' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
  ];
  
  const interviewNavItems = [
    { label: 'Video Call', icon: Video, path: '/interview-room/video' },
    { label: 'Code Editor', icon: Code, path: '/interview-room/code' },
    { label: 'Chat', icon: MessageSquare, path: '/interview-room/chat' },
    { label: 'AI Analysis', icon: Brain, path: '/interview-room/analysis' },
    { label: 'Problem Statement', icon: FileText, path: '/interview-room/problem' },
  ];
  
  const isInterviewRoom = location.pathname.includes('interview-room');
  const activeNavItems = isInterviewRoom ? interviewNavItems : mainNavItems;
  
  return (
    <div className="h-full w-64 bg-dark-secondary border-r border-border-dark flex flex-col">
      {/* Logo and App Name */}
      <div className="p-4 border-b border-border-dark flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-tech-green flex items-center justify-center text-dark-primary font-bold">
          H
        </div>
        <span className="text-white text-lg font-semibold">Hacerank</span>
      </div>
      
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-text-secondary" />
          <Input 
            placeholder="Search..." 
            className="pl-8 bg-dark-primary border-border-dark text-text-primary"
          />
        </div>
      </div>
      
      {/* Navigation Items */}
      <div className="p-4 flex-1 overflow-auto">
        <nav className="space-y-1">
          {activeNavItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>
        
        {isInterviewRoom && (
          <>
            <div className="my-4 border-t border-border-dark"></div>
            <h4 className="text-text-secondary text-xs uppercase font-medium mb-2 px-2">Interview Tools</h4>
            <nav className="space-y-1">
              <NavItem
                icon={FileText}
                label="Problem Statement"
                path="/interview-room/problem"
                isActive={location.pathname === '/interview-room/problem'}
                onClick={() => navigate('/interview-room/problem')}
              />
              <NavItem
                icon={Brain}
                label="AI Analysis"
                path="/interview-room/analysis"
                isActive={location.pathname === '/interview-room/analysis'}
                onClick={() => navigate('/interview-room/analysis')}
              />
            </nav>
          </>
        )}
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatars/recruiter.jpg" />
            <AvatarFallback className="bg-tech-green text-dark-primary">JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-text-secondary text-xs">Recruiter</p>
          </div>
        </div>
      </div>
      
      {/* Settings */}
      <div className="p-4 border-t border-border-dark">
        <Button 
          variant="ghost" 
          className="flex items-center gap-3 w-full justify-start text-text-secondary hover:text-text-primary hover:bg-dark-primary"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav; 