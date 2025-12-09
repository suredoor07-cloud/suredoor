'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { settingsService } from '@/lib/supabase'

export default function Footer() {
  const [settings, setSettings] = useState({
    contact_email: 'info@suredoorintl.org.ng',
    contact_phone: '+234 000 000 0000',
    address: 'Lagos State, Nigeria',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    youtube_url: '',
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getAll()
        if (data) {
          const settingsObj: Record<string, string> = {}
          data.forEach(item => {
            settingsObj[item.key] = item.value
          })
          setSettings(prev => ({ ...prev, ...settingsObj }))
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
    loadSettings()
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Suredoor</h3>
                <p className="text-sm text-gray-400">International Centre</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              A humanitarian body dedicated to restoring the dignity of man through socio-cultural programmes since 1988.
            </p>
            <div className="flex gap-4">
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.twitter_url && (
                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {!settings.facebook_url && !settings.twitter_url && !settings.instagram_url && !settings.youtube_url && (
                <>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Departments</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/programs/public-enlightenment" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Public Enlightenment
                </Link>
              </li>
              <li>
                <Link href="/programs/women" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Women Department
                </Link>
              </li>
              <li>
                <Link href="/programs/youth" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Youth Department
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Skill Acquisition
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Relief & Reorientation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href={`tel:${settings.contact_phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-primary-400 transition-colors">
                  {settings.contact_phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href={`mailto:${settings.contact_email}`} className="text-gray-400 hover:text-primary-400 transition-colors">
                  {settings.contact_email}
                </a>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Subscribe to Newsletter</h5>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Suredoor International Centre for Research and Rehabilitation. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for humanity</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
