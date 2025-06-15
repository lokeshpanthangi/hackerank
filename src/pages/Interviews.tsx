import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, VideoIcon } from "lucide-react";
import { useInterviews } from "@/hooks/useInterviews";
import { useProfile } from "@/hooks/useProfile";
import PageLoader from "@/components/loading/PageLoader";
import { format } from "date-fns";
import BackButton from "@/components/ui/back-button";

const Interviews = () => {
  const { interviews, loading } = useInterviews();
  const { profile } = useProfile();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed'>('all');

  // Determine the back destination based on user role
  const getBackDestination = () => {
    if (profile?.role === 'recruiter') {
      return '/recruiter-dashboard';
    } else if (profile?.role === 'candidate') {
      return '/candidate-dashboard';
    } else {
      return '/';
    }
  };

  if (loading) {
    return <PageLoader text="Loading interviews..." />;
  }

  const filteredInterviews = interviews.filter(interview => {
    if (filter === 'all') return true;
    return interview.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <BackButton 
            to={getBackDestination()}
            label="Back to Dashboard" 
            className="text-text-secondary hover:text-text-primary"
          />
          <div className="h-6 w-px bg-border-dark"></div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {profile?.role === 'candidate' ? 'My Interviews' : 'Interview Management'}
            </h1>
            <p className="text-text-secondary">
              {profile?.role === 'candidate' 
                ? 'View your scheduled and completed interviews'
                : 'Manage interviews and track candidate progress'
              }
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-tech-green text-dark-primary' : 'border-border-dark text-text-secondary'}
          >
            All Interviews
          </Button>
          <Button
            onClick={() => setFilter('scheduled')}
            variant={filter === 'scheduled' ? 'default' : 'outline'}
            className={filter === 'scheduled' ? 'bg-tech-green text-dark-primary' : 'border-border-dark text-text-secondary'}
          >
            Scheduled
          </Button>
          <Button
            onClick={() => setFilter('completed')}
            variant={filter === 'completed' ? 'default' : 'outline'}
            className={filter === 'completed' ? 'bg-tech-green text-dark-primary' : 'border-border-dark text-text-secondary'}
          >
            Completed
          </Button>
        </div>

        {filteredInterviews.length === 0 ? (
          <Card className="bg-dark-secondary border-border-dark">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-text-secondary mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No interviews found</h3>
              <p className="text-text-secondary text-center">
                {filter === 'all' 
                  ? 'No interviews scheduled yet'
                  : `No ${filter} interviews found`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInterviews.map((interview) => (
              <Card key={interview.id} className="bg-dark-secondary border-border-dark hover:border-tech-green/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-text-primary text-lg">
                        {interview.title}
                      </CardTitle>
                      <CardDescription className="text-text-secondary">
                        {interview.job_position?.title || 'No position specified'}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      {formatStatus(interview.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {interview.scheduled_at && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {format(new Date(interview.scheduled_at), 'PPP p')}
                      </span>
                    </div>
                  )}
                  
                  {interview.duration_minutes && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{interview.duration_minutes} minutes</span>
                    </div>
                  )}

                  {profile?.role !== 'candidate' && interview.candidate && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {interview.candidate.first_name} {interview.candidate.last_name}
                      </span>
                    </div>
                  )}

                  {profile?.role === 'candidate' && interview.recruiter && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        Interviewer: {interview.recruiter.first_name} {interview.recruiter.last_name}
                      </span>
                    </div>
                  )}

                  {interview.job_position?.company && (
                    <div className="text-sm text-text-secondary">
                      Company: {interview.job_position.company.name}
                    </div>
                  )}

                  {interview.overall_score !== null && (
                    <div className="text-sm text-text-secondary">
                      Score: {interview.overall_score}/100
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {interview.meeting_url && interview.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        className="bg-tech-green hover:bg-tech-green/90 text-dark-primary"
                        onClick={() => window.open(interview.meeting_url!, '_blank')}
                      >
                        <VideoIcon className="h-4 w-4 mr-2" />
                        Join Interview
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-border-dark text-text-secondary hover:text-text-primary"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;
