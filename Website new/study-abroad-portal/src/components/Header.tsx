'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, Globe, BookOpen, Users, Calendar, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const countries = [
  { name: 'United States', flag: '🇺🇸', href: '/countries/usa' },
  { name: 'United Kingdom', flag: '🇬🇧', href: '/countries/uk' },
  { name: 'Canada', flag: '🇨🇦', href: '/countries/canada' },
  { name: 'Australia', flag: '🇦🇺', href: '/countries/australia' },
  { name: 'Germany', flag: '🇩🇪', href: '/countries/germany' },
  { name: 'France', flag: '🇫🇷', href: '/countries/france' },
  { name: 'Netherlands', flag: '🇳🇱', href: '/countries/netherlands' },
  { name: 'New Zealand', flag: '🇳🇿', href: '/countries/new-zealand' },
  { name: 'Ireland', flag: '🇮🇪', href: '/countries/ireland' },
]

const exams = [
  { name: 'IELTS', description: 'English proficiency test', href: '/exams/ielts' },
  { name: 'TOEFL', description: 'Test of English as Foreign Language', href: '/exams/toefl' },
  { name: 'GRE', description: 'Graduate Record Examinations', href: '/exams/gre' },
  { name: 'GMAT', description: 'Graduate Management Admission Test', href: '/exams/gmat' },
  { name: 'SAT', description: 'Scholastic Assessment Test', href: '/exams/sat' },
  { name: 'PTE', description: 'Pearson Test of English', href: '/exams/pte' },
  { name: 'Duolingo', description: 'English Test', href: '/exams/duolingo' },
]

const resources = [
  { name: 'University Search', description: 'Find your perfect university', href: '/universities' },
  { name: 'Scholarship Guide', description: 'Funding opportunities', href: '/scholarships' },
  { name: 'SOP Templates', description: 'Statement of Purpose help', href: '/resources/sop' },
  { name: 'LOR Guide', description: 'Letter of Recommendation', href: '/resources/lor' },
  { name: 'Visa Guide', description: 'Student visa information', href: '/resources/visa' },
  { name: 'Cost Calculator', description: 'Study abroad budget planner', href: '/resources/calculator' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null)
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Scholarix</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Countries Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('countries')}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4 mr-1" />
                Countries
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {activeDropdown === 'countries' && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {countries.map((country) => (
                      <Link
                        key={country.name}
                        href={country.href}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-lg mr-2">{country.flag}</span>
                        <span className="text-sm font-medium">{country.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Exams Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('exams')}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Exams
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {activeDropdown === 'exams' && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {exams.map((exam) => (
                      <Link
                        key={exam.name}
                        href={exam.href}
                        className="flex flex-col p-2 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-sm font-medium text-gray-900">{exam.name}</span>
                        <span className="text-xs text-gray-500">{exam.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Resources
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {resources.map((resource) => (
                      <Link
                        key={resource.name}
                        href={resource.href}
                        className="flex flex-col p-2 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-sm font-medium text-gray-900">{resource.name}</span>
                        <span className="text-xs text-gray-500">{resource.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link href="/blog" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Calendar className="h-4 w-4 mr-1" />
              Blog
            </Link>

            <Link href="/events" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Users className="h-4 w-4 mr-1" />
              Events
            </Link>

            <Link href="/about" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link href="/countries" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Countries
              </Link>
              <Link href="/exams" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Exams
              </Link>
              <Link href="/resources" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Resources
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link href="/events" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Events
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                About
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Sign In
                </Link>
                <Link href="/register" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  )
}