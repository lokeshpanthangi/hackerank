
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Home,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { useInterviews } from '@/hooks/useInterviews';
import { useActivities } from '@/hooks/useActivities';
import { format } from 'date-fns';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface Interview {
  id: string;
  candidate: string;
  position: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  created_at: string;
  metadata?: any;
}

const RecruiterDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const { signOut, user } = useAuth();
  const { profile } = useProfile();
  const { interviews, loading } = useInterviews();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const handleNavigation = (id: string) => {
    setActiveNav(id);
    switch(id) {
      case 'interviews':
        navigate('/interviews');
        break;
      case 'candidates':
        navigate('/candidates');
        break;
      case 'analytics':
        navigate('/reports');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        // Stay on dashboard
        break;
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      });
      // In a real app, this would navigate to search results or filter the current view
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Mock data
  const stats: StatCard[] = [
    {
      title: 'Active Interviews',
      value: '12',
      change: '+3 from last week',
      icon: Calendar,
      color: 'text-tech-green'
    },
    {
      title: 'Total Candidates',
      value: '148',
      change: '+12 this month',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '2 due today',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      title: 'This Month\'s Hires',
      value: '6',
      change: '+2 from last month',
      icon: CheckCircle,
      color: 'text-tech-green'
    }
  ];

  // Filter interviews for the current recruiter and upcoming ones
  const upcomingInterviews = interviews.filter(interview => {
    if (!user || interview.recruiter_id !== user.id) return false;
    if (interview.status === 'cancelled' || interview.status === 'completed') return false;
    if (!interview.scheduled_at) return false;
    
    const interviewDate = new Date(interview.scheduled_at);
    const now = new Date();
    return interviewDate > now;
  }).sort((a, b) => {
    const dateA = new Date(a.scheduled_at!);
    const dateB = new Date(b.scheduled_at!);
    return dateA.getTime() - dateB.getTime();
  }).slice(0, 5); // Show only first 5 upcoming interviews

  const { activities, loading: activitiesLoading, formatActivityTime } = useActivities();
  const recentActivities = activities.slice(0, 4);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const quickActions = [
    { 
      label: 'Schedule Interview', 
      icon: Calendar, 
      color: 'bg-tech-green',
      action: () => navigate('/schedule')
    },
    { 
      label: 'Add Candidate', 
      icon: Plus, 
      color: 'bg-blue-600',
      action: () => navigate('/candidates?action=add')
    },
    { 
      label: 'View Reports', 
      icon: FileText, 
      color: 'bg-purple-600',
      action: () => navigate('/reports')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-400';
      case 'in-progress': return 'text-tech-green';
      case 'completed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'interview': return Calendar;
      case 'candidate': return Users;
      case 'review': return FileText;
      case 'hire': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex">
      {/* Sidebar */}
      <div className="w-60 bg-dark-secondary border-r border-border-dark flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border-dark">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tech-green rounded-lg flex items-center justify-center">
              <span className="text-dark-primary font-bold text-lg font-mono">&lt;/&gt;</span>
            </div>
            <span className="text-text-primary font-bold text-lg">CodeInterview Pro</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeNav === item.id
                      ? 'bg-tech-green/10 text-tech-green border-r-2 border-tech-green'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-primary'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border-dark">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-tech-green/20 rounded-full flex items-center justify-center">
              <User size={20} className="text-tech-green" />
            </div>
            <div>
              <div className="text-text-primary font-medium">{profile?.first_name || ''} {profile?.last_name || ''}</div>
              <div className="text-text-secondary text-sm">Senior Recruiter</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-text-secondary hover:text-text-primary"
            onClick={handleSignOut}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-dark-secondary border-b border-border-dark p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">
                Welcome back, {profile?.first_name || 'Recruiter'}!
              </h1>
              <p className="text-text-secondary">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="Search candidates, interviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-dark-primary border-border-dark text-text-primary"
                />
                <Button type="submit" className="hidden">Search</Button>
              </form>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-text-secondary hover:text-text-primary relative"
                onClick={() => toast({
                  title: "Notifications",
                  description: "You have 3 unread notifications",
                })}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="bg-dark-secondary border-border-dark hover:border-tech-green/30 transition-colors duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                      {stat.title}
                    </CardTitle>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                    <p className="text-xs text-text-secondary mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={index}
                      className={`${action.color} hover:opacity-90 h-16 text-white font-semibold`}
                      onClick={action.action}
                    >
                      <IconComponent size={20} className="mr-2" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activitiesLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-tech-green mx-auto"></div>
                      <p className="text-sm text-text-secondary mt-2">Loading activities...</p>
                    </div>
                  ) : recentActivities.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-text-secondary">No recent activities</p>
                    </div>
                  ) : (
                    recentActivities.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-tech-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent size={14} className="text-tech-green" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-text-primary text-sm font-medium">{activity.title}</p>
                            <p className="text-text-primary text-sm">{activity.description}</p>
                            <p className="text-text-secondary text-xs mt-1">{formatActivityTime(activity.created_at)}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary">Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border-dark">
                      <TableHead className="text-text-secondary">Candidate</TableHead>
                      <TableHead className="text-text-secondary">Position</TableHead>
                      <TableHead className="text-text-secondary">Time</TableHead>
                      <TableHead className="text-text-secondary">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-text-secondary py-8">
                          Loading interviews...
                        </TableCell>
                      </TableRow>
                    ) : upcomingInterviews.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-text-secondary py-8">
                          No upcoming interviews
                        </TableCell>
                      </TableRow>
                    ) : (
                      upcomingInterviews.map((interview) => (
                        <TableRow 
                          key={interview.id} 
                          className="border-border-dark cursor-pointer hover:bg-dark-primary/50"
                          onClick={() => navigate(`/interview-room?id=${interview.id}`)}
                        >
                          <TableCell className="text-text-primary font-medium">
                            {interview.candidate ? 
                              `${interview.candidate.first_name} ${interview.candidate.last_name}` : 
                              'Unknown Candidate'
                            }
                          </TableCell>
                          <TableCell className="text-text-secondary">
                            {interview.job_position?.title || 'No Position'}
                          </TableCell>
                          <TableCell className="text-text-secondary">
                            {interview.scheduled_at ? 
                              format(new Date(interview.scheduled_at), 'MMM dd, yyyy h:mm a') : 
                              'No time set'
                            }
                          </TableCell>
                          <TableCell>
                            <span className={`capitalize ${getStatusColor(interview.status || 'scheduled')}`}>
                              {interview.status || 'scheduled'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
