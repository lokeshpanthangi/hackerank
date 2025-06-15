
import { useState } from 'react';
import { 
  X, 
  Mail, 
  Calendar, 
  Download, 
  Tag, 
  Trash2,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export const BulkActions = ({ selectedCount, onClearSelection }: BulkActionsProps) => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSendEmail = () => {
    setShowEmailDialog(true);
  };

  const handleScheduleInterview = () => {
    setShowScheduleDialog(true);
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting data for', selectedCount, 'candidates');
  };

  const handleAddTags = () => {
    // Mock tag functionality
    console.log('Adding tags to', selectedCount, 'candidates');
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Mock delete functionality
    console.log('Deleting', selectedCount, 'candidates');
    setShowDeleteDialog(false);
    onClearSelection();
  };

  return (
    <>
      <div className="bg-tech-green/10 border border-tech-green/30 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className="bg-tech-green text-dark-primary">
              <Users size={14} className="mr-1" />
              {selectedCount} selected
            </Badge>
            <span className="text-text-primary font-medium">Bulk Actions:</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-text-secondary hover:text-text-primary"
          >
            <X size={16} className="mr-1" />
            Clear Selection
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Button
            size="sm"
            onClick={handleSendEmail}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Mail size={14} className="mr-1" />
            Send Email
          </Button>
          
          <Button
            size="sm"
            onClick={handleScheduleInterview}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Calendar size={14} className="mr-1" />
            Schedule Interviews
          </Button>
          
          <Button
            size="sm"
            onClick={handleExportData}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download size={14} className="mr-1" />
            Export Data
          </Button>
          
          <Button
            size="sm"
            onClick={handleAddTags}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Tag size={14} className="mr-1" />
            Add Tags
          </Button>
          
          <Button
            size="sm"
            onClick={handleDelete}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 size={14} className="mr-1" />
            Delete
          </Button>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="bg-dark-secondary border-border-dark">
          <DialogHeader>
            <DialogTitle className="text-text-primary">Send Email to {selectedCount} Candidates</DialogTitle>
            <DialogDescription className="text-text-secondary">
              This will send an email to all selected candidates. You can customize the message template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-text-primary">
              Email templates and customization options would be implemented here.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Interview Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-dark-secondary border-border-dark">
          <DialogHeader>
            <DialogTitle className="text-text-primary">Schedule Interviews for {selectedCount} Candidates</DialogTitle>
            <DialogDescription className="text-text-secondary">
              This will create interview schedules for all selected candidates.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-text-primary">
              Interview scheduling interface would be implemented here.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
              Schedule Interviews
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-dark-secondary border-border-dark">
          <DialogHeader>
            <DialogTitle className="text-text-primary">Delete {selectedCount} Candidates</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Are you sure you want to delete {selectedCount} candidates? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Candidates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
