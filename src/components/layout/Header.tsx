'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Heart, ChevronDown } from 'lucide-react'
import { settingsService } from '@/lib/supabase'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Programs', 
    href: '/programs',
    children: [
      { name: 'Public Enlightenment', href: '/programs/public-enlightenment' },
      { name: 'Women Department', href: '/programs/women' },
      { name: 'Youth Department', href: '/programs/youth' },
    ]
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [contactEmail, setContactEmail] = useState('info@suredoorintl.org.ng')
  const [contactPhone, setContactPhone] = useState('+234 000 000 0000')

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getAll()
        if (data) {
          data.forEach(item => {
            if (item.key === 'contact_email') setContactEmail(item.value)
            if (item.key === 'contact_phone') setContactPhone(item.value)
          })
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
    loadSettings()
  }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-700 text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="hidden md:flex items-center gap-4">
            <span>Restoring the dignity of man since 1988</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${contactEmail}`} className="hover:text-primary-200 transition-colors">
              {contactEmail}
            </a>
            <span className="hidden md:inline">|</span>
            <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="hidden md:inline hover:text-primary-200 transition-colors">
              {contactPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-16 h-16 relative flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Suredoor Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-primary-700 leading-tight tracking-tight">Suredoor</h1>
              <p className="text-base font-bold text-gray-800">International Centre</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
                
                {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${
                      activeDropdown === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
