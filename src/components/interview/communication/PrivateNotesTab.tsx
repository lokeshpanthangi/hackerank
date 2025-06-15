
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Star, 
  Save, 
  Download, 
  Clock,
  Brain,
  MessageSquare,
  Code,
  Users,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

interface EvaluationCriteria {
  category: string;
  rating: number;
  notes: string;
  icon: React.ReactNode;
}

export const PrivateNotesTab = () => {
  const [privateNotes, setPrivateNotes] = React.useState(`CONFIDENTIAL - RECRUITER NOTES

Candidate: Sarah Chen
Position: Senior Frontend Developer
Date: ${new Date().toLocaleDateString()}
Interviewer: John Doe

FIRST IMPRESSIONS:
- Professional appearance and demeanor
- Arrived 5 minutes early
- Well-prepared with questions about the role
- Confident but not arrogant

STRENGTHS OBSERVED:
- Strong problem-solving methodology
- Clear communication of technical concepts
- Adapts well to feedback and hints
- Good collaboration skills

AREAS FOR IMPROVEMENT:
- Could be more assertive in technical discussions
- Needs more experience with advanced algorithms
- Time management could be better

RECOMMENDATION:
Move to next round - strong candidate overall`);

  const [evaluationCriteria, setEvaluationCriteria] = React.useState<EvaluationCriteria[]>([
    {
      category: 'Problem Solving',
      rating: 4,
      notes: 'Excellent analytical approach, started with brute force then optimized',
      icon: <Brain className="w-4 h-4" />
    },
    {
      category: 'Communication',
      rating: 5,
      notes: 'Clear explanations, asked good questions, professional demeanor',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      category: 'Technical Skills',
      rating: 4,
      notes: 'Strong fundamentals, clean code, good understanding of complexity',
      icon: <Code className="w-4 h-4" />
    },
    {
      category: 'Collaboration',
      rating: 4,
      notes: 'Responsive to feedback, works well with interviewer',
      icon: <Users className="w-4 h-4" />
    },
    {
      category: 'Innovation',
      rating: 3,
      notes: 'Good solutions but could think more creatively about edge cases',
      icon: <Lightbulb className="w-4 h-4" />
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = React.useState('');

  const templates = [
    {
      name: 'Technical Assessment',
      content: `TECHNICAL ASSESSMENT TEMPLATE

Problem Solving Approach:
- [ ] Understood requirements clearly
- [ ] Asked clarifying questions
- [ ] Proposed initial solution
- [ ] Optimized when prompted
- [ ] Explained time/space complexity

Code Quality:
- [ ] Clean, readable code
- [ ] Proper naming conventions
- [ ] Appropriate comments
- [ ] Error handling
- [ ] Best practices followed

Communication:
- [ ] Clear explanations
- [ ] Responded well to hints
- [ ] Professional demeanor
- [ ] Collaborative attitude`
    },
    {
      name: 'Behavioral Assessment',
      content: `BEHAVIORAL ASSESSMENT TEMPLATE

Leadership & Initiative:
- Examples of leadership roles
- Self-directed learning
- Innovation and creativity

Team Collaboration:
- Working with cross-functional teams
- Conflict resolution
- Mentoring others

Adaptability:
- Handling changing requirements
- Learning new technologies
- Working under pressure

Cultural Fit:
- Alignment with company values
- Enthusiasm for the role
- Long-term career goals`
    },
    {
      name: 'Final Decision',
      content: `FINAL DECISION TEMPLATE

Overall Assessment:
Rating: [1-5 stars]

Key Strengths:
1. 
2. 
3. 

Areas for Improvement:
1. 
2. 
3. 

Recommendation:
□ Strong Hire
□ Hire
□ No Hire
□ Strong No Hire

Next Steps:
□ Advance to next round
□ Schedule follow-up interview
□ Make offer
□ Send rejection

Additional Comments:`
    }
  ];

  const updateRating = (index: number, newRating: number) => {
    const updated = [...evaluationCriteria];
    updated[index].rating = newRating;
    setEvaluationCriteria(updated);
  };

  const updateCriteriaNotes = (index: number, notes: string) => {
    const updated = [...evaluationCriteria];
    updated[index].notes = notes;
    setEvaluationCriteria(updated);
  };

  const insertTemplate = () => {
    if (selectedTemplate) {
      const template = templates.find(t => t.name === selectedTemplate);
      if (template) {
        setPrivateNotes(privateNotes + '\n\n' + template.content);
        setSelectedTemplate('');
      }
    }
  };

  const calculateOverallRating = () => {
    const total = evaluationCriteria.reduce((sum, criteria) => sum + criteria.rating, 0);
    return (total / evaluationCriteria.length).toFixed(1);
  };

  const exportNotes = () => {
    const fullNotes = `${privateNotes}\n\n--- EVALUATION SUMMARY ---\n\nOverall Rating: ${calculateOverallRating()}/5\n\n` +
      evaluationCriteria.map(c => `${c.category}: ${c.rating}/5 - ${c.notes}`).join('\n\n');
    
    const blob = new Blob([fullNotes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `private-interview-notes-sarah-chen-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
            CONFIDENTIAL
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-border-dark text-text-secondary hover:text-white">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-border-dark text-text-secondary hover:text-white"
            onClick={exportNotes}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 flex space-x-4">
        {/* Left Panel - Notes */}
        <div className="w-2/3 flex flex-col space-y-4">
          {/* Quick Templates */}
          <Card className="bg-dark-primary border-border-dark p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-tech-green" />
              <span className="text-white font-medium text-sm">Quick Templates</span>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="flex-1 bg-dark-secondary border border-border-dark rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-tech-green"
              >
                <option value="">Select a template...</option>
                {templates.map((template) => (
                  <option key={template.name} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
              <Button 
                size="sm" 
                onClick={insertTemplate}
                disabled={!selectedTemplate}
                className="bg-tech-green hover:bg-tech-green/80 text-dark-primary"
              >
                Insert
              </Button>
            </div>
          </Card>

          {/* Private Notes Area */}
          <div className="flex-1">
            <Textarea
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Add your private interview observations and notes here..."
              className="h-full bg-dark-primary border-border-dark text-white resize-none focus:border-tech-green font-mono text-sm"
              style={{ 
                fontFamily: 'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',
                lineHeight: '1.6'
              }}
            />
          </div>
        </div>

        {/* Right Panel - Evaluation */}
        <div className="w-1/3">
          <Card className="bg-dark-primary border-border-dark p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Evaluation Matrix</h4>
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary text-sm">Overall:</span>
                <Badge className="bg-tech-green text-dark-primary font-bold">
                  {calculateOverallRating()}/5
                </Badge>
              </div>
            </div>

            <ScrollArea className="h-full">
              <div className="space-y-4">
                {evaluationCriteria.map((criteria, index) => (
                  <div key={index} className="bg-dark-secondary p-3 rounded border border-border-dark">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {criteria.icon}
                        <span className="text-white font-medium text-sm">{criteria.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => updateRating(index, star)}
                            className={`w-4 h-4 ${
                              star <= criteria.rating ? 'text-tech-green' : 'text-text-secondary'
                            } hover:text-tech-green transition-colors`}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={criteria.notes}
                      onChange={(e) => updateCriteriaNotes(index, e.target.value)}
                      placeholder="Add specific observations..."
                      className="w-full bg-dark-primary border border-border-dark rounded px-2 py-1 text-white text-xs resize-none focus:outline-none focus:border-tech-green"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};
