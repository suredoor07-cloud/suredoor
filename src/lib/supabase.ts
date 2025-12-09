import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  category: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  title: string
  slug: string
  description: string
  content: string
  image: string
  department: 'public_enlightenment' | 'women' | 'youth'
  active: boolean
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image: string
  created_at: string
}

export interface Donation {
  id: string
  donor_name: string
  donor_email: string
  amount: number
  message: string
  anonymous: boolean
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  order: number
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  created_at: string
}
