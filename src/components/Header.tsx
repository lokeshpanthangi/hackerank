import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutNotification from "@/components/notifications/LogoutNotification";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setShowLogoutNotification(true);
    navigate('/', { state: { justLoggedOut: true } });
  };

  const getDashboardLink = () => {
    if (!profile) return '/candidate-dashboard';
    
    switch (profile.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'recruiter':
        return '/recruiter-dashboard';
      case 'candidate':
        return '/candidate-dashboard';
      default:
        return '/candidate-dashboard';
    }
  };

  return (
    <header className="border-b border-border-dark bg-dark-secondary/90 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-tech-green" />
            <span className="text-xl font-bold text-text-primary">HackerRank Clone</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/#features" 
              className="text-text-secondary hover:text-tech-green transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/#pricing" 
              className="text-text-secondary hover:text-tech-green transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/#about" 
              className="text-text-secondary hover:text-tech-green transition-colors"
            >
              About
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-tech-green border-2 text-tech-green hover:bg-tech-green hover:text-dark-primary font-medium shadow-sm shadow-tech-green/10 hover:shadow-tech-green/20"
                >
                  <Link to={getDashboardLink()}>Dashboard</Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-text-primary hover:bg-dark-primary hover:text-tech-green">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-dark-secondary border-border-dark">
                    <DropdownMenuLabel className="text-text-primary">
                      {profile?.first_name} {profile?.last_name}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-text-secondary text-xs font-normal">
                      {profile?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border-dark" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-tech-green border-2 text-tech-green hover:bg-tech-green hover:text-dark-primary font-medium shadow-sm shadow-tech-green/10 hover:shadow-tech-green/20"
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-medium shadow-sm shadow-tech-green/20 hover:shadow-tech-green/30"
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-primary hover:text-tech-green"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-dark">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/#features" 
                className="text-text-secondary hover:text-tech-green transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/#pricing" 
                className="text-text-secondary hover:text-tech-green transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/#about" 
                className="text-text-secondary hover:text-tech-green transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-border-dark">
                  <Button
                    asChild
                    variant="outline"
                    className="border-tech-green border-2 text-tech-green hover:bg-tech-green hover:text-dark-primary justify-start font-medium"
                  >
                    <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="text-text-secondary hover:text-tech-green justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-border-dark">
                  <Button
                    asChild
                    variant="outline"
                    className="border-tech-green border-2 text-tech-green hover:bg-tech-green hover:text-dark-primary justify-start font-medium"
                  >
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-tech-green hover:bg-tech-green/90 text-dark-primary justify-start font-medium"
                  >
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Notification */}
      {showLogoutNotification && (
        <LogoutNotification 
          onClose={() => setShowLogoutNotification(false)}
        />
      )}
    </header>
  );
};

export default Header;
