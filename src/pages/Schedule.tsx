import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Clock, Users, Settings } from 'lucide-react';
import SchedulingCalendar from '@/components/scheduling/SchedulingCalendar';
import SchedulingWizard from '@/components/scheduling/SchedulingWizard';
import AvailabilityManager from '@/components/scheduling/AvailabilityManager';
import InterviewTemplates from '@/components/scheduling/InterviewTemplates';
import CalendarIntegration from '@/components/scheduling/CalendarIntegration';
import BackButton from '@/components/ui/back-button';
import { useProfile } from '@/hooks/useProfile';

const Schedule = () => {
  const [activeView, setActiveView] = useState('calendar');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const { profile } = useProfile();

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

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <div className="bg-dark-secondary border-b border-border-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton 
              to={getBackDestination()}
              label="Back to Dashboard" 
              className="text-text-secondary hover:text-text-primary"
            />
            <div className="h-6 w-px bg-border-dark mx-1"></div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">Interview Scheduling</h1>
              <p className="text-text-secondary">Manage interviews, availability, and templates</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsWizardOpen(true)}
            className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold"
          >
            <Plus size={16} className="mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-dark-primary border-border-dark">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-tech-green" />
                <div>
                  <p className="text-lg font-semibold text-text-primary">24</p>
                  <p className="text-sm text-text-secondary">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-primary border-border-dark">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-lg font-semibold text-text-primary">36h</p>
                  <p className="text-sm text-text-secondary">Available Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-primary border-border-dark">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-lg font-semibold text-text-primary">12</p>
                  <p className="text-sm text-text-secondary">Interviewers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-primary border-border-dark">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-orange-400" />
                <div>
                  <p className="text-lg font-semibold text-text-primary">8</p>
                  <p className="text-sm text-text-secondary">Templates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="bg-dark-secondary border-border-dark">
            <TabsTrigger 
              value="calendar" 
              className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary"
            >
              Calendar View
            </TabsTrigger>
            <TabsTrigger 
              value="availability" 
              className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary"
            >
              Availability
            </TabsTrigger>
            <TabsTrigger 
              value="templates" 
              className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger 
              value="integration" 
              className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary"
            >
              Integration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <SchedulingCalendar />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <AvailabilityManager />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <InterviewTemplates />
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <CalendarIntegration />
          </TabsContent>
        </Tabs>
      </div>

      {/* Scheduling Wizard Modal */}
      {isWizardOpen && (
        <SchedulingWizard onClose={() => setIsWizardOpen(false)} />
      )}
    </div>
  );
};

export default Schedule;
