import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Users, BookOpen, Award, Star, DollarSign } from 'lucide-react'

const universities = [
  {
    name: 'Harvard University',
    country: 'United States',
    flag: '🇺🇸',
    location: 'Cambridge, Massachusetts',
    rank: '#1',
    founded: '1636',
    students: '23,000',
    acceptance: '3.4%',
    tuition: '$57,246/year',
    programs: ['Medicine', 'Law', 'Business', 'Engineering'],
    description: 'One of the most prestigious universities in the world, known for academic excellence and research.',
    rating: 4.9,
    href: '/universities/harvard',
    type: 'Private'
  },
  {
    name: 'University of Oxford',
    country: 'United Kingdom',
    flag: '🇬🇧',
    location: 'Oxford, England',
    rank: '#2',
    founded: '1096',
    students: '24,000',
    acceptance: '17.5%',
    tuition: '£28,370/year',
    programs: ['Philosophy', 'Medicine', 'Law', 'History'],
    description: 'Historic institution with collegiate system and world-renowned academic programs.',
    rating: 4.8,
    href: '/universities/oxford',
    type: 'Public'
  },
  {
    name: 'Stanford University',
    country: 'United States',
    flag: '🇺🇸',
    location: 'Stanford, California',
    rank: '#3',
    founded: '1885',
    students: '17,000',
    acceptance: '4.3%',
    tuition: '$56,169/year',
    programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
    description: 'Leading university in technology and innovation, located in Silicon Valley.',
    rating: 4.9,
    href: '/universities/stanford',
    type: 'Private'
  },
  {
    name: 'University of Cambridge',
    country: 'United Kingdom',
    flag: '🇬🇧',
    location: 'Cambridge, England',
    rank: '#4',
    founded: '1209',
    students: '25,000',
    acceptance: '21%',
    tuition: '£25,734/year',
    programs: ['Mathematics', 'Physics', 'Engineering', 'Natural Sciences'],
    description: 'Collegiate university known for mathematics, sciences, and academic tradition.',
    rating: 4.8,
    href: '/universities/cambridge',
    type: 'Public'
  },
  {
    name: 'MIT',
    country: 'United States',
    flag: '🇺🇸',
    location: 'Cambridge, Massachusetts',
    rank: '#5',
    founded: '1861',
    students: '11,500',
    acceptance: '6.7%',
    tuition: '$57,986/year',
    programs: ['Engineering', 'Computer Science', 'Physics', 'Economics'],
    description: 'World leader in science, technology, engineering, and mathematics education.',
    rating: 4.9,
    href: '/universities/mit',
    type: 'Private'
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    location: 'Toronto, Ontario',
    rank: '#18',
    founded: '1827',
    students: '97,000',
    acceptance: '43%',
    tuition: 'CAD $61,690/year',
    programs: ['Medicine', 'Engineering', 'Business', 'Arts & Sciences'],
    description: 'Top Canadian university with strong research programs and diverse student body.',
    rating: 4.6,
    href: '/universities/toronto',
    type: 'Public'
  }
]

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Top Universities
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover world-renowned institutions and find your perfect academic match
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Universities</label>
              <input
                type="text"
                placeholder="University name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Countries</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Programs</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Medicine</option>
                <option>Computer Science</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {universities.map((university) => (
            <div
              key={university.name}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{university.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{university.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{university.rank}</div>
                    <div className="text-xs text-gray-500">World Rank</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(university.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{university.rating}</span>
                  <span className="text-sm text-gray-500">({university.type})</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{university.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{university.students}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{university.acceptance}</div>
                      <div className="text-xs text-gray-500">Acceptance</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Est. {university.founded}</div>
                      <div className="text-xs text-gray-500">Founded</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{university.tuition}</div>
                      <div className="text-xs text-gray-500">Tuition</div>
                    </div>
                  </div>
                </div>

                {/* Programs */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Popular Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {university.programs.map((program, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex space-x-3">
                  <Link href={university.href} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" className="px-4">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 mb-6">
              Our university matching service helps you find the perfect fit based on your academic profile and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                University Matching
              </Button>
              <Button size="lg" variant="outline">
                Talk to Counselor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}