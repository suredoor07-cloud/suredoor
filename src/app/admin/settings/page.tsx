'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Loader2, Lock, Eye, EyeOff } from 'lucide-react'
import { settingsService } from '@/lib/supabase'

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [storedPassword, setStoredPassword] = useState('Paxxword321##')
  const [settings, setSettings] = useState({
    site_name: 'Suredoor International Centre for Research and Rehabilitation',
    site_description: 'A humanitarian body dedicated to restoring the dignity of man',
    contact_email: 'info@suredoorintl.org.ng',
    contact_phone: '+234 000 000 0000',
    address: 'Lagos State, Nigeria',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    youtube_url: '',
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await settingsService.getAll()
      if (data && data.length > 0) {
        const settingsObj: Record<string, string> = {}
        data.forEach(item => {
          settingsObj[item.key] = item.value || ''
          if (item.key === 'admin_password') setStoredPassword(item.value)
        })
        setSettings(prev => ({ ...prev, ...settingsObj }))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save each setting to Supabase
      for (const [key, value] of Object.entries(settings)) {
        await settingsService.update(key, value)
      }
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your website settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-600" />
          General Settings
        </h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              id="site_name"
              name="site_name"
              value={settings.site_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              id="site_description"
              name="site_description"
              value={settings.site_description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary-600" />
          Contact Information
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={settings.contact_email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="text"
              id="contact_phone"
              name="contact_phone"
              value={settings.contact_phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Social Media Links
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700 mb-2">
              <Facebook className="w-4 h-4 inline mr-2 text-blue-600" />
              Facebook
            </label>
            <input
              type="url"
              id="facebook_url"
              name="facebook_url"
              value={settings.facebook_url}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700 mb-2">
              <Twitter className="w-4 h-4 inline mr-2 text-sky-500" />
              Twitter / X
            </label>
            <input
              type="url"
              id="twitter_url"
              name="twitter_url"
              value={settings.twitter_url}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700 mb-2">
              <Instagram className="w-4 h-4 inline mr-2 text-pink-600" />
              Instagram
            </label>
            <input
              type="url"
              id="instagram_url"
              name="instagram_url"
              value={settings.instagram_url}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-2">
              <Youtube className="w-4 h-4 inline mr-2 text-red-600" />
              YouTube
            </label>
            <input
              type="url"
              id="youtube_url"
              name="youtube_url"
              value={settings.youtube_url}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary-600" />
          Change Password
        </h2>
        
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <button
            onClick={async () => {
              if (passwordData.currentPassword !== storedPassword) {
                alert('Current password is incorrect')
                return
              }
              if (passwordData.newPassword.length < 6) {
                alert('New password must be at least 6 characters')
                return
              }
              if (passwordData.newPassword !== passwordData.confirmPassword) {
                alert('New passwords do not match')
                return
              }
              setIsChangingPassword(true)
              try {
                await settingsService.update('admin_password', passwordData.newPassword)
                setStoredPassword(passwordData.newPassword)
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                alert('Password changed successfully!')
              } catch (error) {
                console.error('Error changing password:', error)
                alert('Error changing password. Please try again.')
              } finally {
                setIsChangingPassword(false)
              }
            }}
            disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
          >
            {isChangingPassword ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>
    </div>
  )
}
