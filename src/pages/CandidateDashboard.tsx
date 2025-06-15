import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, Award, User, FileText, Target } from 'lucide-react';
import WelcomeHeader from '@/components/candidate/WelcomeHeader';
import UpcomingInterviews from '@/components/candidate/UpcomingInterviews';
import InterviewHistory from '@/components/candidate/InterviewHistory';
import PerformanceAnalytics from '@/components/candidate/PerformanceAnalytics';
import ProfileCompletion from '@/components/candidate/ProfileCompletion';
import SkillAssessments from '@/components/candidate/SkillAssessments';
import CandidateNavbar from '@/components/candidate/CandidateNavbar';
import AssessmentsList from '@/components/candidate/AssessmentsList';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const handleCompleteProfile = () => {
    navigate('/profile');
  };

  const handleUploadResume = () => {
    navigate('/profile?section=resume');
  };

  const handleTakeAssessment = () => {
    navigate('/assessments');
  };

  return (
    <div className="min-h-screen bg-dark-primary text-text-primary">
      <CandidateNavbar />
      <div className="container mx-auto px-4 py-6">
        <WelcomeHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileCompletion />
            <UpcomingInterviews />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <PerformanceAnalytics />
            <SkillAssessments />
            <AssessmentsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
