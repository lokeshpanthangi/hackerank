
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, User, Calendar, Mail, Phone, Video, MapPin } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const SchedulingWizard = ({ onClose }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    candidate: '',
    interviewType: '',
    duration: '',
    interviewer: '',
    date: '',
    time: '',
    template: ''
  });

  const totalSteps = 5;

  const mockCandidates = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', position: 'Frontend Developer' },
    { id: '2', name: 'Michael Chen', email: 'michael@email.com', position: 'Backend Engineer' },
    { id: '3', name: 'Emily Davis', email: 'emily@email.com', position: 'Full Stack Developer' }
  ];

  const mockInterviewers = [
    { id: '1', name: 'John Smith', role: 'Senior Engineer', available: true },
    { id: '2', name: 'Emily Wilson', role: 'Tech Lead', available: true },
    { id: '3', name: 'Mike Johnson', role: 'Engineering Manager', available: false }
  ];

  const mockTemplates = [
    { id: '1', name: 'Frontend Technical', duration: '60 min', questions: 12 },
    { id: '2', name: 'Backend System Design', duration: '90 min', questions: 8 },
    { id: '3', name: 'Full Stack Assessment', duration: '120 min', questions: 15 }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Select Candidate</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={16} />
              <Input
                placeholder="Search candidates..."
                className="pl-10 bg-dark-primary border-border-dark text-text-primary"
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {mockCandidates.map((candidate) => (
                <Card 
                  key={candidate.id}
                  className={`bg-dark-primary border-border-dark cursor-pointer hover:border-tech-green/50 transition-colors ${
                    formData.candidate === candidate.id ? 'border-tech-green' : ''
                  }`}
                  onClick={() => setFormData({...formData, candidate: candidate.id})}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">{candidate.name}</h4>
                        <p className="text-sm text-text-secondary">{candidate.email}</p>
                        <Badge className="mt-1 bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {candidate.position}
                        </Badge>
                      </div>
                      <User className="text-tech-green" size={20} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Interview Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-primary">Interview Type</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[
                    { type: 'video', icon: Video, label: 'Video' },
                    { type: 'phone', icon: Phone, label: 'Phone' },
                    { type: 'in-person', icon: MapPin, label: 'In-Person' }
                  ].map(({ type, icon: Icon, label }) => (
                    <Button
                      key={type}
                      variant={formData.interviewType === type ? 'default' : 'outline'}
                      className={`flex flex-col gap-2 h-16 ${
                        formData.interviewType === type 
                          ? 'bg-tech-green text-dark-primary' 
                          : 'border-border-dark text-text-secondary hover:text-text-primary'
                      }`}
                      onClick={() => setFormData({...formData, interviewType: type})}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-text-primary">Duration</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['30 min', '60 min', '90 min'].map((duration) => (
                    <Button
                      key={duration}
                      variant={formData.duration === duration ? 'default' : 'outline'}
                      className={`${
                        formData.duration === duration 
                          ? 'bg-tech-green text-dark-primary' 
                          : 'border-border-dark text-text-secondary hover:text-text-primary'
                      }`}
                      onClick={() => setFormData({...formData, duration})}
                    >
                      {duration}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Select Interviewer</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {mockInterviewers.map((interviewer) => (
                <Card 
                  key={interviewer.id}
                  className={`bg-dark-primary border-border-dark cursor-pointer hover:border-tech-green/50 transition-colors ${
                    formData.interviewer === interviewer.id ? 'border-tech-green' : ''
                  } ${!interviewer.available ? 'opacity-50' : ''}`}
                  onClick={() => interviewer.available && setFormData({...formData, interviewer: interviewer.id})}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">{interviewer.name}</h4>
                        <p className="text-sm text-text-secondary">{interviewer.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={interviewer.available 
                          ? 'bg-tech-green/20 text-tech-green border-tech-green/30' 
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }>
                          {interviewer.available ? 'Available' : 'Busy'}
                        </Badge>
                        <User className="text-tech-green" size={20} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Date & Time</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-primary">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="mt-2 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
              <div>
                <Label className="text-text-primary">Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="mt-2 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-text-primary">Available Time Slots</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['09:00', '10:30', '14:00', '15:30', '16:00', '17:00'].map((time) => (
                  <Button
                    key={time}
                    variant={formData.time === time ? 'default' : 'outline'}
                    className={`${
                      formData.time === time 
                        ? 'bg-tech-green text-dark-primary' 
                        : 'border-border-dark text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setFormData({...formData, time})}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Select Template</h3>
            <div className="space-y-2">
              {mockTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`bg-dark-primary border-border-dark cursor-pointer hover:border-tech-green/50 transition-colors ${
                    formData.template === template.id ? 'border-tech-green' : ''
                  }`}
                  onClick={() => setFormData({...formData, template: template.id})}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">{template.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {template.duration}
                          </span>
                          <span>{template.questions} questions</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-dark-secondary border-border-dark">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2">
            <Calendar className="h-5 w-5 text-tech-green" />
            Schedule New Interview
          </DialogTitle>
        </DialogHeader>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= currentStep 
                  ? 'bg-tech-green text-dark-primary' 
                  : 'bg-dark-primary text-text-secondary border border-border-dark'
              }`}>
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  i + 1 < currentStep ? 'bg-tech-green' : 'bg-border-dark'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Step Content */}
        <div className="min-h-96">
          {renderStepContent()}
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border-dark">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-border-dark text-text-secondary hover:text-text-primary"
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border-dark text-text-secondary hover:text-text-primary"
            >
              Cancel
            </Button>
            {currentStep === totalSteps ? (
              <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                <Mail className="mr-2" size={16} />
                Schedule & Send Invite
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                className="bg-tech-green hover:bg-tech-green/90 text-dark-primary"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulingWizard;
