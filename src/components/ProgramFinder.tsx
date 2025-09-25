import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass as Search, Funnel as Filter, GraduationCap, Clock, CurrencyDollar as DollarSign, Globe, BookOpen, Users, Star, ArrowRight, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useKV } from '@github/spark/hooks'

// Sample program data - in a real app this would come from an API
const programs = [
  {
    id: 1,
    title: "Computer Science & AI",
    university: "MIT",
    country: "United States",
    duration: "4 years",
    tuition: 53450,
    level: "Bachelor's",
    field: "Technology",
    rating: 4.9,
    applicants: 1200,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Cutting-edge program combining computer science fundamentals with artificial intelligence specialization.",
    requirements: ["SAT: 1500+", "GPA: 3.8+", "TOEFL: 100+"],
    highlights: ["AI Research Lab", "Silicon Valley Connections", "99% Job Placement"]
  },
  {
    id: 2,
    title: "International Business",
    university: "London School of Economics",
    country: "United Kingdom",
    duration: "3 years",
    tuition: 25000,
    level: "Bachelor's",
    field: "Business",
    rating: 4.7,
    applicants: 850,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Comprehensive business program with global perspective and industry partnerships.",
    requirements: ["A-Levels: AAB", "IELTS: 7.0+", "Personal Statement"],
    highlights: ["London Financial District", "Exchange Programs", "Internship Guarantee"]
  },
  {
    id: 3,
    title: "Mechanical Engineering",
    university: "ETH Zurich",
    country: "Switzerland",
    duration: "3 years",
    tuition: 1500,
    level: "Bachelor's",
    field: "Engineering",
    rating: 4.8,
    applicants: 600,
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "World-renowned engineering program with focus on innovation and sustainability.",
    requirements: ["Matura: 5.5+", "German: C1", "Math Excellence"],
    highlights: ["Research Excellence", "Industry Partnerships", "Low Tuition"]
  },
  {
    id: 4,
    title: "Medicine",
    university: "University of Melbourne",
    country: "Australia",
    duration: "6 years",
    tuition: 45000,
    level: "Bachelor's",
    field: "Medicine",
    rating: 4.6,
    applicants: 2000,
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Comprehensive medical program with clinical training at leading hospitals.",
    requirements: ["ATAR: 99+", "UCAT", "Interview"],
    highlights: ["Clinical Excellence", "Research Opportunities", "Global Recognition"]
  },
  {
    id: 5,
    title: "Data Science",
    university: "University of Toronto",
    country: "Canada",
    duration: "2 years",
    tuition: 28000,
    level: "Master's",
    field: "Technology",
    rating: 4.5,
    applicants: 900,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Advanced data science program with machine learning and big data focus.",
    requirements: ["Bachelor's Degree", "GRE: 320+", "Python Proficiency"],
    highlights: ["Industry Projects", "Co-op Program", "Tech Hub Location"]
  },
  {
    id: 6,
    title: "International Relations",
    university: "Sciences Po",
    country: "France",
    duration: "3 years",
    tuition: 15000,
    level: "Bachelor's",
    field: "Social Sciences",
    rating: 4.4,
    applicants: 750,
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Prestigious program in international affairs with diplomatic focus.",
    requirements: ["Baccalauréat", "French: B2+", "Essay"],
    highlights: ["Diplomatic Corps", "UN Partnerships", "Paris Location"]
  }
]

const ProgramCard = ({ program, onSelect }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="group"
  >
    <Card className="card-hover h-full overflow-hidden cursor-pointer" onClick={() => onSelect(program)}>
      <div className="h-48 relative overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${program.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge className="academic-badge text-xs font-medium">
            {program.level}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star size={12} className="text-accent fill-current" />
            <span className="text-xs font-medium">{program.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Badge variant="secondary" className="text-xs mb-2">
            {program.field}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {program.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-muted-foreground">
          <GraduationCap size={14} />
          {program.university}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe size={14} />
            {program.country}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={14} />
            {program.duration}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign size={14} />
            ${program.tuition.toLocaleString()}/year
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users size={14} />
            {program.applicants} applicants
          </div>
        </div>
        
        <p className="text-sm text-card-foreground/80 line-clamp-2 mb-4">
          {program.description}
        </p>
        
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          View Details
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
)

const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  if (!program) return null
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-card rounded-2xl shadow-2xl z-50 overflow-auto"
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10"
                onClick={onClose}
              >
                <X size={20} />
              </Button>
              
              <div className="h-64 relative overflow-hidden rounded-t-2xl">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge className="academic-badge mb-2">
                    {program.level} • {program.field}
                  </Badge>
                  <h2 className="text-3xl font-bold academic-heading text-foreground mb-1">
                    {program.title}
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <GraduationCap size={16} />
                    {program.university} • {program.country}
                  </p>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold academic-heading mb-4">Program Overview</h3>
                    <p className="text-card-foreground/80 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{program.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Tuition:</span>
                        <span className="font-medium">${program.tuition.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-accent fill-current" />
                          <span className="font-medium">{program.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Applications:</span>
                        <span className="font-medium">{program.applicants} this year</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold academic-heading mb-4">Requirements</h3>
                    <div className="space-y-2 mb-6">
                      {program.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-sm text-card-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold academic-heading mb-4">Program Highlights</h3>
                    <div className="space-y-2">
                      {program.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="mr-2 mb-2">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                    Apply Now
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const ProgramFinder = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedField, setSelectedField] = useState('all')
  const [tuitionRange, setTuitionRange] = useState([0, 60000])
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedPrograms, setSavedPrograms] = useKV<number[]>('saved-programs', [])

  // Get unique values for filters
  const countries = [...new Set(programs.map(p => p.country))].sort()
  const levels = [...new Set(programs.map(p => p.level))].sort()
  const fields = [...new Set(programs.map(p => p.field))].sort()

  // Filter programs based on criteria
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = selectedCountry === 'all' || program.country === selectedCountry
      const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel
      const matchesField = selectedField === 'all' || program.field === selectedField
      const matchesTuition = program.tuition >= tuitionRange[0] && program.tuition <= tuitionRange[1]
      
      return matchesSearch && matchesCountry && matchesLevel && matchesField && matchesTuition
    })
  }, [searchTerm, selectedCountry, selectedLevel, selectedField, tuitionRange])

  const handleProgramSelect = (program) => {
    setSelectedProgram(program)
    setIsModalOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCountry('all')
    setSelectedLevel('all')
    setSelectedField('all')
    setTuitionRange([0, 60000])
  }

  return (
    <section id="program-finder" className="py-20 px-6 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)'
        }}
      />
      <div className="absolute inset-0 bg-background/95" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="academic-badge mb-4 px-4 py-2">
            Find Your Perfect Program
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold academic-heading text-foreground mb-6">
            Interactive Program Finder
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect academic program tailored to your goals, preferences, and budget
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-border/50 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search programs, universities, or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                {fields.map(field => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Filter size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Tuition Range Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-card-foreground">
                Annual Tuition Range
              </label>
              <span className="text-sm text-muted-foreground">
                ${tuitionRange[0].toLocaleString()} - ${tuitionRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              value={tuitionRange}
              onValueChange={setTuitionRange}
              max={60000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold text-foreground">
              {filteredPrograms.length} Programs Found
            </h3>
            {filteredPrograms.length > 0 && (
              <Badge variant="secondary">
                {Math.round((filteredPrograms.length / programs.length) * 100)}% match
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              {(savedPrograms || []).length} saved programs
            </span>
          </div>
        </motion.div>

        {/* Program Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={handleProgramSelect}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredPrograms.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No programs match your criteria
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more programs
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredPrograms.length > 0 && (
          <motion.div
            className="text-center mt-12 bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold academic-heading text-foreground mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our expert counselors can help you navigate these options and find the perfect program for your goals.
            </p>
            <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground">
              Book Free Consultation
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}