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
  Copy,
  Settings as SettingsIcon
} from 'lucide-react';

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
    console.log('Profile saved');
  };

  const handleSaveNotifications = () => {
    // API call to save notification settings
    console.log('Notifications saved');
  };

  const handleSaveWhatsApp = () => {
    // API call to save WhatsApp settings
    console.log('WhatsApp settings saved');
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
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => 
                        setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))
                      }
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive urgent notifications via SMS
                      </p>
                    </div>                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => 
                        setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))
                      }
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => 
                        setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))
                      }
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions
                      </p>
                    </div>                    <input
                      type="checkbox"
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => 
                        setNotificationSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))
                      }
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Weekly Reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly analytics reports
                      </p>                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => 
                        setNotificationSettings(prev => ({ ...prev, weeklyReports: e.target.checked }))
                      }
                      className="rounded"
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
                  <Smartphone className="w-5 h-5" />
                  WhatsApp Business API
                  {whatsappSettings.isVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
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
                      onChange={(e) => setWhatsappSettings(prev => ({ ...prev, businessName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={whatsappSettings.phoneNumber}
                      onChange={(e) => setWhatsappSettings(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <Input
                    id="webhook"
                    value={whatsappSettings.webhook}
                    onChange={(e) => setWhatsappSettings(prev => ({ ...prev, webhook: e.target.value }))}
                    placeholder="https://your-domain.com/webhook"
                  />
                </div>

                <div>
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Input
                    id="accessToken"
                    type="password"
                    value={whatsappSettings.accessToken}
                    onChange={(e) => setWhatsappSettings(prev => ({ ...prev, accessToken: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">
                      WhatsApp Business API Connected
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Your WhatsApp Business account is successfully connected and verified.
                    </p>
                  </div>
                </div>

                <Button onClick={handleSaveWhatsApp}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
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
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Change Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Update your password regularly for better security
                      </p>
                    </div>
                    <Button variant="outline">
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Login Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </p>
                    </div>
                    <Button variant="outline">
                      View Sessions
                    </Button>
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
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">Pro Plan</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        $29/month • Next billing date: March 15, 2024
                      </p>
                    </div>
                    <Button variant="outline">
                      Manage Plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Payment Method</h4>
                      <p className="text-sm text-muted-foreground">
                        •••• •••• •••• 4242 (Visa)
                      </p>
                    </div>
                    <Button variant="outline">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Card
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Billing History</h4>
                      <p className="text-sm text-muted-foreground">
                        View and download your invoices
                      </p>
                    </div>
                    <Button variant="outline">
                      View History
                    </Button>
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
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="apiKey"
                        type="password"
                        value="sk_test_••••••••••••••••"
                        readOnly
                      />
                      <Button variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-domain.com/api/webhook"
                    />
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-700 dark:text-yellow-300">
                          API Usage Limits
                        </h4>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          You have used 2,450 of 10,000 API calls this month.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save API Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-md transition-colors ${
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
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
