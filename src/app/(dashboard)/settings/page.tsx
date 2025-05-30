'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User,
  Bell,
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  Save,
  Camera,
  Key,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  company: string;
  bio: string;
  avatar: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
}

interface WhatsAppSettings {
  businessName: string;
  phoneNumber: string;
  webhook: string;
  accessToken: string;
  isVerified: boolean;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Acme Corp',
    bio: 'Digital marketing professional focused on customer engagement.',
    avatar: ''
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    weeklyReports: true
  });

  const [whatsappSettings, setWhatsappSettings] = useState<WhatsAppSettings>({
    businessName: 'Acme Corp Support',
    phoneNumber: '+1234567890',
    webhook: 'https://your-domain.com/webhook',
    accessToken: '••••••••••••••••',
    isVerified: true
  });

  const handleSaveProfile = () => {
    // API call to save profile settings
    toast({
      title: 'Profile updated',
      description: 'Your profile settings have been saved successfully.',
    });
  };

  const handleSaveNotifications = () => {
    // API call to save notification settings
    toast({
      title: 'Notification preferences updated',
      description: 'Your notification settings have been saved successfully.',
    });
  };

  const handleSaveWhatsApp = () => {
    // API call to save WhatsApp settings
    toast({
      title: 'WhatsApp settings updated',
      description: 'Your WhatsApp Business API settings have been saved successfully.',
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API', icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileSettings.avatar} />
                    <AvatarFallback className="text-lg">
                      {profileSettings.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. Max size of 800K.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileSettings.name}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileSettings.phone}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileSettings.company}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        emailNotifications: e.target.checked
                      }))}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important alerts via SMS
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        smsNotifications: e.target.checked
                      }))}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get push notifications in your browser
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        pushNotifications: e.target.checked
                      }))}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and tips
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        marketingEmails: e.target.checked
                      }))}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Get weekly analytics reports via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        weeklyReports: e.target.checked
                      }))}
                      className="w-4 h-4"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  WhatsApp Business API
                  {whatsappSettings.isVerified && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={whatsappSettings.businessName}
                      onChange={(e) => setWhatsappSettings(prev => ({
                        ...prev,
                        businessName: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={whatsappSettings.phoneNumber}
                      onChange={(e) => setWhatsappSettings(prev => ({
                        ...prev,
                        phoneNumber: e.target.value
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <Input
                    id="webhook"
                    value={whatsappSettings.webhook}
                    onChange={(e) => setWhatsappSettings(prev => ({
                      ...prev,
                      webhook: e.target.value
                    }))}
                    placeholder="https://your-domain.com/webhook"
                  />
                </div>

                <div>
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Input
                    id="accessToken"
                    type="password"
                    value={whatsappSettings.accessToken}
                    onChange={(e) => setWhatsappSettings(prev => ({
                      ...prev,
                      accessToken: e.target.value
                    }))}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={handleSaveWhatsApp}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                  <Button variant="outline">
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button>
                        <Key className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <hr />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Enable 2FA
                    </Button>
                  </div>

                  <hr />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Chrome on Windows • Current</p>
                        </div>
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-muted-foreground">iPhone • 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Pro Plan</h3>
                      <p className="text-muted-foreground">$29/month</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Active
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: 'Jan 15, 2024', amount: '$29.00', status: 'Paid' },
                      { date: 'Dec 15, 2023', amount: '$29.00', status: 'Paid' },
                      { date: 'Nov 15, 2023', amount: '$29.00', status: 'Paid' },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600">{invoice.status}</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">API Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Production Key</p>
                        <p className="text-sm text-muted-foreground font-mono">sk_live_••••••••••••••••</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Key className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Test Key</p>
                        <p className="text-sm text-muted-foreground font-mono">sk_test_••••••••••••••••</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Key className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Webhook Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input
                        id="webhookUrl"
                        placeholder="https://your-app.com/webhooks"
                        defaultValue="https://your-app.com/webhooks"
                      />
                    </div>
                    <div>
                      <Label htmlFor="webhookSecret">Webhook Secret</Label>
                      <Input
                        id="webhookSecret"
                        type="password"
                        defaultValue="••••••••••••••••"
                      />
                    </div>
                    <Button>
                      Save Webhook Settings
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Rate Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">1000</div>
                      <div className="text-sm text-muted-foreground">Requests/hour</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">50</div>
                      <div className="text-sm text-muted-foreground">Concurrent</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">10MB</div>
                      <div className="text-sm text-muted-foreground">Max file size</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-border p-4 space-y-2">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" />
          Settings
        </h2>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}
