
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Clock, FileText, Users, Star, Edit, Copy, Trash2 } from 'lucide-react';

const InterviewTemplates = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockTemplates = [
    {
      id: '1',
      name: 'Frontend Technical Interview',
      duration: '60 min',
      questions: 12,
      sections: ['JavaScript Fundamentals', 'React/Vue', 'CSS & HTML', 'Problem Solving'],
      difficulty: 'Intermediate',
      usage: 45,
      rating: 4.8,
      lastUsed: '2 days ago',
      isPublic: true
    },
    {
      id: '2',
      name: 'Backend System Design',
      duration: '90 min',
      questions: 8,
      sections: ['System Architecture', 'Database Design', 'API Design', 'Scalability'],
      difficulty: 'Advanced',
      usage: 32,
      rating: 4.9,
      lastUsed: '1 day ago',
      isPublic: false
    },
    {
      id: '3',
      name: 'Full Stack Assessment',
      duration: '120 min',
      questions: 15,
      sections: ['Frontend', 'Backend', 'Database', 'DevOps', 'Problem Solving'],
      difficulty: 'Advanced',
      usage: 28,
      rating: 4.7,
      lastUsed: '5 days ago',
      isPublic: true
    },
    {
      id: '4',
      name: 'Junior Developer Screening',
      duration: '45 min',
      questions: 10,
      sections: ['Basic Programming', 'Logic & Algorithms', 'Code Reading'],
      difficulty: 'Beginner',
      usage: 67,
      rating: 4.6,
      lastUsed: '1 day ago',
      isPublic: true
    },
    {
      id: '5',
      name: 'DevOps Engineer Interview',
      duration: '75 min',
      questions: 11,
      sections: ['CI/CD', 'Cloud Platforms', 'Infrastructure', 'Monitoring'],
      difficulty: 'Intermediate',
      usage: 21,
      rating: 4.5,
      lastUsed: '3 days ago',
      isPublic: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredTemplates = mockTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.sections.some(section => section.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Interview Templates</h2>
          <p className="text-text-secondary">Create and manage reusable interview formats</p>
        </div>
        <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
          <Plus size={16} className="mr-2" />
          Create Template
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="text"
                placeholder="Search templates, sections, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-primary border-border-dark text-text-primary"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                Difficulty
              </Button>
              <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                Duration
              </Button>
              <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                Usage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-dark-secondary border-border-dark hover:border-tech-green/30 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-text-primary mb-2">{template.name}</CardTitle>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {template.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={12} />
                      {template.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {template.usage} uses
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs">{template.rating}</span>
                  </div>
                  {template.isPublic && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      Public
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Badge className={`${getDifficultyColor(template.difficulty)} border text-xs mb-2`}>
                  {template.difficulty}
                </Badge>
                <div className="flex flex-wrap gap-2">
                  {template.sections.map((section, index) => (
                    <Badge key={index} className="bg-dark-primary text-text-secondary border-border-dark text-xs">
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border-dark">
                <span className="text-xs text-text-secondary">
                  Last used {template.lastUsed}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-text-secondary hover:text-text-primary">
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-text-secondary hover:text-text-primary">
                    <Copy size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-tech-green" />
              <div>
                <p className="text-lg font-semibold text-text-primary">24</p>
                <p className="text-sm text-text-secondary">Total Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-lg font-semibold text-text-primary">156</p>
                <p className="text-sm text-text-secondary">Total Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-lg font-semibold text-text-primary">4.7</p>
                <p className="text-sm text-text-secondary">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Templates */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardHeader>
          <CardTitle className="text-lg text-text-primary">Most Popular Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTemplates
              .sort((a, b) => b.usage - a.usage)
              .slice(0, 3)
              .map((template, index) => (
                <div key={template.id} className="flex items-center justify-between p-3 bg-dark-primary rounded-lg border border-border-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-tech-green rounded-full flex items-center justify-center text-dark-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{template.name}</h4>
                      <p className="text-sm text-text-secondary">{template.usage} uses this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs">{template.rating}</span>
                    </div>
                    <Badge className={`${getDifficultyColor(template.difficulty)} border text-xs`}>
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewTemplates;
