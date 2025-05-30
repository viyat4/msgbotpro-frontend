'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  MessageCircle,
  Users,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [messageStats, setMessageStats] = useState<ChartData[]>([]);
  const [responseTimeData, setResponseTimeData] = useState<ChartData[]>([]);

  // Mock data
  useEffect(() => {
    const mockMetrics: MetricCard[] = [
      {
        title: 'Total Messages',
        value: '12,456',
        change: 12.5,
        changeLabel: 'vs last period',
        icon: <MessageCircle className="h-4 w-4" />,
        color: 'text-blue-600'
      },
      {
        title: 'Active Contacts',
        value: '3,247',
        change: 8.2,
        changeLabel: 'vs last period',
        icon: <Users className="h-4 w-4" />,
        color: 'text-green-600'
      },
      {
        title: 'Sent Messages',
        value: '8,921',
        change: 15.3,
        changeLabel: 'vs last period',
        icon: <Send className="h-4 w-4" />,
        color: 'text-purple-600'
      },
      {
        title: 'Delivered',
        value: '8,734',
        change: 14.8,
        changeLabel: 'vs last period',
        icon: <CheckCircle className="h-4 w-4" />,
        color: 'text-emerald-600'
      },
      {
        title: 'Avg Response Time',
        value: '2.3m',
        change: -18.2,
        changeLabel: 'vs last period',
        icon: <Clock className="h-4 w-4" />,
        color: 'text-orange-600'
      },
      {
        title: 'Failed Messages',
        value: '187',
        change: -25.4,
        changeLabel: 'vs last period',
        icon: <AlertCircle className="h-4 w-4" />,
        color: 'text-red-600'
      }
    ];

    const mockMessageStats: ChartData[] = [
      { name: 'Mon', value: 1204 },
      { name: 'Tue', value: 1398 },
      { name: 'Wed', value: 1654 },
      { name: 'Thu', value: 1432 },
      { name: 'Fri', value: 1876 },
      { name: 'Sat', value: 945 },
      { name: 'Sun', value: 1123 }
    ];

    const mockResponseTimeData: ChartData[] = [
      { name: '< 1 min', value: 45, color: '#10b981' },
      { name: '1-5 min', value: 30, color: '#3b82f6' },
      { name: '5-15 min', value: 15, color: '#f59e0b' },
      { name: '15-60 min', value: 8, color: '#ef4444' },
      { name: '> 1 hour', value: 2, color: '#6b7280' }
    ];

    setMetrics(mockMetrics);
    setMessageStats(mockMessageStats);
    setResponseTimeData(mockResponseTimeData);
  }, [timeRange]);

  const renderTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const renderTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your messaging performance and engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    {renderTrendIcon(metric.change)}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-sm font-medium ${renderTrendColor(metric.change)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {metric.changeLabel}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-muted ${metric.color}`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Volume Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Message Volume
              </CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Daily
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {messageStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary rounded-t-sm transition-all hover:bg-primary/80"
                    style={{ 
                      height: `${(stat.value / Math.max(...messageStats.map(s => s.value))) * 200}px`,
                      minHeight: '4px'
                    }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">{stat.name}</span>
                  <span className="text-xs font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Response Time Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responseTimeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Welcome Message', usage: 456, rate: 98.2 },
                { name: 'Order Confirmation', usage: 324, rate: 96.8 },
                { name: 'Appointment Reminder', usage: 289, rate: 94.5 },
                { name: 'Support Follow-up', usage: 156, rate: 92.1 },
                { name: 'Newsletter Signup', usage: 134, rate: 89.7 }
              ].map((template, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {template.usage} uses
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{template.rate}%</p>
                    <p className="text-sm text-muted-foreground">success rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Bulk message sent',
                  target: '234 contacts',
                  time: '2 minutes ago',
                  status: 'success'
                },
                {
                  action: 'Template created',
                  target: 'Order Confirmation v2',
                  time: '15 minutes ago',
                  status: 'info'
                },
                {
                  action: 'Contact imported',
                  target: '45 new contacts',
                  time: '1 hour ago',
                  status: 'success'
                },
                {
                  action: 'Message failed',
                  target: 'to +1234567890',
                  time: '2 hours ago',
                  status: 'error'
                },
                {
                  action: 'Campaign completed',
                  target: 'Spring Sale Promotion',
                  time: '4 hours ago',
                  status: 'success'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {activity.action} <span className="text-muted-foreground">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.1%</div>
              <div className="text-sm text-muted-foreground">Delivery Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">76.3%</div>
              <div className="text-sm text-muted-foreground">Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">23.7%</div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4.2%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
