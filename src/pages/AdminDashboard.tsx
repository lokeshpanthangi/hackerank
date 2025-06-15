
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Activity, 
  Settings, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  Database,
  BarChart3,
  Globe
} from 'lucide-react';
import AdminOverview from '@/components/admin/AdminOverview';
import UserManagement from '@/components/admin/UserManagement';
import SystemAnalytics from '@/components/admin/SystemAnalytics';
import ConfigurationManagement from '@/components/admin/ConfigurationManagement';
import ReportingSystem from '@/components/admin/ReportingSystem';
import SecurityDashboard from '@/components/admin/SecurityDashboard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adminStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+23%",
      trend: "up",
      icon: Users
    },
    {
      title: "Active Interviews",
      value: "1,429",
      change: "+12%",
      trend: "up",
      icon: Activity
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "Excellent",
      trend: "stable",
      icon: Shield
    },
    {
      title: "Revenue",
      value: "$89,420",
      change: "+31%",
      trend: "up",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-text-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary mt-2">Manage your CodeInterview Pro platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border-dark text-text-secondary hover:text-text-primary">
              <FileText size={16} className="mr-2" />
              Export Report
            </Button>
            <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary">
              <Settings size={16} className="mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
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

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-secondary border-border-dark">
            <TabsTrigger value="overview" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <BarChart3 size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Users size={16} className="mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Activity size={16} className="mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Settings size={16} className="mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <FileText size={16} className="mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Shield size={16} className="mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <SystemAnalytics />
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <ConfigurationManagement />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportingSystem />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
