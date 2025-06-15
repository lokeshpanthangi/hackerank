
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Activity,
  Download,
  Share2,
  Maximize2,
  Settings
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts';

const DataVisualization = () => {
  const interviewTrendsData = [
    { month: 'Jan', interviews: 234, hires: 67, success_rate: 28.6 },
    { month: 'Feb', interviews: 289, hires: 84, success_rate: 29.1 },
    { month: 'Mar', interviews: 367, hires: 109, success_rate: 29.7 },
    { month: 'Apr', interviews: 412, hires: 126, success_rate: 30.6 },
    { month: 'May', interviews: 456, hires: 145, success_rate: 31.8 },
    { month: 'Jun', interviews: 523, hires: 167, success_rate: 31.9 }
  ];

  const departmentPerformanceData = [
    { department: 'Engineering', interviews: 342, hires: 89, avg_score: 8.4, time_to_hire: 18 },
    { department: 'Product', interviews: 156, hires: 45, avg_score: 7.9, time_to_hire: 24 },
    { department: 'Design', interviews: 89, hires: 23, avg_score: 8.1, time_to_hire: 16 },
    { department: 'Marketing', interviews: 67, hires: 19, avg_score: 7.6, time_to_hire: 22 },
    { department: 'Sales', interviews: 134, hires: 42, avg_score: 7.8, time_to_hire: 19 }
  ];

  const skillsRadarData = [
    { skill: 'Technical', current: 8.4, target: 9.0 },
    { skill: 'Communication', current: 7.9, target: 8.5 },
    { skill: 'Problem Solving', current: 8.6, target: 9.0 },
    { skill: 'Cultural Fit', current: 8.1, target: 8.5 },
    { skill: 'Leadership', current: 7.3, target: 8.0 },
    { skill: 'Innovation', current: 7.8, target: 8.5 }
  ];

  const positionDistribution = [
    { name: 'Senior Engineer', value: 28, color: '#39d353' },
    { name: 'Mid-level Engineer', value: 35, color: '#0969da' },
    { name: 'Junior Engineer', value: 20, color: '#f85149' },
    { name: 'Lead Engineer', value: 12, color: '#f89406' },
    { name: 'Principal Engineer', value: 5, color: '#a5a5a5' }
  ];

  const performanceScatterData = [
    { interview_score: 7.2, hire_probability: 15, candidate: 'Candidate A', department: 'Engineering' },
    { interview_score: 8.4, hire_probability: 68, candidate: 'Candidate B', department: 'Product' },
    { interview_score: 9.1, hire_probability: 89, candidate: 'Candidate C', department: 'Engineering' },
    { interview_score: 6.8, hire_probability: 12, candidate: 'Candidate D', department: 'Design' },
    { interview_score: 8.9, hire_probability: 82, candidate: 'Candidate E', department: 'Engineering' },
    { interview_score: 7.8, hire_probability: 45, candidate: 'Candidate F', department: 'Marketing' },
    { interview_score: 8.2, hire_probability: 61, candidate: 'Candidate G', department: 'Product' },
    { interview_score: 9.3, hire_probability: 94, candidate: 'Candidate H', department: 'Engineering' }
  ];

  const interviewerEfficiencyData = [
    { interviewer: 'John S.', efficiency: 92, satisfaction: 4.8, interviews: 89 },
    { interviewer: 'Sarah J.', efficiency: 95, satisfaction: 4.9, interviews: 76 },
    { interviewer: 'Mike C.', efficiency: 88, satisfaction: 4.6, interviews: 92 },
    { interviewer: 'Emily D.', efficiency: 97, satisfaction: 4.9, interviews: 67 },
    { interviewer: 'Alex R.', efficiency: 90, satisfaction: 4.7, interviews: 84 }
  ];

  const COLORS = ['#39d353', '#0969da', '#f85149', '#f89406', '#a5a5a5'];

  return (
    <div className="space-y-6">
      {/* Data Visualization Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Data Visualization</h2>
          <p className="text-text-secondary mt-1">Interactive charts and analytics insights</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="last_6_months">
            <SelectTrigger className="w-40 bg-dark-secondary border-border-dark text-text-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-secondary border-border-dark">
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_3_months">Last 3 Months</SelectItem>
              <SelectItem value="last_6_months">Last 6 Months</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
            <Download size={16} className="mr-2" />
            Export Charts
          </Button>
        </div>
      </div>

      {/* Interview Trends Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-tech-green" />
                  Interview Volume Trends
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Monthly interview and hiring trends
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Maximize2 size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={interviewTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis dataKey="month" stroke="#8b949e" />
                <YAxis stroke="#8b949e" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="interviews" 
                  stackId="1" 
                  stroke="#0969da" 
                  fill="#0969da" 
                  fillOpacity={0.3}
                  name="Interviews"
                />
                <Area 
                  type="monotone" 
                  dataKey="hires" 
                  stackId="1" 
                  stroke="#39d353" 
                  fill="#39d353" 
                  fillOpacity={0.6}
                  name="Hires"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-tech-green" />
                  Department Performance
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Interview success rates by department
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Settings size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis dataKey="department" stroke="#8b949e" />
                <YAxis stroke="#8b949e" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Legend />
                <Bar dataKey="interviews" fill="#30363d" name="Interviews" />
                <Bar dataKey="hires" fill="#39d353" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis and Position Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <Activity className="h-5 w-5 text-tech-green" />
              Skills Performance Radar
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Current vs target performance across key skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsRadarData}>
                <PolarGrid stroke="#30363d" />
                <PolarAngleAxis dataKey="skill" className="text-text-secondary" />
                <PolarRadiusAxis 
                  angle={0} 
                  domain={[0, 10]} 
                  tick={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Radar 
                  name="Current" 
                  dataKey="current" 
                  stroke="#39d353" 
                  fill="#39d353" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar 
                  name="Target" 
                  dataKey="target" 
                  stroke="#0969da" 
                  fill="#0969da" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <PieChart className="h-5 w-5 text-tech-green" />
              Position Distribution
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Interview distribution by position level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={positionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {positionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Correlation and Interviewer Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-tech-green" />
              Performance vs Hire Probability
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Correlation between interview scores and hiring success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={performanceScatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis 
                  type="number" 
                  dataKey="interview_score" 
                  name="Interview Score" 
                  stroke="#8b949e"
                  domain={[6, 10]}
                />
                <YAxis 
                  type="number" 
                  dataKey="hire_probability" 
                  name="Hire Probability %" 
                  stroke="#8b949e"
                  domain={[0, 100]}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                  formatter={(value, name) => [value, name === 'hire_probability' ? 'Hire Probability (%)' : 'Interview Score']}
                />
                <Scatter name="Candidates" dataKey="hire_probability" fill="#39d353" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-tech-green" />
              Interviewer Efficiency
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Interviewer performance and satisfaction ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interviewerEfficiencyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis type="number" stroke="#8b949e" />
                <YAxis dataKey="interviewer" type="category" stroke="#8b949e" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Legend />
                <Bar dataKey="efficiency" fill="#39d353" name="Efficiency %" />
                <Bar dataKey="satisfaction" fill="#0969da" name="Satisfaction" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Chart Configuration */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardHeader>
          <CardTitle className="text-text-primary flex items-center gap-2">
            <Settings className="h-5 w-5 text-tech-green" />
            Chart Customization
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Customize visualization appearance and export options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Chart Themes</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                  <div className="w-3 h-3 bg-tech-green rounded mr-2"></div>
                  Default Theme
                </Button>
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                  <div className="w-3 h-3 bg-blue-400 rounded mr-2"></div>
                  Professional Theme
                </Button>
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                  <div className="w-3 h-3 bg-purple-400 rounded mr-2"></div>
                  Modern Theme
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Export Formats</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                  <Download size={16} className="mr-2" />
                  PNG Images
                </Button>
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                  <Download size={16} className="mr-2" />
                  PDF Report
                </Button>
                <Button variant="outline" className="w-full justify-start border-border-dark text-text-secondary hover:text-text-primary">
                  <Download size={16} className="mr-2" />
                  SVG Vector
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Interactive Features</h4>
              <div className="space-y-2">
                <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">Zoom & Pan</Badge>
                <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30">Data Tooltips</Badge>
                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">Real-time Updates</Badge>
                <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">Cross Filtering</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
