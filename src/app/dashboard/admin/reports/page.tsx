'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  Download, 
  Filter, 
  ArrowLeft,
  Calendar,
  FileText,
  BarChart,
  PieChart,
  LineChart,
  Share2,
  Clock,
  Search,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Report {
  id: string;
  name: string;
  category: 'usage' | 'performance' | 'engagement' | 'financial';
  lastGenerated: string;
  schedule: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'ad-hoc';
  format: 'pdf' | 'csv' | 'excel' | 'dashboard';
  status: 'completed' | 'scheduled' | 'in-progress' | 'failed';
}

export default function AdminReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Simulated data fetch
    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Monthly User Activity',
        category: 'usage',
        lastGenerated: '2025-05-25T12:00:00Z',
        schedule: 'monthly',
        format: 'dashboard',
        status: 'completed'
      },
      {
        id: '2',
        name: 'Message Delivery Analytics',
        category: 'performance',
        lastGenerated: '2025-05-26T08:30:00Z',
        schedule: 'weekly',
        format: 'pdf',
        status: 'completed'
      },
      {
        id: '3',
        name: 'Customer Engagement Metrics',
        category: 'engagement',
        lastGenerated: '2025-05-24T17:45:00Z',
        schedule: 'weekly',
        format: 'dashboard',
        status: 'completed'
      },
      {
        id: '4',
        name: 'Revenue Report',
        category: 'financial',
        lastGenerated: '2025-05-01T09:15:00Z',
        schedule: 'monthly',
        format: 'excel',
        status: 'completed'
      },
      {
        id: '5',
        name: 'Template Performance Analysis',
        category: 'performance',
        lastGenerated: '2025-05-22T14:30:00Z',
        schedule: 'weekly',
        format: 'dashboard',
        status: 'completed'
      },
      {
        id: '6',
        name: 'Daily Message Volume',
        category: 'usage',
        lastGenerated: '2025-05-28T23:59:00Z',
        schedule: 'daily',
        format: 'csv',
        status: 'scheduled'
      },
      {
        id: '7',
        name: 'Quarterly Business Review',
        category: 'financial',
        lastGenerated: '2025-04-01T10:00:00Z',
        schedule: 'quarterly',
        format: 'pdf',
        status: 'scheduled'
      },
      {
        id: '8',
        name: 'Campaign Effectiveness',
        category: 'engagement',
        lastGenerated: '2025-05-20T16:15:00Z',
        schedule: 'ad-hoc',
        format: 'dashboard',
        status: 'completed'
      },
      {
        id: '9',
        name: 'System Health Check',
        category: 'performance',
        lastGenerated: '2025-05-29T07:00:00Z',
        schedule: 'daily',
        format: 'dashboard',
        status: 'in-progress'
      },
      {
        id: '10',
        name: 'User Acquisition Funnel',
        category: 'usage',
        lastGenerated: '2025-05-15T11:45:00Z',
        schedule: 'monthly',
        format: 'dashboard',
        status: 'completed'
      }
    ];

    setReports(mockReports);
  }, []);

  const getReportIcon = (category: Report['category']) => {
    switch (category) {
      case 'usage':
        return <BarChart3 className="w-5 h-5" />;
      case 'performance':
        return <LineChart className="w-5 h-5" />;
      case 'engagement':
        return <PieChart className="w-5 h-5" />;
      case 'financial':
        return <BarChart className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Admin Reports</h1>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <FileText className="w-8 h-8 text-blue-700 dark:text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold">{reports.length}</h3>
              <p className="text-muted-foreground">Total Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Clock className="w-8 h-8 text-green-700 dark:text-green-300" />
              </div>
              <h3 className="text-2xl font-semibold">{reports.filter(r => r.status === 'scheduled').length}</h3>
              <p className="text-muted-foreground">Scheduled Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <Calendar className="w-8 h-8 text-purple-700 dark:text-purple-300" />
              </div>
              <h3 className="text-2xl font-semibold">{reports.filter(r => r.schedule === 'daily').length}</h3>
              <p className="text-muted-foreground">Daily Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900">
                <Share2 className="w-8 h-8 text-amber-700 dark:text-amber-300" />
              </div>
              <h3 className="text-2xl font-semibold">{reports.filter(r => r.format === 'dashboard').length}</h3>
              <p className="text-muted-foreground">Dashboard Reports</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    {filterCategory === 'all' ? 'All Categories' : 
                      filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterCategory('all')}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterCategory('usage')}>
                    Usage Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('performance')}>
                    Performance Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('engagement')}>
                    Engagement Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('financial')}>
                    Financial Reports
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Report Name</th>
                  <th className="py-3 px-4 text-left font-medium">Category</th>
                  <th className="py-3 px-4 text-left font-medium">Last Generated</th>
                  <th className="py-3 px-4 text-left font-medium">Schedule</th>
                  <th className="py-3 px-4 text-left font-medium">Format</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-primary/10">
                        {getReportIcon(report.category)}
                      </div>
                      <span className="font-medium">{report.name}</span>
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {report.category}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {report.schedule}
                    </td>
                    <td className="py-3 px-4 uppercase">
                      {report.format}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Share Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
