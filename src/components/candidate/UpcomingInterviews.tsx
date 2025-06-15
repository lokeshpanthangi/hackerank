
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Building, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInterviews } from '@/hooks/useInterviews';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const UpcomingInterviews = () => {
  const navigate = useNavigate();
  const { interviews, loading } = useInterviews();
  const { user } = useAuth();
  
  const handleJoinInterview = (interviewId: string) => {
    navigate(`/interview-room?id=${interviewId}`);
  };

  // Filter interviews for the current candidate and upcoming ones
  const upcomingInterviews = interviews.filter(interview => {
    if (!user || interview.candidate_id !== user.id) return false;
    if (interview.status === 'cancelled' || interview.status === 'completed') return false;
    if (!interview.scheduled_at) return false;
    
    const interviewDate = new Date(interview.scheduled_at);
    const now = new Date();
    return interviewDate > now;
  }).sort((a, b) => {
    const dateA = new Date(a.scheduled_at!);
    const dateB = new Date(b.scheduled_at!);
    return dateA.getTime() - dateB.getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-tech-green text-dark-primary';
      case 'pending': return 'bg-yellow-500 text-dark-primary';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical': return 'bg-blue-500';
      case 'Culture Fit': return 'bg-purple-500';
      case 'Final Round': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-dark-secondary border-border-dark">
      <CardHeader>
        <CardTitle className="text-lg text-text-primary flex items-center gap-2">
          <Calendar className="h-5 w-5 text-tech-green" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4 text-text-secondary">Loading interviews...</div>
        ) : upcomingInterviews.length === 0 ? (
          <div className="text-center py-4 text-text-secondary">No upcoming interviews scheduled</div>
        ) : (
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => {
              const interviewDate = new Date(interview.scheduled_at!);
              const recruiterName = interview.recruiter ? 
                `${interview.recruiter.first_name || ''} ${interview.recruiter.last_name || ''}`.trim() : 
                'Unknown Recruiter';
              const companyName = interview.job_position?.company?.name || 'Company';
              const positionTitle = interview.job_position?.title || interview.title;
              
              return (
                <div key={interview.id} className="p-4 rounded-lg bg-dark-primary border border-border-dark">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-tech-green/20 rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-tech-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{positionTitle}</h3>
                        <div className="flex items-center gap-2 text-text-secondary text-sm mt-1">
                          <Building className="h-3 w-3" />
                          <span>{companyName}</span>
                        </div>
                        <div className="text-text-secondary text-xs mt-1">
                          Interviewer: {recruiterName}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                      <Badge className="bg-blue-500 text-white">
                        Interview
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(interviewDate, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{format(interviewDate, 'h:mm a')}</span>
                      </div>
                      {interview.duration_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{interview.duration_minutes} min</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-tech-green hover:bg-tech-green/90 text-dark-primary"
                      onClick={() => handleJoinInterview(interview.id)}
                    >
                      <Video className="h-3 w-3 mr-1" />
                      Join
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviews;
