'use client'

import { useState, useEffect } from 'react'
import { FileText, Image, Users, MessageSquare, Heart, TrendingUp, Eye, Calendar, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { blogService, galleryService, teamService, messagesService, donationsService, programsService } from '@/lib/supabase'

const quickActions = [
  { name: 'New Blog Post', href: '/admin/blog/new', icon: FileText },
  { name: 'Upload Images', href: '/admin/gallery', icon: Image },
  { name: 'View Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'New Program', href: '/admin/programs/new', icon: Calendar },
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    blogPosts: 0,
    galleryImages: 0,
    teamMembers: 0,
    messages: 0,
    unreadMessages: 0,
    donations: 0,
    totalDonations: 0,
    programs: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [blogs, images, team, messages, donations, programs] = await Promise.all([
        blogService.getAll().catch(() => []),
        galleryService.getAll().catch(() => []),
        teamService.getAll().catch(() => []),
        messagesService.getAll().catch(() => []),
        donationsService.getAll().catch(() => []),
        programsService.getAll().catch(() => []),
      ])

      const unreadMessages = messages.filter(m => !m.read).length
      const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0)

      setStats({
        blogPosts: blogs.length,
        galleryImages: images.length,
        teamMembers: team.length,
        messages: messages.length,
        unreadMessages,
        donations: donations.length,
        totalDonations,
        programs: programs.length,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
  }

  const statCards = [
    { name: 'Total Blog Posts', value: stats.blogPosts.toString(), icon: FileText, change: 'From database', color: 'bg-blue-500' },
    { name: 'Gallery Images', value: stats.galleryImages.toString(), icon: Image, change: 'From database', color: 'bg-purple-500' },
    { name: 'Team Members', value: stats.teamMembers.toString(), icon: Users, change: 'From database', color: 'bg-green-500' },
    { name: 'Messages', value: stats.messages.toString(), icon: MessageSquare, change: `${stats.unreadMessages} unread`, color: 'bg-yellow-500' },
    { name: 'Donations', value: formatCurrency(stats.totalDonations), icon: Heart, change: `${stats.donations} total`, color: 'bg-red-500' },
    { name: 'Programs', value: stats.programs.toString(), icon: Eye, change: 'From database', color: 'bg-indigo-500' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
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

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <action.icon className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-medium text-gray-700 text-sm text-center">{action.name}</span>
            </Link>
          ))}
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
