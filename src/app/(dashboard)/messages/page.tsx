'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Send, 
  Plus, 
  Filter, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOutbound: boolean;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'image' | 'document' | 'template';
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'John Doe',
        phone: '+1234567890',
        lastMessage: 'Hey, how are you?',
        lastMessageTime: new Date(),
        unreadCount: 2,
        isOnline: true
      },
      {
        id: '2',
        name: 'Jane Smith',
        phone: '+0987654321',
        lastMessage: 'Thanks for the update!',
        lastMessageTime: new Date(Date.now() - 3600000),
        unreadCount: 0,
        isOnline: false
      },
      {
        id: '3',
        name: 'Bob Johnson',
        phone: '+1122334455',
        lastMessage: 'See you tomorrow',
        lastMessageTime: new Date(Date.now() - 7200000),
        unreadCount: 1,
        isOnline: true
      }
    ];

    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Hello there!',
        timestamp: new Date(Date.now() - 3600000),
        isOutbound: false,
        status: 'read',
        type: 'text'
      },
      {
        id: '2',
        content: 'Hi! How can I help you today?',
        timestamp: new Date(Date.now() - 3300000),
        isOutbound: true,
        status: 'read',
        type: 'text'
      },
      {
        id: '3',
        content: 'I need information about your services.',
        timestamp: new Date(Date.now() - 3000000),
        isOutbound: false,
        status: 'read',
        type: 'text'
      },
      {
        id: '4',
        content: 'Sure! I\'d be happy to help. What specific service are you interested in?',
        timestamp: new Date(Date.now() - 2700000),
        isOutbound: true,
        status: 'delivered',
        type: 'text'
      }
    ];

    setContacts(mockContacts);
    setSelectedContact(mockContacts[0]);
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      isOutbound: true,
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <div className="w-4 h-4 bg-red-500 rounded-full" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="h-full flex">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button size="sm" className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 cursor-pointer border-b hover:bg-muted/50 transition-colors ${
                selectedContact?.id === contact.id ? 'bg-muted' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(contact.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {contact.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{contact.phone}</span>
                    {contact.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOutbound ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOutbound
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      message.isOutbound ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      {message.isOutbound && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[40px] max-h-32 resize-none"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="h-10 w-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a contact from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
