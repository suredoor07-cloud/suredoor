import Link from 'next/link'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'

export const metadata = {
  title: 'Blog & News - Suredoor International',
  description: 'Stay updated with the latest news, stories, and updates from Suredoor International.',
}

// Sample blog posts - in production, these would come from Supabase
const blogPosts = [
  {
    id: '1',
    slug: 'community-outreach-2024',
    title: 'Annual Community Outreach Program 2024',
    excerpt: 'Our annual community outreach program brought hope and resources to over 500 families in underserved communities across Lagos State.',
    author: 'Admin',
    category: 'Events',
    date: '2024-12-01',
    image: '/images/blog/outreach.jpg',
  },
  {
    id: '2',
    slug: 'youth-empowerment-success',
    title: 'Youth Empowerment: 50 Graduates Complete Skill Training',
    excerpt: 'Celebrating the successful completion of our skill acquisition program by 50 young people who are now equipped for self-employment.',
    author: 'Admin',
    category: 'Success Stories',
    date: '2024-11-15',
    image: '/images/blog/youth.jpg',
  },
  {
    id: '3',
    slug: 'women-health-seminar',
    title: 'Women\'s Health Seminar Reaches 200 Participants',
    excerpt: 'Our Women Department organized a comprehensive health seminar focusing on reproductive health and family wellness.',
    author: 'Admin',
    category: 'Programs',
    date: '2024-11-01',
    image: '/images/blog/women.jpg',
  },
  {
    id: '4',
    slug: 'partnership-announcement',
    title: 'New Partnership with Lagos State Government',
    excerpt: 'We are excited to announce a new partnership with the Lagos State Ministry of Youth and Social Development.',
    author: 'Admin',
    category: 'Announcements',
    date: '2024-10-20',
    image: '/images/blog/partnership.jpg',
  },
  {
    id: '5',
    slug: 'donation-drive-success',
    title: 'Donation Drive Exceeds Target',
    excerpt: 'Thanks to our generous donors, we exceeded our fundraising target and will be able to expand our programs.',
    author: 'Admin',
    category: 'Fundraising',
    date: '2024-10-10',
    image: '/images/blog/donation.jpg',
  },
  {
    id: '6',
    slug: 'volunteer-spotlight',
    title: 'Volunteer Spotlight: Meet Our Dedicated Team',
    excerpt: 'Highlighting the incredible volunteers who make our work possible through their dedication and service.',
    author: 'Admin',
    category: 'Community',
    date: '2024-09-25',
    image: '/images/blog/volunteers.jpg',
  },
]

const categories = ['All', 'Events', 'Success Stories', 'Programs', 'Announcements', 'Fundraising', 'Community']

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-medium">Blog & News</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stories of <span className="text-secondary-400">Impact</span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Stay updated with the latest news, success stories, and updates from our 
              programs and community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <span className="text-white/30 text-6xl font-bold">S</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {post.category}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-primary-600 text-white font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 font-medium transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 font-medium transition-colors">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 font-medium transition-colors">
                10
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Get the latest updates, stories, and news delivered directly to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
