import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Users, Globe, Award, BookOpen, Target } from 'lucide-react'

const exams = [
  {
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    description: 'Most widely accepted English proficiency test for study abroad',
    duration: '2h 45min',
    sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
    scoreRange: '0-9 bands',
    validFor: '2 years',
    countries: ['UK', 'Australia', 'Canada', 'New Zealand'],
    testDates: 'Available year-round',
    fee: '$250',
    href: '/exams/ielts',
    icon: '🎧',
    difficulty: 'Moderate'
  },
  {
    name: 'TOEFL',
    fullName: 'Test of English as a Foreign Language',
    description: 'Preferred English test for US universities and institutions',
    duration: '3 hours',
    sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
    scoreRange: '0-120',
    validFor: '2 years',
    countries: ['USA', 'Canada', 'Japan', 'France'],
    testDates: 'Available year-round',
    fee: '$190',
    href: '/exams/toefl',
    icon: '🇺🇸',
    difficulty: 'Moderate'
  },
  {
    name: 'GRE',
    fullName: 'Graduate Record Examinations',
    description: 'Required for graduate programs in engineering, sciences, and liberal arts',
    duration: '3h 45min',
    sections: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
    scoreRange: '260-340',
    validFor: '5 years',
    countries: ['USA', 'Canada', 'Europe', 'Asia'],
    testDates: 'Available year-round',
    fee: '$220',
    href: '/exams/gre',
    icon: '📊',
    difficulty: 'Hard'
  },
  {
    name: 'GMAT',
    fullName: 'Graduate Management Admission Test',
    description: 'Essential for MBA and business school admissions worldwide',
    duration: '3h 30min',
    sections: ['Analytical Writing', 'Integrated Reasoning', 'Quantitative', 'Verbal'],
    scoreRange: '200-800',
    validFor: '5 years',
    countries: ['USA', 'Europe', 'Asia', 'Australia'],
    testDates: 'Available year-round',
    fee: '$275',
    href: '/exams/gmat',
    icon: '💼',
    difficulty: 'Hard'
  },
  {
    name: 'SAT',
    fullName: 'Scholastic Assessment Test',
    description: 'Standardized test for undergraduate admissions in the US',
    duration: '3 hours',
    sections: ['Evidence-Based Reading', 'Writing', 'Math'],
    scoreRange: '400-1600',
    validFor: '5 years',
    countries: ['USA', 'Canada'],
    testDates: '7 times per year',
    fee: '$60',
    href: '/exams/sat',
    icon: '🎓',
    difficulty: 'Moderate'
  },
  {
    name: 'PTE',
    fullName: 'Pearson Test of English',
    description: 'Computer-based English proficiency test with quick results',
    duration: '3 hours',
    sections: ['Speaking & Writing', 'Reading', 'Listening'],
    scoreRange: '10-90',
    validFor: '2 years',
    countries: ['Australia', 'New Zealand', 'UK', 'Canada'],
    testDates: 'Available year-round',
    fee: '$240',
    href: '/exams/pte',
    icon: '💻',
    difficulty: 'Moderate'
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800'
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-800'
    case 'Hard':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Study Abroad Exams
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to standardized tests required for international education
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {exams.map((exam) => (
            <div
              key={exam.name}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{exam.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exam.name}</h3>
                      <p className="text-sm text-gray-500">{exam.fullName}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{exam.description}</p>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{exam.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{exam.scoreRange}</div>
                      <div className="text-xs text-gray-500">Score Range</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{exam.validFor}</div>
                      <div className="text-xs text-gray-500">Valid For</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{exam.fee}</div>
                      <div className="text-xs text-gray-500">Test Fee</div>
                    </div>
                  </div>
                </div>

                {/* Sections */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Test Sections</h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.sections.map((section, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Accepted Countries</h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.countries.map((country, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex space-x-3">
                  <Link href={exam.href} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Learn More
                    </Button>
                  </Link>
                  <Button variant="outline" className="px-4">
                    Prep Materials
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
              Need Test Preparation Help?
            </h2>
            <p className="text-gray-600 mb-6">
              Get personalized study plans, practice tests, and expert guidance to achieve your target scores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}