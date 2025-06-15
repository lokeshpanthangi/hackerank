
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, Users } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const PerformanceAnalytics = () => {
  const performanceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 78 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 85 }
  ];

  const skillMetrics = [
    { skill: 'Problem Solving', score: 85, trend: '+5%' },
    { skill: 'Code Quality', score: 82, trend: '+8%' },
    { skill: 'Communication', score: 78, trend: '+3%' },
    { skill: 'Technical Skills', score: 88, trend: '+12%' }
  ];

  const overallMetrics = [
    { label: 'Interview Success Rate', value: '75%', icon: Target, color: 'text-tech-green' },
    { label: 'Avg. Performance Score', value: '82', icon: Award, color: 'text-blue-500' },
    { label: 'Better than Peers', value: '68%', icon: Users, color: 'text-purple-500' },
    { label: 'Improvement Rate', value: '+15%', icon: TrendingUp, color: 'text-tech-green' }
  ];

  return (
    <Card className="bg-dark-secondary border-border-dark">
      <CardHeader>
        <CardTitle className="text-lg text-text-primary flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-tech-green" />
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {overallMetrics.map((metric, index) => (
            <div key={index} className="bg-dark-primary p-3 rounded-lg border border-border-dark">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-xs text-text-secondary">{metric.label}</span>
              </div>
              <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Performance Trend */}
        <div className="bg-dark-primary p-4 rounded-lg border border-border-dark">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Performance Trend</h4>
          <div className="h-32">
            <ChartContainer config={{
              score: { label: "Score", color: "hsl(var(--tech-green))" }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#39d353" 
                    strokeWidth={2}
                    dot={{ fill: '#39d353', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary">Skill Performance</h4>
          {skillMetrics.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">{skill.skill}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-tech-green">{skill.trend}</span>
                  <span className="text-sm font-semibold text-text-primary">{skill.score}%</span>
                </div>
              </div>
              <Progress value={skill.score} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalytics;
