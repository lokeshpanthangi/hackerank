
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Clock, User, AlertTriangle, CheckCircle, Plus, Settings } from 'lucide-react';

const AvailabilityManager = () => {
  const [selectedInterviewer, setSelectedInterviewer] = useState('1');

  const mockInterviewers = [
    { 
      id: '1', 
      name: 'John Smith', 
      role: 'Senior Engineer',
      totalHours: 40,
      availableHours: 12,
      conflicts: 2,
      status: 'available'
    },
    { 
      id: '2', 
      name: 'Emily Wilson', 
      role: 'Tech Lead',
      totalHours: 35,
      availableHours: 8,
      conflicts: 0,
      status: 'busy'
    },
    { 
      id: '3', 
      name: 'Mike Johnson', 
      role: 'Engineering Manager',
      totalHours: 30,
      availableHours: 15,
      conflicts: 1,
      status: 'available'
    }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const mockAvailability = {
    '1': {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['09:00', '10:00', '16:00', '17:00'],
      'Wednesday': ['09:00', '11:00', '14:00', '15:00', '16:00'],
      'Thursday': ['10:00', '11:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00', '16:00']
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-tech-green/20 text-tech-green border-tech-green';
      case 'busy': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'partial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Interviewer Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockInterviewers.map((interviewer) => (
          <Card 
            key={interviewer.id}
            className={`bg-dark-secondary border-border-dark cursor-pointer hover:border-tech-green/50 transition-colors ${
              selectedInterviewer === interviewer.id ? 'border-tech-green' : ''
            }`}
            onClick={() => setSelectedInterviewer(interviewer.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-text-primary">{interviewer.name}</h3>
                  <p className="text-sm text-text-secondary">{interviewer.role}</p>
                </div>
                <Badge className={`${getStatusColor(interviewer.status)} border capitalize`}>
                  {interviewer.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Available Hours:</span>
                  <span className="text-tech-green font-medium">
                    {interviewer.availableHours}h / {interviewer.totalHours}h
                  </span>
                </div>
                <div className="w-full bg-dark-primary rounded-full h-2">
                  <div 
                    className="bg-tech-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(interviewer.availableHours / interviewer.totalHours) * 100}%` }}
                  />
                </div>
                {interviewer.conflicts > 0 && (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertTriangle size={12} />
                    <span>{interviewer.conflicts} conflicts</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Availability Calendar */}
        <div className="lg:col-span-2">
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-lg text-text-primary flex items-center gap-2">
                <Clock className="h-5 w-5 text-tech-green" />
                Weekly Availability - {mockInterviewers.find(i => i.id === selectedInterviewer)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-text-secondary text-sm font-medium p-2">Time</th>
                      {weekDays.map(day => (
                        <th key={day} className="text-center text-text-secondary text-sm font-medium p-2">
                          {day.slice(0, 3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(time => (
                      <tr key={time}>
                        <td className="text-text-secondary text-sm p-2 font-medium">{time}</td>
                        {weekDays.map(day => {
                          const isAvailable = mockAvailability[selectedInterviewer]?.[day]?.includes(time);
                          const hasInterview = Math.random() > 0.8; // Mock interview data
                          
                          return (
                            <td key={`${day}-${time}`} className="p-1">
                              <div 
                                className={`h-8 rounded cursor-pointer transition-colors ${
                                  hasInterview 
                                    ? 'bg-red-500/20 border border-red-500/30' 
                                    : isAvailable 
                                      ? 'bg-tech-green/20 border border-tech-green/30 hover:bg-tech-green/30' 
                                      : 'bg-dark-primary border border-border-dark hover:bg-gray-500/20'
                                }`}
                                title={hasInterview ? 'Interview scheduled' : isAvailable ? 'Available' : 'Not available'}
                              >
                                {hasInterview && (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center gap-6 mt-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-tech-green/20 border border-tech-green/30 rounded" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500/20 border border-red-500/30 rounded" />
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-dark-primary border border-border-dark rounded" />
                  <span>Unavailable</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Availability Settings */}
        <div className="space-y-6">
          {/* Quick Settings */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-lg text-text-primary flex items-center gap-2">
                <Settings className="h-5 w-5 text-tech-green" />
                Quick Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-text-primary">Auto-accept meetings</Label>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-text-primary">Buffer time (minutes)</Label>
                <Input 
                  type="number" 
                  defaultValue="15" 
                  className="w-20 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-text-primary">Max interviews/day</Label>
                <Input 
                  type="number" 
                  defaultValue="4" 
                  className="w-20 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-text-primary">Lunch break</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Conflicts & Alerts */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-lg text-text-primary flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Conflicts & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                  <AlertTriangle size={14} />
                  Double booking detected
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Tuesday 2PM - Sarah Johnson & Michael Chen
                </p>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                  <Clock size={14} />
                  Long interview session
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Wednesday 2PM-5PM - 3 back-to-back interviews
                </p>
              </div>
              
              <div className="p-3 bg-tech-green/10 border border-tech-green/20 rounded-lg">
                <div className="flex items-center gap-2 text-tech-green text-sm font-medium">
                  <CheckCircle size={14} />
                  Good availability
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  12 hours available this week
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-lg text-text-primary">Bulk Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Recurring Slots
              </Button>
              <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                <Clock className="h-4 w-4 mr-2" />
                Copy Previous Week
              </Button>
              <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                <Settings className="h-4 w-4 mr-2" />
                Sync with Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManager;
