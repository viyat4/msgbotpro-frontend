'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Copy,
  Edit,
  Trash2,
  Eye,
  Send,
  Image,
  FileText,
  Video,
  Star,
  Clock,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'video';
  category: string;
  variables: string[];
  status: 'approved' | 'pending' | 'rejected';
  createdAt: Date;
  lastUsed?: Date;
  usageCount: number;
  isFavorite: boolean;
  language: string;
}

interface TemplateCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  useEffect(() => {
    const mockTemplates: Template[] = [
      {
        id: '1',
        name: 'Welcome Message',
        content: 'Hello {{name}}! Welcome to our service. We\'re excited to have you on board. If you have any questions, feel free to ask!',
        type: 'text',
        category: 'welcome',
        variables: ['name'],
        status: 'approved',
        createdAt: new Date('2024-01-15'),
        lastUsed: new Date(),
        usageCount: 156,
        isFavorite: true,
        language: 'en'
      },
      {
        id: '2',
        name: 'Order Confirmation',
        content: 'Hi {{customer_name}}, your order #{{order_id}} has been confirmed! Total amount: {{amount}}. Expected delivery: {{delivery_date}}.',
        type: 'text',
        category: 'orders',
        variables: ['customer_name', 'order_id', 'amount', 'delivery_date'],
        status: 'approved',
        createdAt: new Date('2024-01-12'),
        lastUsed: new Date(Date.now() - 3600000),
        usageCount: 89,
        isFavorite: false,
        language: 'en'
      },
      {
        id: '3',
        name: 'Appointment Reminder',
        content: 'Reminder: You have an appointment scheduled for {{date}} at {{time}}. Location: {{location}}. Please confirm your attendance.',
        type: 'text',
        category: 'appointments',
        variables: ['date', 'time', 'location'],
        status: 'approved',
        createdAt: new Date('2024-01-10'),
        lastUsed: new Date(Date.now() - 86400000),
        usageCount: 67,
        isFavorite: true,
        language: 'en'
      },
      {
        id: '4',
        name: 'Support Follow-up',
        content: 'Hi {{name}}, we wanted to follow up on your recent support ticket #{{ticket_id}}. Was your issue resolved to your satisfaction?',
        type: 'text',
        category: 'support',
        variables: ['name', 'ticket_id'],
        status: 'pending',
        createdAt: new Date('2024-01-08'),
        usageCount: 23,
        isFavorite: false,
        language: 'en'
      }
    ];

    const mockCategories: TemplateCategory[] = [
      { id: '1', name: 'Welcome', count: 8, color: 'bg-blue-500' },
      { id: '2', name: 'Orders', count: 12, color: 'bg-green-500' },
      { id: '3', name: 'Appointments', count: 6, color: 'bg-purple-500' },
      { id: '4', name: 'Support', count: 15, color: 'bg-orange-500' },
      { id: '5', name: 'Marketing', count: 20, color: 'bg-pink-500' }
    ];

    setTemplates(mockTemplates);
    setCategories(mockCategories);
  }, []);

  const handleToggleFavorite = (templateId: string) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === templateId
          ? { ...template, isFavorite: !template.isFavorite }
          : template
      )
    );
  };

  const getTypeIcon = (type: Template['type']) => {
    switch (type) {
      case 'text':
        return <FileText className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Template['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Message Templates</h1>
          <p className="text-muted-foreground">
            Create and manage reusable message templates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Total Templates</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{templates.length}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-green-500 rounded-full" />
              <span className="ml-2 text-sm font-medium">Approved</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {templates.filter(t => t.status === 'approved').length}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Favorites</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {templates.filter(t => t.isFavorite).length}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Total Usage</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Template Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                  selectedCategory === category.name.toLowerCase() ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedCategory(category.name.toLowerCase())}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} templates
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name.toLowerCase()}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(template.type)}
                  <h3 className="font-semibold">{template.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFavorite(template.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        template.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(template.status)}`}>
                  {template.status}
                </span>
                <span className="text-xs text-muted-foreground uppercase">
                  {template.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm line-clamp-3">{template.content}</p>
                </div>
                
                {template.variables.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Variables:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable) => (
                        <span
                          key={variable}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {`{{${variable}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{template.usageCount} uses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {template.lastUsed 
                        ? `Used ${formatDate(template.lastUsed)}`
                        : 'Never used'
                      }
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all' || selectedType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first message template to get started'
              }
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
