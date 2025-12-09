'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Image, Bold, Italic, List, Link as LinkIcon, X, Upload } from 'lucide-react'
import { blogService, storageService } from '@/lib/supabase'

const categories = ['Events', 'Success Stories', 'Programs', 'Announcements', 'Fundraising', 'Community']

export default function NewBlogPost() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    featured_image: '',
    published: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'published' ? value === 'published' : value,
      // Auto-generate slug from title
      ...(name === 'title' && {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }),
    }))
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)
    setPreviewUrl(URL.createObjectURL(file))

    try {
      const imageUrl = await storageService.uploadImage(file, 'gallery')
      setFormData(prev => ({ ...prev, featured_image: imageUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again or use a URL.')
      setPreviewUrl('')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      await blogService.create({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        featured_image: formData.featured_image,
        published: formData.published,
        author: 'Admin',
      })
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
            <p className="text-gray-500 mt-1">Create a new blog post</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-5 h-5" />
            Preview
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors"
          >
            {isSubmitting ? (
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
                Save Post
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              placeholder="Enter post title"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Brief description of the post"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            
            {/* Simple Toolbar */}
            <div className="flex items-center gap-1 p-2 border border-gray-200 rounded-t-xl bg-gray-50">
              <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Bold className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Italic className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors">
                <List className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors">
                <LinkIcon className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Image className="w-4 h-4" />
              </button>
            </div>
            
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full px-4 py-3 border border-t-0 border-gray-200 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="Write your post content here... (Markdown supported)"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Publish Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="published" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="published"
                  name="published"
                  value={formData.published ? 'published' : 'draft'}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                  placeholder="post-url-slug"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
            
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Featured Image</h3>
            
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400"
            >
              {previewUrl || formData.featured_image ? (
                <img src={previewUrl || formData.featured_image} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{isUploading ? 'Uploading...' : 'Click to upload'}</p>
                </>
              )}
            </div>
            
            <input
              type="text"
              name="featured_image"
              value={formData.featured_image}
              onChange={handleChange}
              className="w-full mt-4 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              placeholder="Or enter image URL"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
