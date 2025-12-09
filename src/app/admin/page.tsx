import { FileText, Image, Users, MessageSquare, Heart, TrendingUp, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { name: 'Total Blog Posts', value: '24', icon: FileText, change: '+3 this month', color: 'bg-blue-500' },
  { name: 'Gallery Images', value: '156', icon: Image, change: '+12 this month', color: 'bg-purple-500' },
  { name: 'Team Members', value: '8', icon: Users, change: 'No change', color: 'bg-green-500' },
  { name: 'Messages', value: '12', icon: MessageSquare, change: '5 unread', color: 'bg-yellow-500' },
  { name: 'Donations', value: '₦2.5M', icon: Heart, change: '+₦350K this month', color: 'bg-red-500' },
  { name: 'Page Views', value: '15.2K', icon: Eye, change: '+23% this month', color: 'bg-indigo-500' },
]

const recentActivity = [
  { action: 'New blog post published', item: 'Community Outreach 2024', time: '2 hours ago' },
  { action: 'New donation received', item: '₦50,000 from Anonymous', time: '5 hours ago' },
  { action: 'New message received', item: 'Partnership Inquiry', time: '1 day ago' },
  { action: 'Gallery updated', item: '5 new images added', time: '2 days ago' },
  { action: 'Team member added', item: 'John Doe - Volunteer', time: '3 days ago' },
]

const quickActions = [
  { name: 'New Blog Post', href: '/admin/blog/new', icon: FileText },
  { name: 'Upload Images', href: '/admin/gallery/upload', icon: Image },
  { name: 'View Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Add Event', href: '/admin/events/new', icon: Calendar },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-primary-600" />
                </div>
                <span className="font-medium text-gray-700">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Website Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Website Overview</h2>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>All systems operational</span>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold text-primary-600">6</p>
            <p className="text-sm text-gray-500 mt-1">Active Pages</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold text-primary-600">3</p>
            <p className="text-sm text-gray-500 mt-1">Departments</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold text-primary-600">50+</p>
            <p className="text-sm text-gray-500 mt-1">Programs Run</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold text-primary-600">35+</p>
            <p className="text-sm text-gray-500 mt-1">Years Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}
