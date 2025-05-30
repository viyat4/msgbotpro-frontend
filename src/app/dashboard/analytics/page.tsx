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
        icon: <MessageCircle className="h-5 w-5" />,
        color: 'text-blue-600'
      },
      {
        title: 'Active Users',
        value: '2,891',
        change: 8.2,
        changeLabel: 'vs last period',
        icon: <Users className="h-5 w-5" />,
        color: 'text-green-600'
      },
      {
        title: 'Messages Sent',
        value: '8,762',
        change: -3.1,
        changeLabel: 'vs last period',
        icon: <Send className="h-5 w-5" />,
        color: 'text-purple-600'
      },
      {
        title: 'Delivery Rate',
        value: '98.1%',
        change: 2.4,
        changeLabel: 'vs last period',
        icon: <CheckCircle className="h-5 w-5" />,
        color: 'text-emerald-600'
      }
    ];

    const mockMessageStats: ChartData[] = [
      { name: 'Mon', value: 245 },
      { name: 'Tue', value: 312 },
      { name: 'Wed', value: 189 },
      { name: 'Thu', value: 421 },
      { name: 'Fri', value: 356 },
      { name: 'Sat', value: 298 },
      { name: 'Sun', value: 167 }
    ];

    const mockResponseTimeData: ChartData[] = [
      { name: '< 1 min', value: 45, color: '#10b981' },
      { name: '1-5 min', value: 32, color: '#3b82f6' },
      { name: '5-15 min', value: 18, color: '#f59e0b' },
      { name: '> 15 min', value: 5, color: '#ef4444' }
    ];

    setMetrics(mockMetrics);
    setMessageStats(mockMessageStats);
    setResponseTimeData(mockResponseTimeData);
  }, [timeRange]);

  const renderTrendIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const renderTrendColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your messaging performance and user engagement</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
