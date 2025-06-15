
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Code, 
  Download, 
  History, 
  Users, 
  Save,
  Undo,
  Redo
} from 'lucide-react';

interface SharedNotesTabProps {
  onUnreadChange: (count: number) => void;
}

interface Collaborator {
  name: string;
  color: string;
  cursor: number;
  isActive: boolean;
}

export const SharedNotesTab: React.FC<SharedNotesTabProps> = ({ onUnreadChange }) => {
  const [notes, setNotes] = React.useState(`# Interview Notes - Sarah Chen

## Technical Skills Assessment

### Problem Solving Approach
- Started with brute force solution (O(n²))
- Quickly identified optimization opportunity
- Implemented hashmap solution (O(n))
- Explained time/space complexity clearly

### Code Quality
- Clean, readable code structure
- Proper variable naming conventions
- Added helpful comments
- Good error handling practices

### Communication
- Asked clarifying questions about edge cases
- Explained thought process step by step
- Receptive to hints and feedback
- Professional and confident demeanor

## Technical Discussion Points

### Algorithms & Data Structures
✅ Strong understanding of hashmaps
✅ Good grasp of time complexity analysis
⚠️ Could improve on space complexity optimization
❌ Needs work on advanced tree algorithms

### System Design Concepts
- Discussed scalability considerations
- Understanding of load balancing basics
- Familiar with database indexing

## Next Steps
- Schedule follow-up technical round
- Focus on system design questions
- Prepare advanced algorithm challenges`);

  const [collaborators] = React.useState<Collaborator[]>([
    { name: 'John Doe', color: '#39d353', cursor: 45, isActive: true },
    { name: 'Mike Wilson', color: '#3b82f6', cursor: 120, isActive: false }
  ]);

  const [isAutoSave, setIsAutoSave] = React.useState(true);
  const [lastSaved, setLastSaved] = React.useState('2 minutes ago');
  const [showHistory, setShowHistory] = React.useState(false);

  const formatText = (format: string) => {
    const textarea = document.getElementById('shared-notes') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newNotes = notes.substring(0, start) + formattedText + notes.substring(end);
    setNotes(newNotes);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const exportNotes = (format: 'pdf' | 'markdown') => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-notes-sarah-chen.${format === 'pdf' ? 'txt' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    onUnreadChange(0);
  }, [notes, onUnreadChange]);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-dark-primary border border-border-dark rounded p-3 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => formatText('bold')}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => formatText('italic')}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => formatText('underline')}
            >
              <Underline className="w-4 h-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6 bg-border-dark mx-2" />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => formatText('list')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => formatText('code')}
            >
              <Code className="w-4 h-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6 bg-border-dark mx-2" />
            
            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-white">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-white">
              <Redo className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-text-secondary hover:text-white"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-border-dark text-text-secondary hover:text-white h-8"
              onClick={() => exportNotes('markdown')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Collaborators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm">Collaborators:</span>
            </div>
            <div className="flex items-center space-x-2">
              {collaborators.map((collaborator, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: collaborator.color }}
                  />
                  <span className="text-white text-sm">{collaborator.name}</span>
                  {collaborator.isActive && (
                    <Badge variant="outline" className="text-xs border-tech-green text-tech-green">
                      Active
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Save className="w-4 h-4 text-tech-green" />
              <span className="text-tech-green text-sm">
                {isAutoSave ? 'Auto-saved' : 'Manual save'} • {lastSaved}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Editor */}
      <div className="flex-1 flex">
        <div className={`${showHistory ? 'w-3/4' : 'w-full'} transition-all duration-300`}>
          <textarea
            id="shared-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start taking collaborative notes..."
            className="w-full h-full bg-dark-primary border border-border-dark rounded p-4 text-white text-sm font-mono resize-none focus:outline-none focus:border-tech-green"
            style={{ 
              fontFamily: 'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',
              lineHeight: '1.6'
            }}
          />
        </div>
        
        {/* Version History Sidebar */}
        {showHistory && (
          <div className="w-1/4 ml-4 bg-dark-primary border border-border-dark rounded p-3">
            <h4 className="text-white font-medium mb-3">Version History</h4>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                <div className="bg-dark-secondary p-2 rounded border border-tech-green/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">Current</span>
                    <span className="text-tech-green text-xs">Now</span>
                  </div>
                  <p className="text-text-secondary text-xs">Added system design notes</p>
                </div>
                
                <div className="bg-dark-secondary p-2 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">v1.3</span>
                    <span className="text-text-secondary text-xs">5 min ago</span>
                  </div>
                  <p className="text-text-secondary text-xs">Updated technical assessment</p>
                </div>
                
                <div className="bg-dark-secondary p-2 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">v1.2</span>
                    <span className="text-text-secondary text-xs">12 min ago</span>
                  </div>
                  <p className="text-text-secondary text-xs">Added communication section</p>
                </div>
                
                <div className="bg-dark-secondary p-2 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">v1.1</span>
                    <span className="text-text-secondary text-xs">20 min ago</span>
                  </div>
                  <p className="text-text-secondary text-xs">Initial problem solving notes</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};
