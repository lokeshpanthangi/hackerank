
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, Award } from 'lucide-react';

const InterviewHistory = () => {
  const interviewHistory = [
    {
      id: 1,
      company: 'TechFlow',
      position: 'Frontend Developer',
      date: '2024-06-10',
      overallScore: 85,
      status: 'passed',
      skills: {
        'JavaScript': 90,
        'React': 85,
        'CSS': 80,
        'Problem Solving': 88
      },
      feedback: 'Excellent problem-solving skills and clean code implementation.',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=32&h=32&fit=crop&crop=center'
    },
    {
      id: 2,
      company: 'DataCorp',
      position: 'Full Stack Developer',
      date: '2024-06-05',
      overallScore: 72,
      status: 'pending',
      skills: {
        'Node.js': 75,
        'Python': 70,
        'Database': 68,
        'API Design': 76
      },
      feedback: 'Good technical foundation, needs improvement in database optimization.',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=center'
    },
    {
      id: 3,
      company: 'CloudTech',
      position: 'React Developer',
      date: '2024-05-28',
      overallScore: 78,
      status: 'rejected',
      skills: {
        'React': 82,
        'TypeScript': 75,
        'Testing': 70,
        'Communication': 80
      },
      feedback: 'Strong React skills but needs more experience with testing frameworks.',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=32&h=32&fit=crop&crop=center'
    }
  ];

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
                    <img 
                      src={interview.logo} 
                      alt={interview.company}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 bg-dark-primary rounded-lg p-4 border border-border-dark">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary">{interview.position}</h3>
                      <p className="text-sm text-text-secondary">{interview.company} • {interview.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${getScoreColor(interview.overallScore)}`}>
                        {interview.overallScore}
                      </span>
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {Object.entries(interview.skills).map(([skill, score]) => (
                      <div key={skill} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">{skill}</span>
                          <span className={getScoreColor(score)}>{score}%</span>
                        </div>
                        <Progress value={score} className="h-1" />
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-text-secondary bg-dark-secondary p-3 rounded border border-border-dark">
                    {interview.feedback}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewHistory;
