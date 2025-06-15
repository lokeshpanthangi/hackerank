
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, User, FileText, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  
  const completionItems = [
    { name: 'Personal Information', completed: true, icon: User, path: '/profile?section=personal' },
    { name: 'Resume Upload', completed: true, icon: FileText, path: '/profile?section=resume' },
    { name: 'Skills Assessment', completed: false, icon: Award, path: '/assessments' },
    { name: 'Work Experience', completed: true, icon: User, path: '/profile?section=experience' },
    { name: 'Education Details', completed: false, icon: Award, path: '/profile?section=education' },
    { name: 'Portfolio Projects', completed: false, icon: FileText, path: '/profile?section=projects' }
  ];

  const completedCount = completionItems.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100);

  return (
    <Card className="bg-dark-secondary border-border-dark">
      <CardHeader>
        <CardTitle className="text-lg text-text-primary flex items-center gap-2">
          <User className="h-5 w-5 text-tech-green" />
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-tech-green">{completionPercentage}%</p>
            <p className="text-sm text-text-secondary">{completedCount} of {completionItems.length} completed</p>
          </div>
          <div className="w-24 h-24">
            <Progress value={completionPercentage} className="h-2 w-full" />
          </div>
        </div>

        <Alert className="bg-dark-primary border-border-dark">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-text-secondary">
            Complete your profile to increase your chances of getting hired by 3x!
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {completionItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dark-primary">
              <div className={`p-2 rounded-full ${item.completed ? 'bg-tech-green' : 'bg-gray-600'}`}>
                {item.completed ? (
                  <CheckCircle className="h-4 w-4 text-dark-primary" />
                ) : (
                  <item.icon className="h-4 w-4 text-text-secondary" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${item.completed ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {item.name}
                </p>
              </div>
              {!item.completed && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs border-border-dark text-tech-green hover:bg-tech-green hover:text-dark-primary"
                  onClick={() => navigate(item.path)}
                >
                  Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
