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
  donation_type: 'one-time' | 'monthly'
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

export interface SiteSetting {
  id: string
  key: string
  value: string
  updated_at: string
}

// ============ DATA SERVICES ============

// Site Settings
export const settingsService = {
  async getAll() {
    const { data, error } = await supabase.from('site_settings').select('*')
    if (error) throw error
    return data as SiteSetting[]
  },
  
  async get(key: string) {
    const { data, error } = await supabase.from('site_settings').select('*').eq('key', key).single()
    if (error) return null
    return data as SiteSetting
  },
  
  async update(key: string, value: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      .select()
    if (error) throw error
    return data
  }
}

// Gallery Images
export const galleryService = {
  async getAll() {
    const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as GalleryImage[]
  },
  
  async create(image: Omit<GalleryImage, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('gallery_images').insert(image).select()
    if (error) throw error
    return data[0] as GalleryImage
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('gallery_images').delete().eq('id', id)
    if (error) throw error
  }
}

// Blog Posts
export const blogService = {
  async getAll() {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as BlogPost[]
  },
  
  async getPublished() {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false })
    if (error) throw error
    return data as BlogPost[]
  },
  
  async getBySlug(slug: string) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single()
    if (error) return null
    return data as BlogPost
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()
    if (error) return null
    return data as BlogPost
  },
  
  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('blog_posts').insert(post).select()
    if (error) throw error
    return data[0] as BlogPost
  },
  
  async update(id: string, post: Partial<BlogPost>) {
    const { data, error } = await supabase.from('blog_posts').update({ ...post, updated_at: new Date().toISOString() }).eq('id', id).select()
    if (error) throw error
    return data[0] as BlogPost
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) throw error
  }
}

// Programs
export const programsService = {
  async getAll() {
    const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as Program[]
  },
  
  async getActive() {
    const { data, error } = await supabase.from('programs').select('*').eq('active', true).order('created_at', { ascending: false })
    if (error) throw error
    return data as Program[]
  },
  
  async getBySlug(slug: string) {
    const { data, error } = await supabase.from('programs').select('*').eq('slug', slug).single()
    if (error) return null
    return data as Program
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('programs').select('*').eq('id', id).single()
    if (error) return null
    return data as Program
  },
  
  async create(program: Omit<Program, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('programs').insert(program).select()
    if (error) throw error
    return data[0] as Program
  },
  
  async update(id: string, program: Partial<Program>) {
    const { data, error } = await supabase.from('programs').update(program).eq('id', id).select()
    if (error) throw error
    return data[0] as Program
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('programs').delete().eq('id', id)
    if (error) throw error
  }
}

// Team Members
export const teamService = {
  async getAll() {
    const { data, error } = await supabase.from('team_members').select('*').order('display_order', { ascending: true })
    if (error) throw error
    return data as TeamMember[]
  },
  
  async getActive() {
    const { data, error } = await supabase.from('team_members').select('*').eq('active', true).order('display_order', { ascending: true })
    if (error) throw error
    return data as TeamMember[]
  },
  
  async create(member: Omit<TeamMember, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('team_members').insert(member).select()
    if (error) throw error
    return data[0] as TeamMember
  },
  
  async update(id: string, member: Partial<TeamMember>) {
    const { data, error } = await supabase.from('team_members').update(member).eq('id', id).select()
    if (error) throw error
    return data[0] as TeamMember
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('team_members').delete().eq('id', id)
    if (error) throw error
  }
}

// Contact Messages
export const messagesService = {
  async getAll() {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as ContactMessage[]
  },
  
  async markAsRead(id: string) {
    const { error } = await supabase.from('contact_messages').update({ read: true }).eq('id', id)
    if (error) throw error
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    if (error) throw error
  },
  
  async create(message: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) {
    const { data, error } = await supabase.from('contact_messages').insert({ ...message, read: false }).select()
    if (error) throw error
    return data[0] as ContactMessage
  }
}

// Donations
export const donationsService = {
  async getAll() {
    const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as Donation[]
  },
  
  async create(donation: Omit<Donation, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('donations').insert(donation).select()
    if (error) throw error
    return data[0] as Donation
  }
}

// ============ STORAGE SERVICE ============

export const storageService = {
  async uploadImage(file: File, bucket: string = 'gallery') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return urlData.publicUrl
  },

  async deleteImage(url: string, bucket: string = 'gallery') {
    // Extract file path from URL
    const urlParts = url.split(`${bucket}/`)
    if (urlParts.length < 2) return
    
    const filePath = urlParts[1]
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) throw error
  },

  getPublicUrl(path: string, bucket: string = 'gallery') {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }
}
