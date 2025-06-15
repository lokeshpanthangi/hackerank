
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  Check,
  Search
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useInterviews } from '@/hooks/useInterviews';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useCandidates } from '@/hooks/useCandidates';

interface ScheduleInterviewModalProps {
  onClose: () => void;
}

interface Candidate {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: 'admin' | 'recruiter' | 'candidate';
  created_at: string;
  updated_at: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
}

const ScheduleInterviewModal = ({ onClose }: ScheduleInterviewModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateSearch, setCandidateSearch] = useState('');
  const [interviewDetails, setInterviewDetails] = useState({
    position: '',
    duration: '60',
    description: '',
    date: undefined as Date | undefined,
    time: '14:00',
    timezone: 'PST'
  });
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createInterview } = useInterviews();
  const { user } = useAuth();
  const { toast } = useToast();
  const { candidates, loading: candidatesLoading } = useCandidates();

  const totalSteps = 5;

  const templates: Template[] = [
    {
      id: '1',
      name: 'Frontend React Assessment',
      description: 'Comprehensive React.js interview with hooks, state management, and component architecture',
      duration: '60 min',
      difficulty: 'Medium',
      questions: 8
    },
    {
      id: '2',
      name: 'Backend Node.js Challenge',
      description: 'Server-side development interview covering APIs, databases, and system design',
      duration: '90 min',
      difficulty: 'Hard',
      questions: 10
    },
    {
      id: '3',
      name: 'Full Stack Assessment',
      description: 'Complete full-stack interview with frontend, backend, and database questions',
      duration: '120 min',
      difficulty: 'Hard',
      questions: 12
    },
    {
      id: '4',
      name: 'Junior Developer Basics',
      description: 'Entry-level interview focusing on programming fundamentals and problem-solving',
      duration: '45 min',
      difficulty: 'Easy',
      questions: 6
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const fullName = `${candidate.first_name || ''} ${candidate.last_name || ''}`.trim();
    return fullName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
           candidate.email.toLowerCase().includes(candidateSearch.toLowerCase());
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSchedule = async () => {
    if (!selectedCandidate || !interviewDetails.date || !interviewDetails.time || !user) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Combine date and time into a proper datetime
      const scheduledDateTime = new Date(interviewDetails.date);
      const [hours, minutes] = interviewDetails.time.split(':').map(Number);
      scheduledDateTime.setHours(hours, minutes, 0, 0);

      const interviewData = {
        candidate_id: selectedCandidate.id,
        recruiter_id: user.id,
        job_position_id: null, // You might want to add job position selection
        title: `Interview with ${selectedCandidate.first_name} ${selectedCandidate.last_name}`,
        description: interviewDetails.description,
        scheduled_at: scheduledDateTime.toISOString(),
        duration_minutes: parseInt(interviewDetails.duration),
        status: 'scheduled' as const,
        meeting_url: null,
        notes: interviewDetails.description,
        overall_score: null,
        feedback: null
      };

      const result = await createInterview(interviewData);
      
      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to schedule interview. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Interview scheduled successfully!",
          variant: "default"
        });
        onClose();
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return selectedCandidate !== null;
      case 2: return interviewDetails.position && interviewDetails.duration;
      case 3: return interviewDetails.date && interviewDetails.time;
      case 4: return selectedTemplate !== null;
      case 5: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-text-primary mb-2 block">Search Candidates</Label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or position..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  className="pl-10 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
            </div>

            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {candidatesLoading ? (
                <div className="text-center py-4 text-text-secondary">Loading candidates...</div>
              ) : filteredCandidates.length === 0 ? (
                <div className="text-center py-4 text-text-secondary">No candidates found</div>
              ) : (
                filteredCandidates.map((candidate) => {
                  const fullName = `${candidate.first_name || ''} ${candidate.last_name || ''}`.trim();
                  const initials = `${candidate.first_name?.[0] || ''}${candidate.last_name?.[0] || ''}`.toUpperCase();
                  
                  return (
                    <Card 
                      key={candidate.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedCandidate?.id === candidate.id 
                          ? 'bg-tech-green/10 border-tech-green' 
                          : 'bg-dark-primary border-border-dark hover:border-tech-green/50'
                      }`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-tech-green/20 rounded-full flex items-center justify-center">
                            {candidate.avatar_url ? (
                              <img src={candidate.avatar_url} alt={fullName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="text-tech-green font-semibold text-sm">{initials}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-text-primary">{fullName || 'No Name'}</h4>
                            <p className="text-sm text-text-secondary">{candidate.email}</p>
                            <p className="text-xs text-text-secondary">Candidate</p>
                          </div>
                          {selectedCandidate?.id === candidate.id && (
                            <Check size={16} className="text-tech-green" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="position" className="text-text-primary">Position</Label>
              <Input
                id="position"
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                value={interviewDetails.position}
                onChange={(e) => setInterviewDetails({ ...interviewDetails, position: e.target.value })}
                className="bg-dark-primary border-border-dark text-text-primary"
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-text-primary">Duration</Label>
              <Select value={interviewDetails.duration} onValueChange={(value) => setInterviewDetails({ ...interviewDetails, duration: value })}>
                <SelectTrigger className="bg-dark-primary border-border-dark text-text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary border-border-dark">
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-text-primary">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any special instructions or notes for this interview..."
                value={interviewDetails.description}
                onChange={(e) => setInterviewDetails({ ...interviewDetails, description: e.target.value })}
                className="bg-dark-primary border-border-dark text-text-primary"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-text-primary mb-2 block">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-dark-primary border-border-dark",
                      !interviewDetails.date && "text-text-secondary"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {interviewDetails.date ? format(interviewDetails.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-dark-secondary border-border-dark" align="start">
                  <Calendar
                    mode="single"
                    selected={interviewDetails.date}
                    onSelect={(date) => setInterviewDetails({ ...interviewDetails, date })}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time" className="text-text-primary">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={interviewDetails.time}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, time: e.target.value })}
                  className="bg-dark-primary border-border-dark text-text-primary"
                />
              </div>

              <div>
                <Label htmlFor="timezone" className="text-text-primary">Timezone</Label>
                <Select value={interviewDetails.timezone} onValueChange={(value) => setInterviewDetails({ ...interviewDetails, timezone: value })}>
                  <SelectTrigger className="bg-dark-primary border-border-dark text-text-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary border-border-dark">
                    <SelectItem value="PST">PST (UTC-8)</SelectItem>
                    <SelectItem value="EST">EST (UTC-5)</SelectItem>
                    <SelectItem value="CST">CST (UTC-6)</SelectItem>
                    <SelectItem value="MST">MST (UTC-7)</SelectItem>
                    <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-text-primary mb-2 block">Choose Interview Template</Label>
              <p className="text-text-secondary text-sm mb-4">
                Select a pre-configured template or create a custom interview structure
              </p>
            </div>

            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id 
                      ? 'bg-tech-green/10 border-tech-green' 
                      : 'bg-dark-primary border-border-dark hover:border-tech-green/50'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-text-primary">{template.name}</h4>
                          <Badge className={`${getDifficultyColor(template.difficulty)} border text-xs`}>
                            {template.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">{template.description}</p>
                        <div className="flex items-center gap-4 text-xs text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {template.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={12} />
                            {template.questions} questions
                          </span>
                        </div>
                      </div>
                      {selectedTemplate?.id === template.id && (
                        <Check size={16} className="text-tech-green" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Review Interview Details</h3>
              <p className="text-text-secondary">Please review all details before scheduling the interview</p>
            </div>

            <div className="space-y-4">
              <Card className="bg-dark-primary border-border-dark">
                <CardHeader className="pb-3">
                  <CardTitle className="text-text-primary flex items-center gap-2">
                    <User size={16} />
                    Candidate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedCandidate && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-tech-green/20 rounded-full flex items-center justify-center">
                        <span className="text-tech-green font-semibold text-sm">{selectedCandidate.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{selectedCandidate.name}</h4>
                        <p className="text-sm text-text-secondary">{selectedCandidate.email}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-dark-primary border-border-dark">
                <CardHeader className="pb-3">
                  <CardTitle className="text-text-primary flex items-center gap-2">
                    <CalendarIcon size={16} />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Date:</span>
                      <span className="text-text-primary">
                        {interviewDetails.date ? format(interviewDetails.date, "PPP") : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Time:</span>
                      <span className="text-text-primary">{interviewDetails.time} {interviewDetails.timezone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Duration:</span>
                      <span className="text-text-primary">{interviewDetails.duration} minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-primary border-border-dark">
                <CardHeader className="pb-3">
                  <CardTitle className="text-text-primary flex items-center gap-2">
                    <FileText size={16} />
                    Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-text-primary">{selectedTemplate.name}</h4>
                        <Badge className={`${getDifficultyColor(selectedTemplate.difficulty)} border text-xs`}>
                          {selectedTemplate.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-secondary">{selectedTemplate.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= currentStep 
                  ? 'bg-tech-green text-dark-primary' 
                  : 'bg-dark-primary border border-border-dark text-text-secondary'
              }`}>
                {i + 1 <= currentStep ? <Check size={16} /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  i + 1 < currentStep ? 'bg-tech-green' : 'bg-border-dark'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-border-dark">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="border-border-dark text-text-secondary hover:text-text-primary disabled:opacity-50"
        >
          <ChevronLeft size={16} className="mr-2" />
          Previous
        </Button>

        {currentStep === totalSteps ? (
          <Button
            onClick={handleSchedule}
            disabled={!isStepValid() || isSubmitting}
            className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Interview'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
