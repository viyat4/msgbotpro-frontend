'use client'

import { Card } from '@/components/ui/card'
import { MessageSquare, Users, Send, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Messages',
      value: '1,234',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-blue-600',
    },
    {
      title: 'Active Contacts',
      value: '456',
      change: '+5%',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Messages Sent Today',
      value: '89',
      change: '+23%',
      icon: Send,
      color: 'text-purple-600',
    },
    {
      title: 'Delivery Rate',
      value: '98.5%',
      change: '+0.2%',
      icon: BarChart3,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your WhatsApp messaging platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>          <div className="space-y-3">
            <a
              href="/messages"
              className="block p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Send New Message
            </a>
            <a
              href="/contacts"
              className="block p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Manage Contacts
            </a>
            <a
              href="/templates"
              className="block p-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
            >
              Create Template
            </a>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Message sent to +1234567890</span>
              <span className="text-xs text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New contact added</span>
              <span className="text-xs text-gray-400">5 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Template updated</span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
