'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Download,
  Upload,
  Edit,
  Trash2,
  MessageCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  tags: string[];
  location?: string;
  addedDate: Date;
  lastActivity: Date;
  messageCount: number;
  status: 'active' | 'inactive' | 'blocked';
  notes?: string;
}

interface ContactGroup {
  id: string;
  name: string;
  contactCount: number;
  color: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groups, setGroups] = useState<ContactGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Mock data
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com',
        tags: ['customer', 'vip'],
        location: 'New York, USA',
        addedDate: new Date('2024-01-15'),
        lastActivity: new Date(),
        messageCount: 45,
        status: 'active'
      },
      {
        id: '2',
        name: 'Jane Smith',
        phone: '+0987654321',
        email: 'jane@example.com',
        tags: ['lead', 'prospect'],
        location: 'Los Angeles, USA',
        addedDate: new Date('2024-01-10'),
        lastActivity: new Date(Date.now() - 3600000),
        messageCount: 23,
        status: 'active'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        phone: '+1122334455',
        tags: ['customer'],
        addedDate: new Date('2024-01-05'),
        lastActivity: new Date(Date.now() - 86400000),
        messageCount: 12,
        status: 'inactive'
      },
      {
        id: '4',
        name: 'Alice Wilson',
        phone: '+5566778899',
        email: 'alice@example.com',
        tags: ['support'],
        location: 'Chicago, USA',
        addedDate: new Date('2024-01-20'),
        lastActivity: new Date(Date.now() - 172800000),
        messageCount: 8,
        status: 'active'
      }
    ];

    const mockGroups: ContactGroup[] = [
      { id: '1', name: 'VIP Customers', contactCount: 15, color: 'bg-purple-500' },
      { id: '2', name: 'Prospects', contactCount: 32, color: 'bg-blue-500' },
      { id: '3', name: 'Support', contactCount: 28, color: 'bg-green-500' },
      { id: '4', name: 'Newsletter', contactCount: 156, color: 'bg-orange-500' }
    ];

    setContacts(mockContacts);
    setGroups(mockGroups);
  }, []);

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === filteredContacts.length
        ? []
        : filteredContacts.map(contact => contact.id)
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery) ||
                         contact.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || contact.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'blocked':
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your contacts and organize them into groups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="ml-2 text-sm font-medium">Total Contacts</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{contacts.length}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-green-500 rounded-full" />
              <span className="ml-2 text-sm font-medium">Active</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.status === 'active').length}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-500 rounded-full" />
              <span className="ml-2 text-sm font-medium">Inactive</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.status === 'inactive').length}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-red-500 rounded-full" />
              <span className="ml-2 text-sm font-medium">Blocked</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.status === 'blocked').length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((group) => (
              <div key={group.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.contactCount} contacts
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
                  placeholder="Search contacts..."
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
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {selectedContacts.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
              <span className="text-sm">
                {selectedContacts.length} contact(s) selected
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Phone</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Tags</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Messages</th>
                  <th className="text-left p-4 font-medium">Last Activity</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          {contact.location && (
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {contact.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        {contact.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      {contact.email ? (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {contact.email}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{contact.messageCount}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">
                        {formatDate(contact.lastActivity)}
                      </div>
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
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Contact
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
