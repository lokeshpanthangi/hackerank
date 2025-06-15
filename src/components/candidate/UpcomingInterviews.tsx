
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Building, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpcomingInterviews = () => {
  const navigate = useNavigate();
  
  const handleJoinInterview = (interviewId: number) => {
    navigate(`/interview-room?id=${interviewId}`);
  };
  const upcomingInterviews = [
    {
      id: 1,
      company: 'TechCorp',
      position: 'Senior Frontend Developer',
      date: '2024-06-18',
      time: '2:00 PM',
      type: 'Technical',
      status: 'confirmed',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Engineer',
      date: '2024-06-20',
      time: '10:30 AM',
      type: 'Culture Fit',
      status: 'pending',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 3,
      company: 'InnovateLabs',
      position: 'React Developer',
      date: '2024-06-22',
      time: '4:00 PM',
      type: 'Final Round',
      status: 'confirmed',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=40&h=40&fit=crop&crop=center'
    }
  ];

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
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="p-4 rounded-lg bg-dark-primary border border-border-dark">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={interview.logo} 
                    alt={interview.company}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary">{interview.position}</h3>
                    <div className="flex items-center gap-2 text-text-secondary text-sm mt-1">
                      <Building className="h-3 w-3" />
                      <span>{interview.company}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                  <Badge className={`${getTypeColor(interview.type)} text-white`}>
                    {interview.type}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{interview.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{interview.time}</span>
                  </div>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviews;
