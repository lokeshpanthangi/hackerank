import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Calendar, 
  Award, 
  User,
  LogOut,
  Bell,
  Code
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CandidateNavbar = () => {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/candidate-dashboard' },
    { id: 'interviews', label: 'Interviews', icon: Calendar, path: '/schedule' },
    { id: 'assessments', label: 'Assessments', icon: Award, path: '/assessments' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/profile' },
  ];

  return (
    <header className="bg-dark-primary border-b border-border-dark sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-tech-green rounded-md flex items-center justify-center mr-2">
            <Code className="h-5 w-5 text-dark-primary" />
          </div>
          <span className="text-text-primary font-bold text-lg">CodeInterview Pro</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="text-text-secondary hover:text-tech-green"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-text-primary">
            <Bell size={20} />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-tech-green text-dark-primary text-sm font-bold">
                    {profile?.first_name?.[0] || 'n'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-dark-secondary border-border-dark" align="end">
              <DropdownMenuLabel className="text-text-primary">
                {profile?.first_name} {profile?.last_name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border-dark" />
              <DropdownMenuItem 
                className="text-text-secondary cursor-pointer hover:text-text-primary hover:bg-dark-primary"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border-dark" />
              <DropdownMenuItem 
                className="text-text-secondary cursor-pointer hover:text-red-500 hover:bg-dark-primary"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default CandidateNavbar; 