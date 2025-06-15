
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Star,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const InterviewReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const interviewReports = [
    {
      id: 'RPT-001',
      candidate: 'John Doe',
      position: 'Senior Frontend Developer',
      interviewer: 'Sarah Johnson',
      date: '2024-01-15',
      duration: '90 min',
      status: 'completed',
      overall_score: 8.7,
      recommendation: 'hire',
      ai_analysis: 'Strong technical skills with excellent problem-solving abilities',
      sections: {
        technical: 9.2,
        communication: 8.5,
        cultural_fit: 8.4,
        problem_solving: 8.8
      }
    },
    {
      id: 'RPT-002',
      candidate: 'Jane Smith',
      position: 'Product Manager',
      interviewer: 'Mike Chen',
      date: '2024-01-14',
      duration: '75 min',
      status: 'completed',
      overall_score: 7.3,
      recommendation: 'consider',
      ai_analysis: 'Good strategic thinking but needs improvement in technical understanding',
      sections: {
        technical: 6.8,
        communication: 8.2,
        cultural_fit: 7.9,
        problem_solving: 7.4
      }
    },
    {
      id: 'RPT-003',
      candidate: 'Alex Rodriguez',
      position: 'DevOps Engineer',
      interviewer: 'Emily Davis',
      date: '2024-01-13',
      duration: '105 min',
      status: 'completed',
      overall_score: 9.1,
      recommendation: 'strong_hire',
      ai_analysis: 'Exceptional technical expertise with strong leadership potential',
      sections: {
        technical: 9.5,
        communication: 8.9,
        cultural_fit: 9.0,
        problem_solving: 9.0
      }
    },
    {
      id: 'RPT-004',
      candidate: 'Maria Garcia',
      position: 'UX Designer',
      interviewer: 'John Smith',
      date: '2024-01-12',
      duration: '60 min',
      status: 'in_review',
      overall_score: 6.8,
      recommendation: 'no_hire',
      ai_analysis: 'Creative portfolio but lacks experience in user research methodologies',
      sections: {
        technical: 6.2,
        communication: 7.8,
        cultural_fit: 6.9,
        problem_solving: 6.3
      }
    },
    {
      id: 'RPT-005',
      candidate: 'David Wilson',
      position: 'Data Scientist',
      interviewer: 'Sarah Johnson',
      date: '2024-01-11',
      duration: '120 min',
      status: 'completed',
      overall_score: 8.4,
      recommendation: 'hire',
      ai_analysis: 'Strong analytical skills with good business acumen',
      sections: {
        technical: 8.9,
        communication: 7.8,
        cultural_fit: 8.6,
        problem_solving: 8.4
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">Completed</Badge>;
      case 'in_review': return <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">In Review</Badge>;
      case 'pending': return <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30">Pending</Badge>;
      default: return <Badge className="bg-gray-400/20 text-gray-400 border-gray-400/30">Unknown</Badge>;
    }
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'strong_hire': return <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">Strong Hire</Badge>;
      case 'hire': return <Badge className="bg-green-400/20 text-green-400 border-green-400/30">Hire</Badge>;
      case 'consider': return <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">Consider</Badge>;
      case 'no_hire': return <Badge className="bg-red-400/20 text-red-400 border-red-400/30">No Hire</Badge>;
      default: return <Badge className="bg-gray-400/20 text-gray-400 border-gray-400/30">Pending</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-tech-green';
    if (score >= 7.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredReports = interviewReports.filter(report => {
    const matchesSearch = report.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={16} />
                <Input
                  placeholder="Search by candidate, position, or interviewer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 bg-dark-primary border-border-dark text-text-primary">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary border-border-dark">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                <Filter size={16} className="mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="bg-dark-secondary border-border-dark hover:border-tech-green/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Report Header */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{report.candidate}</h3>
                      <p className="text-text-secondary">{report.position}</p>
                      <p className="text-sm text-text-secondary mt-1">Interview ID: {report.id}</p>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(report.status)}
                      {getRecommendationBadge(report.recommendation)}
                    </div>
                  </div>

                  {/* Interview Details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">{report.interviewer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">{report.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-text-secondary" />
                      <span className={`text-sm font-medium ${getScoreColor(report.overall_score)}`}>
                        {report.overall_score}/10
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary">{report.date}</div>
                  </div>

                  {/* Performance Breakdown */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-dark-primary/50 border border-border-dark">
                      <p className="text-xs text-text-secondary">Technical</p>
                      <p className={`font-semibold ${getScoreColor(report.sections.technical)}`}>
                        {report.sections.technical}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-dark-primary/50 border border-border-dark">
                      <p className="text-xs text-text-secondary">Communication</p>
                      <p className={`font-semibold ${getScoreColor(report.sections.communication)}`}>
                        {report.sections.communication}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-dark-primary/50 border border-border-dark">
                      <p className="text-xs text-text-secondary">Cultural Fit</p>
                      <p className={`font-semibold ${getScoreColor(report.sections.cultural_fit)}`}>
                        {report.sections.cultural_fit}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-dark-primary/50 border border-border-dark">
                      <p className="text-xs text-text-secondary">Problem Solving</p>
                      <p className={`font-semibold ${getScoreColor(report.sections.problem_solving)}`}>
                        {report.sections.problem_solving}
                      </p>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="p-3 rounded-lg bg-dark-primary/30 border border-border-dark mb-4">
                    <p className="text-xs text-text-secondary mb-1">AI Analysis Summary</p>
                    <p className="text-sm text-text-primary">{report.ai_analysis}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                      <Eye size={14} className="mr-2" />
                      View Full Report
                    </Button>
                    <Button size="sm" variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                      <Download size={14} className="mr-2" />
                      Export PDF
                    </Button>
                    <Button size="sm" variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                      <FileText size={14} className="mr-2" />
                      Generate Summary
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export All Reports */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Bulk Export Options</h3>
              <p className="text-text-secondary">Export multiple reports in various formats</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                <Download size={16} className="mr-2" />
                Export Selected (PDF)
              </Button>
              <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
                <Download size={16} className="mr-2" />
                Export All (Excel)
              </Button>
              <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                <FileText size={16} className="mr-2" />
                Generate Summary Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewReports;
