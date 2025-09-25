import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, GraduationCap, Users, Calendar, CheckCircle, ArrowRight, List, X, BookOpen, Trophy, Heart, Star } from '@phosphor-icons/react'
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
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
    <div className="aurora-glow absolute inset-0 opacity-30" />
    
    {/* Academic institution background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="grid grid-cols-12 h-full">
        {Array.from({ length: 48 }, (_, i) => (
          <div key={i} className="border-r border-primary/10 last:border-r-0" />
        ))}
      </div>
    </div>
    
    <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="globe-pulse w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
          <GraduationCap size={48} className="text-primary" weight="duotone" />
        </div>
        <Badge className="academic-badge mb-4 px-4 py-2 text-sm font-medium">
          Est. 2010 • Trusted by 5,000+ Students Worldwide
        </Badge>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold academic-heading text-foreground mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Scholarix Global
        <br />
        <span className="text-gradient">Education Community</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Join our thriving community of ambitious learners. As a premier educational institution partner, 
        we guide students through their international academic journey with personalized support, 
        expert mentorship, and proven pathways to success.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Join Our Community
          <ArrowRight size={20} className="ml-2" />
        </Button>
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8">
          Explore Programs
        </Button>
      </motion.div>

      {/* Community trust indicators */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-accent" />
          <span>15+ Years Excellence</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-primary" />
          <span>25+ Countries</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-destructive" />
          <span>98% Satisfaction Rate</span>
        </div>
      </motion.div>
    </div>

    {/* Floating academic elements */}
    <FloatingElement delay={1} className="absolute top-20 left-10 text-primary/20">
      <BookOpen size={32} />
    </FloatingElement>
    <FloatingElement delay={2} className="absolute top-32 right-20 text-accent/20">
      <Trophy size={28} />
    </FloatingElement>
    <FloatingElement delay={1.5} className="absolute bottom-32 left-20 text-primary/20">
      <Star size={30} />
    </FloatingElement>
    <FloatingElement delay={2.5} className="absolute bottom-20 right-10 text-muted-foreground/20">
      <Users size={34} />
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
      icon: BookOpen,
      title: "Academic Pathway Planning",
      description: "Personalized education roadmaps designed by our experienced academic counselors",
      features: [
        "1-on-1 academic consultation",
        "University & program matching", 
        "Career pathway alignment",
        "Academic timeline development"
      ]
    },
    {
      icon: Users,
      title: "Student Community Support",
      description: "Join our vibrant community of current students, alumni, and mentors worldwide",
      features: [
        "Peer mentorship program",
        "Alumni network access",
        "Study groups & workshops",
        "Cultural integration support"
      ]
    },
    {
      icon: Trophy,
      title: "Success Coaching Program",
      description: "Comprehensive coaching to ensure your academic and professional success",
      features: [
        "Interview & presentation skills",
        "Scholarship application guidance",
        "Academic writing support",
        "Professional development workshops"
      ]
    }
  ]

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="academic-badge mb-4 px-4 py-2">
            Our Community Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold academic-heading text-foreground mb-6">
            Join Our Educational Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            More than just consulting - we're a community of learners, mentors, and achievers 
            dedicated to your academic success and personal growth.
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
      title: "Welcome & Orientation",
      description: "Join our community with a comprehensive orientation session and goal-setting workshop"
    },
    {
      title: "Academic Assessment", 
      description: "Work with our counselors to evaluate your academic background and career aspirations"
    },
    {
      title: "Community Matching",
      description: "Connect with mentors, study groups, and university programs that align with your goals"
    },
    {
      title: "Application Journey",
      description: "Navigate the application process with ongoing support from our community and experts"
    },
    {
      title: "Success & Beyond",
      description: "Celebrate achievements and continue growing within our global alumni network"
    }
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="academic-badge mb-4 px-4 py-2">
            Your Academic Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold academic-heading text-foreground mb-6">
            From Aspiration to Achievement
          </h2>
          <p className="text-lg text-muted-foreground">
            A structured pathway designed to support you at every step of your educational journey
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
    { label: "Community Members", value: "5,000+", icon: Users },
    { label: "Partner Universities", value: "200+", icon: BookOpen },
    { label: "Success Stories", value: "4,800+", icon: Trophy },
    { label: "Global Alumni", value: "25+", suffix: "Countries", icon: Globe }
  ]

  return (
    <section className="py-20 px-6 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="academic-badge mb-4 px-4 py-2">
            Community Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold academic-heading text-foreground mb-6">
            Building Success Together
          </h2>
          <p className="text-lg text-muted-foreground">
            Our community's achievements speak to the power of collaborative learning and expert guidance
          </p>
        </motion.div>

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
                <stat.icon size={28} className="text-primary" weight="duotone" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
              {stat.suffix && (
                <div className="text-xs text-muted-foreground/80">
                  {stat.suffix}
                </div>
              )}
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap size={24} className="text-primary-foreground" weight="bold" />
            </div>
            <div className="text-xl font-bold academic-heading text-foreground">
              Scholarix Global
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#programs" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Programs
            </a>
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Community
            </a>
            <a href="#success-stories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Success Stories
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              About
            </a>
            <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground">
              Join Community
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </Button>
        </div>

        {isOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4 pt-4">
              <a href="#programs" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Programs
              </a>
              <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Community
              </a>
              <a href="#success-stories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Success Stories
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                About
              </a>
              <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Join Community
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

const Footer = () => (
  <footer className="bg-muted/50 border-t border-border py-12 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap size={24} className="text-primary-foreground" weight="bold" />
            </div>
            <div className="text-xl font-bold academic-heading text-foreground">
              Scholarix Global
            </div>
          </div>
          <p className="text-muted-foreground mb-4 max-w-md">
            Empowering students worldwide through personalized education consulting and 
            a supportive community dedicated to academic excellence.
          </p>
          <Badge className="academic-badge">
            Accredited Education Consultant • Est. 2010
          </Badge>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-3">Community</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>Student Portal</div>
            <div>Alumni Network</div>
            <div>Mentor Program</div>
            <div>Success Stories</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-3">Support</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>Academic Counseling</div>
            <div>Application Help</div>
            <div>Scholarship Guidance</div>
            <div>Contact Us</div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Scholarix Global Education Community. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <TimelineSection />
      <StatsSection />
      <Footer />
    </div>
  )
}

export default App