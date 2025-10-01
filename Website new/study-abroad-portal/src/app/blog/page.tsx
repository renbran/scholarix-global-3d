import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Tag } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Complete Guide to Study in USA for International Students',
    excerpt: 'Everything you need to know about studying in the United States, from application process to visa requirements.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Study Abroad',
    image: '/api/placeholder/400/250',
    href: '/blog/study-usa-guide'
  },
  {
    id: 2,
    title: 'IELTS vs TOEFL: Which English Test Should You Take?',
    excerpt: 'Comprehensive comparison of IELTS and TOEFL to help you choose the right English proficiency test.',
    author: 'Michael Chen',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Test Prep',
    image: '/api/placeholder/400/250',
    href: '/blog/ielts-vs-toefl'
  },
  {
    id: 3,
    title: 'Top 10 Scholarships for International Students in 2024',
    excerpt: 'Discover the best scholarship opportunities available for international students worldwide.',
    author: 'Emma Davis',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Scholarships',
    image: '/api/placeholder/400/250',
    href: '/blog/top-scholarships-2024'
  },
  {
    id: 4,
    title: 'How to Write a Winning Statement of Purpose',
    excerpt: 'Expert tips and strategies for crafting a compelling SOP that stands out to admissions committees.',
    author: 'Dr. Robert Kim',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Applications',
    image: '/api/placeholder/400/250',
    href: '/blog/writing-sop-guide'
  },
  {
    id: 5,
    title: 'Student Life in UK: What to Expect',
    excerpt: 'Insights into British university culture, accommodation, and social life for international students.',
    author: 'James Wilson',
    date: '2023-12-20',
    readTime: '9 min read',
    category: 'Student Life',
    image: '/api/placeholder/400/250',
    href: '/blog/student-life-uk'
  },
  {
    id: 6,
    title: 'Budget Planning for Study Abroad: Complete Guide',
    excerpt: 'Learn how to plan and manage your finances for studying abroad, including hidden costs and money-saving tips.',
    author: 'Lisa Anderson',
    date: '2023-12-15',
    readTime: '12 min read',
    category: 'Finance',
    image: '/api/placeholder/400/250',
    href: '/blog/budget-planning-guide'
  }
]

const categories = ['All', 'Study Abroad', 'Test Prep', 'Scholarships', 'Applications', 'Student Life', 'Finance']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Study Abroad Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and guides for your international education journey
          </p>
        </div>

        {/* Categories Filter */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className={category === 'All' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-6xl">📚</span>
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Featured
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                  Study Abroad
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Complete Guide to Study in USA for International Students
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Everything you need to know about studying in the United States, from application process to visa requirements, university selection, and life as an international student.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Sarah Johnson</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Jan 15, 2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>8 min read</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Read Full Article
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href={post.href}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Read More
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-6">
              Get the latest study abroad tips, guides, and opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}