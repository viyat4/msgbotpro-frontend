'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    // Mock data
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        plan: 'pro',
        status: 'active',
        joinedDate: new Date('2024-01-15'),
        lastActivity: new Date(),
        messageCount: 1250,
        revenue: 29
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        plan: 'enterprise',
        status: 'active',
        joinedDate: new Date('2024-01-10'),
        lastActivity: new Date(Date.now() - 3600000),
        messageCount: 3420,
        revenue: 99
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        plan: 'free',
        status: 'inactive',
        joinedDate: new Date('2024-01-05'),
        lastActivity: new Date(Date.now() - 86400000),
        messageCount: 45,
        revenue: 0
      }
    ];

    const mockMetrics: SystemMetric[] = [
      {
        id: '1',
        name: 'Total Users',
        value: '12,834',
        change: '+12.5%',
        trend: 'up',
        icon: Users
      },
      {
        id: '2',
        name: 'Messages Sent',
        value: '1.2M',
        change: '+8.2%',
        trend: 'up',
        icon: MessageCircle
      },
      {
        id: '3',
        name: 'Monthly Revenue',
        value: '$45,231',
        change: '+15.3%',
        trend: 'up',
        icon: DollarSign
      },
      {
        id: '4',
        name: 'System Uptime',
        value: '99.9%',
        change: '0%',
        trend: 'stable',
        icon: Activity
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
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, monitor system metrics, and oversee operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          const isNegative = metric.trend === 'down';
          
          return (
            <Card key={metric.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.name}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2 flex items-center">
                  {metric.trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  )}
                  {metric.trend === 'down' && (
                    <TrendingUp className="h-4 w-4 text-red-500 mr-1 rotate-180" />
                  )}
                  <span className={`text-sm ${
                    isPositive ? 'text-green-600' : 
                    isNegative ? 'text-red-600' : 
                    'text-muted-foreground'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Service</span>
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">WhatsApp API</span>
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Service</span>
                <span className="flex items-center gap-1 text-yellow-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Degraded
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-sm">
                  <p>John Doe upgraded to Pro</p>
                  <p className="text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-sm">
                  <p>Jane Smith sent 1,000 messages</p>
                  <p className="text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1 text-sm">
                  <p>Rate limit warning for API</p>
                  <p className="text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                System Backup
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security Logs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                System Config
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              User Management
              <Button size="sm" variant="outline" className="ml-2" asChild>
                <Link href="/dashboard/admin/users">
                  View All
                </Link>
              </Button>
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardHeader>
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
                          <div className="text-sm text-muted-foreground">{user.email}</div>
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
                      <span className="text-sm text-muted-foreground">
                        {formatDate(user.joinedDate)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(user.lastActivity)}
                      </span>
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
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Suspend User
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
}
