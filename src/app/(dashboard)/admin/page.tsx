'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Search,
  MoreVertical,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Settings,
  Database,
  Activity
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: Date;
  lastActivity: Date;
  messageCount: number;
  revenue: number;
}

interface SystemMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@company.com',
        plan: 'pro',
        status: 'active',
        joinedDate: new Date('2024-01-15'),
        lastActivity: new Date(),
        messageCount: 1245,
        revenue: 290
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@startup.com',
        plan: 'enterprise',
        status: 'active',
        joinedDate: new Date('2024-01-10'),
        lastActivity: new Date(Date.now() - 3600000),
        messageCount: 3456,
        revenue: 990
      },
      {
        id: '3',
        name: 'Mike Wilson',
        email: 'mike@freelance.com',
        plan: 'free',
        status: 'inactive',
        joinedDate: new Date('2024-01-05'),
        lastActivity: new Date(Date.now() - 86400000),
        messageCount: 156,
        revenue: 0
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@corp.com',
        plan: 'pro',
        status: 'suspended',
        joinedDate: new Date('2023-12-20'),
        lastActivity: new Date(Date.now() - 172800000),
        messageCount: 789,
        revenue: 58
      }
    ];

    const mockMetrics: SystemMetric[] = [
      {
        title: 'Total Users',
        value: '12,456',
        change: 12.5,
        icon: <Users className="h-4 w-4" />,
        color: 'text-blue-600'
      },
      {
        title: 'Monthly Revenue',
        value: '$45,678',
        change: 18.2,
        icon: <DollarSign className="h-4 w-4" />,
        color: 'text-green-600'
      },
      {
        title: 'Messages Sent',
        value: '2.3M',
        change: 8.7,
        icon: <MessageCircle className="h-4 w-4" />,
        color: 'text-purple-600'
      },
      {
        title: 'System Uptime',
        value: '99.9%',
        change: 0.1,
        icon: <TrendingUp className="h-4 w-4" />,
        color: 'text-emerald-600'
      }
    ];

    setUsers(mockUsers);
    setMetrics(mockMetrics);
  }, []);

  const getPlanColor = (plan: User['plan']) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'pro':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && user.status === 'active') ||
                         (selectedFilter === 'inactive' && user.status === 'inactive') ||
                         (selectedFilter === 'suspended' && user.status === 'suspended') ||
                         (selectedFilter === 'free' && user.plan === 'free') ||
                         (selectedFilter === 'pro' && user.plan === 'pro') ||
                         (selectedFilter === 'enterprise' && user.plan === 'enterprise');
    
    return matchesSearch && matchesFilter;
  });

  const renderOverview = () => (
    <div className="space-y-6">
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
                    <span className={`text-sm font-medium ${
                      metric.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  action: 'New user registration',
                  user: 'alice@example.com',
                  time: '2 minutes ago',
                  status: 'info'
                },
                {
                  action: 'Payment received',
                  user: 'john@company.com',
                  time: '15 minutes ago',
                  status: 'success'
                },
                {
                  action: 'User suspended',
                  user: 'spam@fake.com',
                  time: '1 hour ago',
                  status: 'warning'
                },
                {
                  action: 'System maintenance',
                  user: 'System',
                  time: '2 hours ago',
                  status: 'info'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'High API usage detected',
                  description: 'User exceeded rate limits',
                  severity: 'warning',
                  time: '5 minutes ago'
                },
                {
                  title: 'Database connection slow',
                  description: 'Query response time above threshold',
                  severity: 'info',
                  time: '30 minutes ago'
                },
                {
                  title: 'Backup completed',
                  description: 'Daily backup finished successfully',
                  severity: 'success',
                  time: '2 hours ago'
                }
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'warning' ? 'bg-yellow-500' :
                    alert.severity === 'success' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="free">Free Plan</option>
                <option value="pro">Pro Plan</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Plan</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Messages</th>
                  <th className="text-left p-4 font-medium">Revenue</th>
                  <th className="text-left p-4 font-medium">Joined</th>
                  <th className="text-left p-4 font-medium">Last Active</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getPlanColor(user.plan)}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{user.messageCount.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">${user.revenue}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{formatDate(user.joinedDate)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{formatDate(user.lastActivity)}</span>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem className="text-orange-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Database</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Connection Pool Size:</span>
                  <span className="font-medium">50</span>
                </div>
                <div className="flex justify-between">
                  <span>Query Timeout:</span>
                  <span className="font-medium">30s</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Backup:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">API Limits</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rate Limit:</span>
                  <span className="font-medium">1000/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Concurrent Requests:</span>
                  <span className="font-medium">100</span>
                </div>
                <div className="flex justify-between">
                  <span>Max File Size:</span>
                  <span className="font-medium">10MB</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Update Settings
            </Button>
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Backup Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage users, monitor system performance, and configure settings
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'system' && renderSystemSettings()}
    </div>
  );
}
