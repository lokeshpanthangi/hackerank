
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Target, 
  Award,
  Briefcase,
  Calendar
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AnalyticsDashboard = () => {
  const interviewMetrics = [
    { period: 'Jan', completed: 234, scheduled: 267, success_rate: 87.6 },
    { period: 'Feb', completed: 289, scheduled: 321, success_rate: 90.2 },
    { period: 'Mar', completed: 367, scheduled: 398, success_rate: 92.2 },
    { period: 'Apr', completed: 412, scheduled: 445, success_rate: 92.6 },
    { period: 'May', completed: 456, scheduled: 487, success_rate: 93.6 },
    { period: 'Jun', completed: 523, scheduled: 558, success_rate: 93.7 }
  ];

  const performanceTrends = [
    { month: 'Jan', coding_score: 78, communication: 82, problem_solving: 75, overall: 78.3 },
    { month: 'Feb', coding_score: 81, communication: 84, problem_solving: 79, overall: 81.3 },
    { month: 'Mar', coding_score: 83, communication: 86, problem_solving: 82, overall: 83.7 },
    { month: 'Apr', coding_score: 85, communication: 87, problem_solving: 84, overall: 85.3 },
    { month: 'May', coding_score: 87, communication: 89, problem_solving: 86, overall: 87.3 },
    { month: 'Jun', coding_score: 89, communication: 91, problem_solving: 88, overall: 89.3 }
  ];

  const departmentData = [
    { name: 'Engineering', interviews: 342, hires: 89, success_rate: 26.0, color: '#39d353' },
    { name: 'Product', interviews: 156, hires: 45, success_rate: 28.8, color: '#0969da' },
    { name: 'Design', interviews: 89, hires: 23, success_rate: 25.8, color: '#f85149' },
    { name: 'Marketing', interviews: 67, hires: 19, success_rate: 28.4, color: '#a5a5a5' },
    { name: 'Sales', interviews: 134, hires: 42, success_rate: 31.3, color: '#f89406' }
  ];

  const interviewerEffectiveness = [
    { interviewer: 'John Smith', interviews: 89, avg_score: 8.7, hire_rate: 32.5, satisfaction: 4.8 },
    { interviewer: 'Sarah Johnson', interviews: 76, avg_score: 8.9, hire_rate: 35.2, satisfaction: 4.9 },
    { interviewer: 'Mike Chen', interviews: 92, avg_score: 8.4, hire_rate: 28.3, satisfaction: 4.6 },
    { interviewer: 'Emily Davis', interviews: 67, avg_score: 9.1, hire_rate: 38.8, satisfaction: 4.9 },
    { interviewer: 'Alex Rodriguez', interviews: 84, avg_score: 8.5, hire_rate: 29.8, satisfaction: 4.7 }
  ];

  const timeToHireData = [
    { position: 'Senior Engineer', avg_days: 18, target: 21, interviews: 5.2 },
    { position: 'Product Manager', avg_days: 24, target: 28, interviews: 4.8 },
    { position: 'Designer', avg_days: 16, target: 18, interviews: 4.1 },
    { position: 'Data Scientist', avg_days: 21, target: 25, interviews: 5.8 },
    { position: 'DevOps Engineer', avg_days: 19, target: 22, interviews: 4.9 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Interview Completion Rate</p>
                <p className="text-2xl font-bold text-text-primary mt-1">93.7%</p>
                <p className="text-sm mt-1 text-tech-green flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +2.3% vs last month
                </p>
              </div>
              <Target className="h-8 w-8 text-tech-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Average Interview Score</p>
                <p className="text-2xl font-bold text-text-primary mt-1">8.6/10</p>
                <p className="text-sm mt-1 text-tech-green flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +0.4 vs last month
                </p>
              </div>
              <Award className="h-8 w-8 text-tech-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Time to Hire</p>
                <p className="text-2xl font-bold text-text-primary mt-1">19.6 days</p>
                <p className="text-sm mt-1 text-tech-green flex items-center">
                  <TrendingDown size={12} className="mr-1" />
                  -1.2 days vs target
                </p>
              </div>
              <Clock className="h-8 w-8 text-tech-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Hire Success Rate</p>
                <p className="text-2xl font-bold text-text-primary mt-1">31.2%</p>
                <p className="text-sm mt-1 text-tech-green flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +3.1% vs last quarter
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-tech-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-tech-green" />
              Interview Completion Trends
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Monthly interview completion and success rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={interviewMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis dataKey="period" stroke="#8b949e" />
                <YAxis stroke="#8b949e" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#39d353" fill="#39d353" fillOpacity={0.3} />
                <Area type="monotone" dataKey="scheduled" stackId="1" stroke="#0969da" fill="#0969da" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <Award className="h-5 w-5 text-tech-green" />
              Performance Score Trends
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Average candidate performance across different skill areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
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
                <Line type="monotone" dataKey="coding_score" stroke="#39d353" strokeWidth={2} />
                <Line type="monotone" dataKey="communication" stroke="#0969da" strokeWidth={2} />
                <Line type="monotone" dataKey="problem_solving" stroke="#f85149" strokeWidth={2} />
                <Line type="monotone" dataKey="overall" stroke="#f89406" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance and Time to Hire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-tech-green" />
              Department Performance
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Interview success rates by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border-dark bg-dark-primary/30">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-primary">{dept.name}</h4>
                      <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">
                        {dept.success_rate}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <span>{dept.interviews} interviews</span>
                      <span>{dept.hires} hires</span>
                    </div>
                    <Progress value={dept.success_rate} className="h-2 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <Clock className="h-5 w-5 text-tech-green" />
              Time to Hire Analysis
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Average hiring timeline by position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeToHireData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis type="number" stroke="#8b949e" />
                <YAxis dataKey="position" type="category" stroke="#8b949e" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2432', 
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Bar dataKey="avg_days" fill="#39d353" />
                <Bar dataKey="target" fill="#30363d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Interviewer Effectiveness */}
      <Card className="bg-dark-secondary border-border-dark">
        <CardHeader>
          <CardTitle className="text-text-primary flex items-center gap-2">
            <Users className="h-5 w-5 text-tech-green" />
            Interviewer Effectiveness
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Performance metrics for interview panel members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left p-3 text-text-secondary">Interviewer</th>
                  <th className="text-left p-3 text-text-secondary">Interviews</th>
                  <th className="text-left p-3 text-text-secondary">Avg Score</th>
                  <th className="text-left p-3 text-text-secondary">Hire Rate</th>
                  <th className="text-left p-3 text-text-secondary">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {interviewerEffectiveness.map((interviewer, index) => (
                  <tr key={index} className="border-b border-border-dark/50">
                    <td className="p-3 text-text-primary font-medium">{interviewer.interviewer}</td>
                    <td className="p-3 text-text-secondary">{interviewer.interviews}</td>
                    <td className="p-3 text-text-primary">{interviewer.avg_score}/10</td>
                    <td className="p-3">
                      <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">
                        {interviewer.hire_rate}%
                      </Badge>
                    </td>
                    <td className="p-3 text-text-primary">{interviewer.satisfaction}/5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
