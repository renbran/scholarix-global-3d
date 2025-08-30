import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, GraduationCap, Users, Calendar, CheckCircle, ArrowRight, Menu, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={`floating-animation ${className}`}
    style={{ animationDelay: `${delay}s` }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
)

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="aurora-glow absolute inset-0 opacity-50" />
    
    <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="globe-pulse w-32 h-32 mx-auto mb-8 bg-primary/20 rounded-full flex items-center justify-center">
          <Globe size={64} className="text-primary" weight="duotone" />
        </div>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl font-bold text-gradient mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Study Abroad
        <br />
        Reimagined
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Premium international education consulting powered by technology and expertise. 
        Your journey to global academic excellence starts here.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground">
          Start Your Journey
          <ArrowRight size={20} className="ml-2" />
        </Button>
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
          Explore Programs
        </Button>
      </motion.div>
    </div>

    <FloatingElement delay={1} className="absolute top-20 left-10 text-primary/30">
      <GraduationCap size={40} />
    </FloatingElement>
    <FloatingElement delay={2} className="absolute top-32 right-20 text-accent/30">
      <Users size={32} />
    </FloatingElement>
    <FloatingElement delay={1.5} className="absolute bottom-32 left-20 text-primary/30">
      <Calendar size={36} />
    </FloatingElement>
  </section>
)

const ServiceCard = ({ icon: Icon, title, description, features, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <Card className="card-hover bg-card/95 backdrop-blur-sm border-border/50 h-full">
      <CardHeader>
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
          <Icon size={32} className="text-primary" weight="duotone" />
        </div>
        <CardTitle className="text-2xl text-card-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm text-card-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const ServicesSection = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Program Matching",
      description: "AI-powered university and program recommendations tailored to your profile",
      features: [
        "Personalized university recommendations",
        "Program compatibility analysis", 
        "Admission probability scoring",
        "Career outcome projections"
      ]
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "One-on-one guidance from certified education consultants",
      features: [
        "Personal education consultant",
        "Application strategy development",
        "Interview preparation",
        "Ongoing support throughout process"
      ]
    },
    {
      icon: Calendar,
      title: "Timeline Management",
      description: "Comprehensive application timeline and milestone tracking",
      features: [
        "Customized application timeline",
        "Deadline tracking and alerts",
        "Document preparation schedule",
        "Progress monitoring dashboard"
      ]
    }
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Services
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Comprehensive support for every step of your international education journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TimelineStep = ({ number, title, description, isActive = false, delay = 0 }) => (
  <motion.div
    className="flex items-start gap-4"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
      isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted text-muted-foreground'
    }`}>
      {number}
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  </motion.div>
)

const TimelineSection = () => {
  const steps = [
    {
      title: "Profile Assessment",
      description: "Comprehensive evaluation of your academic background, goals, and preferences"
    },
    {
      title: "University Selection", 
      description: "AI-powered matching with universities and programs that fit your profile"
    },
    {
      title: "Application Preparation",
      description: "Guidance on essays, recommendations, and all required documentation"
    },
    {
      title: "Submission & Tracking",
      description: "Application submission with real-time status tracking and updates"
    },
    {
      title: "Visa & Preparation",
      description: "Visa application support and pre-departure preparation assistance"
    }
  ]

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Journey Timeline
          </h2>
          <p className="text-xl text-foreground/70">
            A clear, structured path to your international education goals
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <TimelineStep 
              key={index}
              number={index + 1}
              {...step}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const StatsSection = () => {
  const stats = [
    { label: "Students Placed", value: "5,000+", icon: GraduationCap },
    { label: "University Partners", value: "200+", icon: Globe },
    { label: "Success Rate", value: "95%", icon: CheckCircle },
    { label: "Countries", value: "25+", icon: Users }
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon size={32} className="text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-foreground/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gradient">
            Scholarix
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#process" className="text-foreground/80 hover:text-foreground transition-colors">
              Process
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </a>
            <Button className="btn-glow bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {isOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 border-t border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4 pt-4">
              <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#process" className="text-foreground/80 hover:text-foreground transition-colors">
                Process
              </a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
                About
              </a>
              <Button className="btn-glow bg-primary hover:bg-primary/90 w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <TimelineSection />
      <StatsSection />
    </div>
  )
}

export default App