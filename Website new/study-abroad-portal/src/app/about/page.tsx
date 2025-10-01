import { Button } from '@/components/ui/button'
import { Users, Award, Globe, Heart, Target, Lightbulb } from 'lucide-react'

const stats = [
  { number: '10,000+', label: 'Students Helped', icon: Users },
  { number: '500+', label: 'Partner Universities', icon: Award },
  { number: '50+', label: 'Countries', icon: Globe },
  { number: '95%', label: 'Success Rate', icon: Target }
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'Former international student with 15+ years in education consulting',
    image: '👩‍💼',
    education: 'Harvard MBA, Oxford BA'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Academic Director',
    bio: 'PhD in Education, former university admissions officer',
    image: '👨‍🏫',
    education: 'Stanford PhD, MIT BS'
  },
  {
    name: 'Emma Davis',
    role: 'Student Success Manager',
    bio: 'Specializes in student support and cultural adaptation',
    image: '👩‍🎓',
    education: 'Cambridge MA, LSE BA'
  },
  {
    name: 'James Wilson',
    role: 'Technology Lead',
    bio: 'Building innovative tools for education accessibility',
    image: '👨‍💻',
    education: 'Carnegie Mellon MS, UC Berkeley BS'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Student-Centered',
    description: 'Every decision we make prioritizes student success and well-being.'
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We measure success by the achievements of our students.'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We celebrate diversity and promote cross-cultural understanding.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously evolve our approach using latest technology and insights.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            About Scholarix
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students worldwide to achieve their dreams of international education
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Scholarix, we believe that quality education should be accessible to everyone, regardless of their background or geographical location. Our mission is to bridge the gap between ambitious students and world-class educational opportunities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We provide comprehensive guidance, personalized support, and innovative tools to help students navigate the complex journey of studying abroad successfully.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="text-8xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 text-center"
            >
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{member.bio}</p>
                <p className="text-xs text-gray-500">{member.education}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Scholarix was founded in 2018 by Sarah Johnson, who experienced firsthand the challenges of studying abroad as an international student. After helping hundreds of friends and colleagues navigate the complex application process, she realized there was a need for comprehensive, personalized guidance.
              </p>
              <p>
                What started as informal mentoring sessions grew into a full-service educational consulting firm. Today, we've helped over 10,000 students achieve their dreams of studying at top universities worldwide.
              </p>
              <p>
                Our approach combines technology with human expertise, providing students with the tools they need while maintaining the personal touch that makes all the difference in their journey.
              </p>
            </div>
          </div>
        </div>

        {/* Recognition Section */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            Recognition & Partnerships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Education Consultant</h3>
              <p className="text-gray-600">Global Education Awards 2023</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Official Partners</h3>
              <p className="text-gray-600">500+ Universities Worldwide</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Student Rating</h3>
              <p className="text-gray-600">4.9/5 Average Rating</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of students who have transformed their futures with our guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Get Free Consultation
              </Button>
              <Button size="lg" variant="outline">
                View Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}