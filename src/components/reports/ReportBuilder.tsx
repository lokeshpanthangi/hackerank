
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  Calendar as CalendarIcon,
  Filter,
  BarChart3,
  Settings,
  Target,
  Users,
  Clock,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

const ReportBuilder = () => {
  const [reportName, setReportName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [visualizationType, setVisualizationType] = useState('');

  const availableMetrics = [
    { id: 'interview_completion', name: 'Interview Completion Rate', category: 'performance' },
    { id: 'avg_score', name: 'Average Interview Score', category: 'performance' },
    { id: 'time_to_hire', name: 'Time to Hire', category: 'efficiency' },
    { id: 'hire_rate', name: 'Hire Success Rate', category: 'success' },
    { id: 'interviewer_effectiveness', name: 'Interviewer Effectiveness', category: 'performance' },
    { id: 'candidate_satisfaction', name: 'Candidate Satisfaction', category: 'experience' },
    { id: 'technical_scores', name: 'Technical Assessment Scores', category: 'skills' },
    { id: 'communication_scores', name: 'Communication Scores', category: 'skills' },
    { id: 'cultural_fit', name: 'Cultural Fit Assessment', category: 'culture' },
    { id: 'no_shows', name: 'Interview No-Show Rate', category: 'efficiency' },
    { id: 'reschedule_rate', name: 'Reschedule Rate', category: 'efficiency' },
    { id: 'feedback_turnaround', name: 'Feedback Turnaround Time', category: 'efficiency' }
  ];

  const availableFilters = [
    { id: 'department', name: 'Department', type: 'multiselect' },
    { id: 'position_level', name: 'Position Level', type: 'multiselect' },
    { id: 'interviewer', name: 'Interviewer', type: 'multiselect' },
    { id: 'interview_type', name: 'Interview Type', type: 'multiselect' },
    { id: 'date_range', name: 'Date Range', type: 'daterange' },
    { id: 'score_range', name: 'Score Range', type: 'range' },
    { id: 'location', name: 'Location', type: 'multiselect' },
    { id: 'experience_level', name: 'Experience Level', type: 'multiselect' }
  ];

  const reportTemplates = [
    {
      id: 'monthly_summary',
      name: 'Monthly Performance Summary',
      description: 'Comprehensive monthly interview performance report',
      metrics: ['interview_completion', 'avg_score', 'hire_rate', 'time_to_hire'],
      filters: ['department', 'date_range'],
      popular: true
    },
    {
      id: 'interviewer_performance',
      name: 'Interviewer Performance Report',
      description: 'Individual interviewer effectiveness analysis',
      metrics: ['interviewer_effectiveness', 'avg_score', 'candidate_satisfaction'],
      filters: ['interviewer', 'date_range', 'department'],
      popular: true
    },
    {
      id: 'department_comparison',
      name: 'Department Comparison Report',
      description: 'Cross-department hiring performance comparison',
      metrics: ['hire_rate', 'time_to_hire', 'avg_score', 'interview_completion'],
      filters: ['department', 'date_range', 'position_level'],
      popular: false
    },
    {
      id: 'efficiency_analysis',
      name: 'Process Efficiency Analysis',
      description: 'Interview process efficiency and optimization insights',
      metrics: ['time_to_hire', 'no_shows', 'reschedule_rate', 'feedback_turnaround'],
      filters: ['date_range', 'interview_type', 'department'],
      popular: true
    }
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const useTemplate = (template: any) => {
    setReportName(template.name);
    setSelectedMetrics(template.metrics);
    setSelectedFilters(template.filters);
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      performance: 'bg-tech-green/20 text-tech-green border-tech-green/30',
      efficiency: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
      success: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
      experience: 'bg-purple-400/20 text-purple-400 border-purple-400/30',
      skills: 'bg-orange-400/20 text-orange-400 border-orange-400/30',
      culture: 'bg-pink-400/20 text-pink-400 border-pink-400/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  return (
    <div className="space-y-6">
      {/* Report Builder Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Custom Report Builder</h2>
          <p className="text-text-secondary mt-1">Create personalized analytics reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
            <Save size={16} className="mr-2" />
            Save Template
          </Button>
          <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
            <Eye size={16} className="mr-2" />
            Preview Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <Settings className="h-5 w-5 text-tech-green" />
                Report Configuration
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Set up your custom report parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="report_name" className="text-text-primary">Report Name</Label>
                <Input
                  id="report_name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Enter report name..."
                  className="mt-1 bg-dark-primary border-border-dark text-text-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-text-primary">Visualization Type</Label>
                  <Select value={visualizationType} onValueChange={setVisualizationType}>
                    <SelectTrigger className="mt-1 bg-dark-primary border-border-dark text-text-primary">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-border-dark">
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                      <SelectItem value="table">Data Table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-text-primary">Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full mt-1 justify-start border-border-dark text-text-secondary hover:text-text-primary">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? format(dateRange.from, "PPP") : "Select date range"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-dark-secondary border-border-dark">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Selection */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-tech-green" />
                Select Metrics
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Choose the metrics to include in your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border-dark bg-dark-primary/50">
                    <Checkbox
                      id={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                      className="border-border-dark"
                    />
                    <div className="flex-1">
                      <Label htmlFor={metric.id} className="text-text-primary cursor-pointer">
                        {metric.name}
                      </Label>
                      <Badge className={`ml-2 ${getCategoryBadge(metric.category)}`}>
                        {metric.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filters Selection */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <Filter className="h-5 w-5 text-tech-green" />
                Apply Filters
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Add filters to refine your report data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border-dark bg-dark-primary/50">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => handleFilterToggle(filter.id)}
                      className="border-border-dark"
                    />
                    <div className="flex-1">
                      <Label htmlFor={filter.id} className="text-text-primary cursor-pointer">
                        {filter.name}
                      </Label>
                      <Badge variant="outline" className="ml-2 border-border-dark text-text-secondary">
                        {filter.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates and Preview */}
        <div className="space-y-6">
          {/* Quick Templates */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <FileText className="h-5 w-5 text-tech-green" />
                Quick Templates
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Start with pre-built report templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {reportTemplates.map((template) => (
                <div key={template.id} className="p-3 rounded-lg border border-border-dark bg-dark-primary/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{template.name}</h4>
                    {template.popular && (
                      <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.metrics.slice(0, 2).map((metric) => (
                      <Badge key={metric} variant="outline" className="border-border-dark text-text-secondary text-xs">
                        {availableMetrics.find(m => m.id === metric)?.name}
                      </Badge>
                    ))}
                    {template.metrics.length > 2 && (
                      <Badge variant="outline" className="border-border-dark text-text-secondary text-xs">
                        +{template.metrics.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => useTemplate(template)}
                    className="w-full bg-tech-green hover:bg-tech-green/90 text-dark-primary"
                  >
                    Use Template
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Report Preview */}
          <Card className="bg-dark-secondary border-border-dark">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <Target className="h-5 w-5 text-tech-green" />
                Report Preview
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Current report configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-text-secondary">Report Name:</Label>
                <p className="text-text-primary">{reportName || 'Untitled Report'}</p>
              </div>
              
              <div>
                <Label className="text-text-secondary">Selected Metrics ({selectedMetrics.length}):</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedMetrics.length > 0 ? (
                    selectedMetrics.map((metricId) => (
                      <Badge key={metricId} className="bg-tech-green/20 text-tech-green border-tech-green/30 text-xs">
                        {availableMetrics.find(m => m.id === metricId)?.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-text-secondary text-sm">No metrics selected</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label className="text-text-secondary">Applied Filters ({selectedFilters.length}):</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedFilters.length > 0 ? (
                    selectedFilters.map((filterId) => (
                      <Badge key={filterId} variant="outline" className="border-border-dark text-text-secondary text-xs">
                        {availableFilters.find(f => f.id === filterId)?.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-text-secondary text-sm">No filters applied</p>
                  )}
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full bg-tech-green hover:bg-tech-green/90 text-dark-primary">
                  <Eye size={16} className="mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full border-border-dark text-text-secondary hover:text-text-primary">
                  <Save size={16} className="mr-2" />
                  Save as Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
