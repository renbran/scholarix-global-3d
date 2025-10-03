import Link from 'next/link'
import { Button } from '@/components/ui/button'

const countries = [
  {
    name: 'United States',
    flag: '🇺🇸',
    description: 'Home to world-renowned universities like Harvard, MIT, and Stanford',
    universities: '4,000+',
    students: '1.1M international',
    href: '/countries/usa',
    image: '/api/placeholder/400/250',
    highlights: ['Top research universities', 'Diverse programs', 'Strong job market']
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Historic institutions like Oxford, Cambridge, and Imperial College',
    universities: '160+',
    students: '500K international',
    href: '/countries/uk',
    image: '/api/placeholder/400/250',
    highlights: ['1-3 year programs', 'Rich history', 'English-speaking']
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    description: 'High-quality education with affordable tuition and immigration opportunities',
    universities: '100+',
    students: '640K international',
    href: '/countries/canada',
    image: '/api/placeholder/400/250',
    highlights: ['Post-study work permits', 'Affordable education', 'Multicultural society']
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    description: 'Excellence in research and innovation with beautiful campuses',
    universities: '40+',
    students: '700K international',
    href: '/countries/australia',
    image: '/api/placeholder/400/250',
    highlights: ['Group of Eight universities', 'Work opportunities', 'Great climate']
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    description: 'No tuition fees at public universities and strong engineering programs',
    universities: '400+',
    students: '400K international',
    href: '/countries/germany',
    image: '/api/placeholder/400/250',
    highlights: ['No tuition fees', 'Strong economy', 'Research excellence']
  },
  {
    name: 'France',
    flag: '🇫🇷',
    description: 'Rich culture, excellent business schools, and affordable education',
    universities: '250+',
    students: '370K international',
    href: '/countries/france',
    image: '/api/placeholder/400/250',
    highlights: ['Business schools', 'Cultural experience', 'EU opportunities']
  }
]

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Study Destinations
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top study abroad destinations and find the perfect country for your academic journey
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <div
              key={country.name}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Country Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl">{country.flag}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{country.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{country.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{country.universities}</div>
                    <div className="text-xs text-gray-500">Universities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{country.students}</div>
                    <div className="text-xs text-gray-500">Int'l Students</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Highlights</h4>
                  <ul className="space-y-1">
                    {country.highlights.map((highlight, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link href={country.href}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Explore {country.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 mb-6">
              Our expert counselors can help you find the perfect study destination based on your goals and preferences.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}