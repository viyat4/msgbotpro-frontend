'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users,
  Search,
  MoreVertical,
  Plus,
  Download,
  Upload,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Mail,
  ArrowLeft,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Using direct import instead
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

// Define Tabs components inline
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  createdAt: Date;
  lastActive: Date;
  messageCount: number;
  contactCount: number;
  templateCount: number;
  revenue: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Mock data
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        plan: 'enterprise',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        lastActive: new Date(),
        messageCount: 5432,
        contactCount: 324,
        templateCount: 21,
        revenue: 599
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'manager',
        plan: 'pro',
        status: 'active',
        createdAt: new Date('2024-01-10'),
        lastActive: new Date(Date.now() - 3600000),
        messageCount: 3420,
        contactCount: 215,
        templateCount: 12,
        revenue: 99
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'user',
        plan: 'free',
        status: 'inactive',
        createdAt: new Date('2024-01-05'),
        lastActive: new Date(Date.now() - 86400000 * 3),
        messageCount: 45,
        contactCount: 12,
        templateCount: 3,
        revenue: 0
      },
      {
        id: '4',
        name: 'Alice Williams',
        email: 'alice@example.com',
        role: 'user',
        plan: 'pro',
        status: 'active',
        createdAt: new Date('2024-02-20'),
        lastActive: new Date(Date.now() - 86400000),
        messageCount: 1854,
        contactCount: 97,
        templateCount: 8,
        revenue: 99
      },
      {
        id: '5',
        name: 'Tom Wilson',
        email: 'tom@example.com',
        role: 'user',
        plan: 'free',
        status: 'pending',
        createdAt: new Date('2024-03-05'),
        lastActive: new Date('2024-03-05'),
        messageCount: 0,
        contactCount: 0,
        templateCount: 0,
        revenue: 0
      },
      {
        id: '6',
        name: 'Sarah Miller',
        email: 'sarah@example.com',
        role: 'manager',
        plan: 'enterprise',
        status: 'suspended',
        createdAt: new Date('2024-01-25'),
        lastActive: new Date(Date.now() - 86400000 * 10),
        messageCount: 2150,
        contactCount: 243,
        templateCount: 15,
        revenue: 599
      }
    ];

    setUsers(mockUsers);
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

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'manager':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'user':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
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
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      // Search filter
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      // Role filter
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      // Plan filter
      const matchesPlan = planFilter === 'all' || user.plan === planFilter;
      
      // Tab filter
      const matchesTab = currentTab === 'all' || 
                        (currentTab === 'recent' && (Date.now() - user.createdAt.getTime()) < 86400000 * 7) ||
                        (currentTab === 'active' && user.status === 'active') || 
                        (currentTab === 'inactive' && user.status !== 'active');
      
      return matchesSearch && matchesStatus && matchesRole && matchesPlan && matchesTab;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'email') {
        return sortDirection === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      } else if (sortField === 'role') {
        return sortDirection === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      } else if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      } else if (sortField === 'createdAt') {
        return sortDirection === 'asc'
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortField === 'lastActive') {
        return sortDirection === 'asc'
          ? a.lastActive.getTime() - b.lastActive.getTime()
          : b.lastActive.getTime() - a.lastActive.getTime();
      } else if (sortField === 'messageCount') {
        return sortDirection === 'asc'
          ? a.messageCount - b.messageCount
          : b.messageCount - a.messageCount;
      } else {
        return 0;
      }
    });

  // User stats
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const suspendedUsers = users.filter(user => user.status === 'suspended').length;
  const pendingUsers = users.filter(user => user.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold">User Management</h1>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">{inactiveUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">{suspendedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabs */}
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/20">
                    <th onClick={() => handleSort('name')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Name
                        {sortField === 'name' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSort('email')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Email
                        {sortField === 'email' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSort('role')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Role
                        {sortField === 'role' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSort('status')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Status
                        {sortField === 'status' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Plan</th>
                    <th onClick={() => handleSort('messageCount')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Messages
                        {sortField === 'messageCount' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSort('createdAt')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Created
                        {sortField === 'createdAt' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => handleSort('lastActive')} className="h-12 px-4 text-left align-middle font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        Last Active
                        {sortField === 'lastActive' && (
                          <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                        )}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${getRoleColor(user.role)}`}>
                            {user.role === 'admin' ? <UserCheck className="w-3 h-3" /> : null}
                            <span className="capitalize">{user.role}</span>
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${getStatusColor(user.status)}`}>
                            {getStatusIcon(user.status)}
                            <span className="capitalize">{user.status}</span>
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getPlanColor(user.plan)}`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">{user.messageCount.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground">
                            {formatDate(user.lastActive)}
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
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              {user.status === 'active' ? (
                                <DropdownMenuItem>
                                  <UserX className="w-4 h-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Activate User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-4 text-center">
                        No users found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length > 0 && (
              <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
