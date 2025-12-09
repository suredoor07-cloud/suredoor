'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Image, Bold, Italic, List, Link as LinkIcon } from 'lucide-react'

const categories = ['Events', 'Success Stories', 'Programs', 'Announcements', 'Fundraising', 'Community']

// Sample posts data (in production, this would come from Supabase)
const samplePosts: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Annual Community Outreach Program 2024',
    slug: 'community-outreach-2024',
    excerpt: 'Our annual community outreach program brought hope and resources to over 500 families.',
    content: 'Our annual community outreach program brought hope and resources to over 500 families in Lagos State. The event featured health screenings, food distribution, and educational materials for children.\n\nVolunteers from across the state came together to make this event a success. We are grateful for the support of our donors and partners who made this possible.',
    category: 'Events',
    featuredImage: '',
    status: 'published',
  },
  '2': {
    id: '2',
    title: 'Youth Empowerment: 50 Graduates Complete Skill Training',
    slug: 'youth-empowerment-success',
    excerpt: 'Celebrating the successful completion of our skill acquisition program.',
    content: 'We are proud to announce that 50 young people have successfully completed our skill acquisition training program. The graduates received training in various trades including tailoring, computer skills, and small business management.',
    category: 'Success Stories',
    featuredImage: '',
    status: 'published',
  },
  '3': {
    id: '3',
    title: 'Women\'s Health Seminar Reaches 200 Participants',
    slug: 'women-health-seminar',
    excerpt: 'Our Women Department organized a comprehensive health seminar.',
    content: 'The Women Department successfully organized a health seminar that reached over 200 participants. Topics covered included reproductive health, nutrition, and mental wellness.',
    category: 'Programs',
    featuredImage: '',
    status: 'published',
  },
  '4': {
    id: '4',
    title: 'New Partnership with Lagos State Government',
    slug: 'partnership-announcement',
    excerpt: 'We are excited to announce a new partnership.',
    content: 'Suredoor International is pleased to announce a new partnership with the Lagos State Government to expand our youth empowerment programs across the state.',
    category: 'Announcements',
    featuredImage: '',
    status: 'draft',
  },
}

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    featuredImage: '',
    status: 'draft',
  })

  useEffect(() => {
    // Load post data
    const post = samplePosts[postId]
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        featuredImage: post.featuredImage || '',
        status: post.status,
      })
    }
  }, [postId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In production, this would save to Supabase
    console.log('Updating post:', formData)

    setIsSubmitting(false)
    router.push('/admin/blog')
  }

  if (!samplePosts[postId]) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link href="/admin/blog" className="text-primary-600 hover:text-primary-700">
          ← Back to Blog Posts
        </Link>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="text-gray-500 mt-1">Update your blog post</p>
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
                Save Changes
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
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
            
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop an image, or</p>
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Browse files
              </button>
            </div>
            
            <input
              type="text"
              id="featuredImage"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full mt-4 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              placeholder="Or enter image URL"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
