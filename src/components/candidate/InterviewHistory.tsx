
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { useInterviews } from '@/hooks/useInterviews';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const InterviewHistory = () => {
  const { interviews, loading } = useInterviews();
  const { user } = useAuth();

  // Filter interviews for the current candidate that are completed
  const interviewHistory = interviews.filter(interview => {
    if (!user || interview.candidate_id !== user.id) return false;
    if (!interview.scheduled_at) return false;
    
    const interviewDate = new Date(interview.scheduled_at);
    const now = new Date();
    return interviewDate < now; // Past interviews only
  }).sort((a, b) => {
    const dateA = new Date(a.scheduled_at!);
    const dateB = new Date(b.scheduled_at!);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-tech-green text-dark-primary';
      case 'pending': return 'bg-yellow-500 text-dark-primary';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-tech-green';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="bg-dark-secondary border-border-dark">
      <CardHeader>
        <CardTitle className="text-lg text-text-primary flex items-center gap-2">
          <Clock className="h-5 w-5 text-tech-green" />
          Interview History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-text-secondary py-8">
            Loading interview history...
          </div>
        ) : interviewHistory.length === 0 ? (
          <div className="text-center text-text-secondary py-8">
            No interview history available
          </div>
        ) : (
          <div className="space-y-6">
            {interviewHistory.map((interview, index) => (
              <div key={interview.id} className="relative">
                {/* Timeline Line */}
                {index !== interviewHistory.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-border-dark"></div>
                )}
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-dark-primary border-2 border-tech-green flex items-center justify-center">
                      <Award className="h-6 w-6 text-tech-green" />
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-dark-primary rounded-lg p-4 border border-border-dark">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {interview.job_position?.title || 'Interview'}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {interview.recruiter ? 
                            `${interview.recruiter.first_name} ${interview.recruiter.last_name}` : 
                            'Unknown Recruiter'
                          } • {interview.scheduled_at ? format(new Date(interview.scheduled_at), 'MMM dd, yyyy') : 'No date'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {interview.overall_score && (
                          <span className={`text-2xl font-bold ${getScoreColor(interview.overall_score)}`}>
                            {interview.overall_score}
                          </span>
                        )}
                        <Badge className={getStatusColor(interview.status || 'completed')}>
                          {interview.status || 'completed'}
                        </Badge>
                      </div>
                    </div>
                    
                    {interview.duration_minutes && (
                      <div className="mb-3">
                        <span className="text-sm text-text-secondary">
                          Duration: {interview.duration_minutes} minutes
                        </span>
                      </div>
                    )}
                    
                    {interview.feedback && (
                      <p className="text-sm text-text-secondary bg-dark-secondary p-3 rounded border border-border-dark">
                        {interview.feedback}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterviewHistory;
