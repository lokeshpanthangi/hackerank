
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock, User, MapPin } from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  time: string;
  duration: string;
  type: 'video' | 'phone' | 'in-person';
  interviewer: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

const SchedulingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');

  // Mock interview data
  const interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      position: 'Frontend Developer',
      time: '09:00',
      duration: '60 min',
      type: 'video',
      interviewer: 'John Smith',
      status: 'confirmed'
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      position: 'Backend Engineer',
      time: '11:30',
      duration: '90 min',
      type: 'video',
      interviewer: 'Emily Davis',
      status: 'scheduled'
    },
    {
      id: '3',
      candidateName: 'Lisa Wang',
      position: 'Full Stack Developer',
      time: '14:00',
      duration: '75 min',
      type: 'phone',
      interviewer: 'Mike Wilson',
      status: 'scheduled'
    },
    {
      id: '4',
      candidateName: 'David Rodriguez',
      position: 'DevOps Engineer',
      time: '16:00',
      duration: '60 min',
      type: 'in-person',
      interviewer: 'Sarah Brown',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-tech-green/20 text-tech-green border-tech-green';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '📹';
      case 'phone': return '📞';
      case 'in-person': return '🏢';
      default: return '📅';
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
                  <ChevronLeft size={16} />
                </Button>
                <h2 className="text-lg font-semibold text-text-primary">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
                  <ChevronRight size={16} />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-border-dark text-text-secondary hover:text-text-primary"
              >
                Today
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              {['month', 'week', 'day'].map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
                  className={viewMode === mode 
                    ? 'bg-tech-green text-dark-primary' 
                    : 'border-border-dark text-text-secondary hover:text-text-primary'
                  }
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Time Column */}
        <div className="lg:col-span-1">
          <Card className="bg-dark-secondary border-border-dark h-full">
            <CardContent className="p-4">
              <div className="space-y-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="text-sm text-text-secondary py-2">
                    {String(9 + i).padStart(2, '0')}:00
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Calendar Days */}
        <div className="lg:col-span-6">
          <Card className="bg-dark-secondary border-border-dark">
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="min-h-32 p-2 border border-border-dark rounded-lg relative">
                    <div className="text-xs text-text-secondary mb-2">
                      {Math.floor(Math.random() * 28) + 1}
                    </div>
                    
                    {/* Sample interviews on certain days */}
                    {i % 7 === 2 && (
                      <div className="space-y-1">
                        {interviews.slice(0, 2).map((interview, idx) => (
                          <div 
                            key={idx}
                            className="text-xs p-1 rounded bg-tech-green/20 border border-tech-green/30 cursor-pointer hover:bg-tech-green/30 transition-colors"
                          >
                            <div className="font-medium text-tech-green truncate">
                              {interview.time} {interview.candidateName}
                            </div>
                            <div className="text-text-secondary truncate">
                              {interview.position}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {i % 7 === 4 && (
                      <div className="space-y-1">
                        {interviews.slice(2, 4).map((interview, idx) => (
                          <div 
                            key={idx}
                            className="text-xs p-1 rounded bg-blue-500/20 border border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors"
                          >
                            <div className="font-medium text-blue-400 truncate">
                              {interview.time} {interview.candidateName}
                            </div>
                            <div className="text-text-secondary truncate">
                              {interview.position}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Today's Schedule */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardHeader>
          <CardTitle className="text-lg text-text-primary flex items-center gap-2">
            <Calendar className="h-5 w-5 text-tech-green" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-4 bg-dark-primary rounded-lg border border-border-dark">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{getTypeIcon(interview.type)}</div>
                <div>
                  <h4 className="font-medium text-text-primary">{interview.candidateName}</h4>
                  <p className="text-sm text-text-secondary">{interview.position}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {interview.time} ({interview.duration})
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {interview.interviewer}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={`${getStatusColor(interview.status)} border capitalize`}>
                  {interview.status}
                </Badge>
                <Button size="sm" variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulingCalendar;
