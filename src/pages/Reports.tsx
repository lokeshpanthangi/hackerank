
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar, 
  Target,
  Download,
  Share2,
  Filter,
  Plus
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import InterviewReports from '@/components/reports/InterviewReports';
import AnalyticsDashboard from '@/components/reports/AnalyticsDashboard';
import ReportBuilder from '@/components/reports/ReportBuilder';
import DataVisualization from '@/components/reports/DataVisualization';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const { analytics, loading } = useAnalytics();

  const reportStats = [
    {
      title: "Total Interviews",
      value: analytics?.totalInterviews?.toString() || "0",
      change: "+18%",
      trend: "up",
      icon: Users
    },
    {
      title: "Completion Rate",
      value: analytics ? `${analytics.completionRate}%` : "0%",
      change: "+5%",
      trend: "up",
      icon: Target
    },
    {
      title: "Average Score",
      value: analytics ? `${analytics.averageScore}/10` : "0/10",
      change: "+12%",
      trend: "up",
      icon: BarChart3
    },
    {
      title: "Time to Hire",
      value: analytics ? `${analytics.timeToHire} days` : "0 days",
      change: "+23%",
      trend: "up",
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-text-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Reports & Analytics</h1>
            <p className="text-text-secondary mt-2">Comprehensive interview performance insights</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
            <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
              <Plus size={16} className="mr-2" />
              New Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-dark-secondary border-border-dark">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">{stat.title}</p>
                      <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${
                        stat.trend === 'up' ? 'text-tech-green' : 
                        stat.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <Icon className="h-8 w-8 text-tech-green" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Reports Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-secondary border-border-dark">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <BarChart3 size={16} className="mr-2" />
              Analytics Dashboard
            </TabsTrigger>
            <TabsTrigger value="interviews" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Users size={16} className="mr-2" />
              Interview Reports
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Target size={16} className="mr-2" />
              Report Builder
            </TabsTrigger>
            <TabsTrigger value="visualization" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <TrendingUp size={16} className="mr-2" />
              Data Visualization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <InterviewReports />
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <ReportBuilder />
          </TabsContent>

          <TabsContent value="visualization" className="space-y-6">
            <DataVisualization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
