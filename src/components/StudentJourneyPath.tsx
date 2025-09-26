import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlayCircle, PauseCircle, RotateCcw } from '@phosphor-icons/react'

interface PathStep {
  id: number
  title: string
  description: string
  position: { x: number, y: number, z: number }
  icon: string
  color: string
  duration: number
}

const journeySteps: PathStep[] = [
  {
    id: 1,
    title: "Discovery & Assessment",
    description: "Explore your interests, evaluate academic background, and set initial goals",
    position: { x: -4, y: 0, z: 0 },
    icon: "🔍",
    color: "#3b82f6",
    duration: 2
  },
  {
    id: 2,
    title: "University Research",
    description: "Research universities, programs, and requirements across different countries",
    position: { x: -2, y: 1.5, z: -1 },
    icon: "🏫",
    color: "#8b5cf6",
    duration: 4
  },
  {
    id: 3,
    title: "Application Preparation",
    description: "Prepare documents, essays, and meet language requirements",
    position: { x: 0, y: 2, z: -2 },
    icon: "📝",
    color: "#10b981",
    duration: 6
  },
  {
    id: 4,
    title: "Application Submission",
    description: "Submit applications to selected universities and programs",
    position: { x: 2, y: 1.5, z: -1 },
    icon: "📤",
    color: "#f59e0b",
    duration: 2
  },
  {
    id: 5,
    title: "Interview & Assessment",
    description: "Participate in interviews, complete additional assessments if required",
    position: { x: 3, y: 0, z: 0 },
    icon: "🎤",
    color: "#ef4444",
    duration: 3
  },
  {
    id: 6,
    title: "Acceptance & Decision",
    description: "Receive offers, compare options, and make your final decision",
    position: { x: 2, y: -1.5, z: 1 },
    icon: "🎉",
    color: "#06b6d4",
    duration: 2
  },
  {
    id: 7,
    title: "Visa & Preparation",
    description: "Apply for visa, arrange accommodation, and prepare for departure",
    position: { x: 0, y: -2, z: 2 },
    icon: "✈️",
    color: "#8b5cf6",
    duration: 4
  },
  {
    id: 8,
    title: "University Life",
    description: "Begin your international education journey and achieve your dreams",
    position: { x: -2, y: -1.5, z: 1 },
    icon: "🎓",
    color: "#f59e0b",
    duration: 36
  }
]

export const StudentJourneyPath: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const pathRef = useRef<THREE.Line>()
  const stepsRef = useRef<THREE.Group>()
  const travelerRef = useRef<THREE.Mesh>()
  const animationIdRef = useRef<number>()

  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0f1c)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(8, 5, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Create the path
    const pathGeometry = new THREE.BufferGeometry()
    const pathPositions = []

    journeySteps.forEach((step, index) => {
      pathPositions.push(step.position.x, step.position.y, step.position.z)

      // Add curve points between steps
      if (index < journeySteps.length - 1) {
        const current = step.position
        const next = journeySteps[index + 1].position

        // Add intermediate points for smooth curve
        for (let i = 1; i <= 5; i++) {
          const t = i / 6
          const curveHeight = Math.sin(t * Math.PI) * 0.5

          pathPositions.push(
            current.x + (next.x - current.x) * t,
            current.y + (next.y - current.y) * t + curveHeight,
            current.z + (next.z - current.z) * t
          )
        }
      }
    })

    pathGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pathPositions, 3))

    const pathMaterial = new THREE.LineBasicMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.8,
      linewidth: 3
    })

    const path = new THREE.Line(pathGeometry, pathMaterial)
    scene.add(path)
    pathRef.current = path

    // Create step markers
    const stepsGroup = new THREE.Group()
    scene.add(stepsGroup)
    stepsRef.current = stepsGroup

    journeySteps.forEach((step, index) => {
      // Step marker
      const markerGeometry = new THREE.SphereGeometry(0.3, 16, 16)
      const markerMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(step.color),
        transparent: true,
        opacity: 0.8,
        shininess: 100
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      marker.position.set(step.position.x, step.position.y, step.position.z)
      marker.userData = { stepIndex: index }

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(0.4, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(step.color),
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.copy(marker.position)

      // Number label
      const labelGeometry = new THREE.RingGeometry(0.35, 0.45, 16)
      const labelMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      })
      const label = new THREE.Mesh(labelGeometry, labelMaterial)
      label.position.copy(marker.position)
      label.position.y += 0.01
      label.lookAt(camera.position)

      stepsGroup.add(marker)
      stepsGroup.add(glow)
      stepsGroup.add(label)
    })

    // Create traveler (animated character)
    const travelerGeometry = new THREE.ConeGeometry(0.15, 0.4, 6)
    const travelerMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b35,
      shininess: 100
    })
    const traveler = new THREE.Mesh(travelerGeometry, travelerMaterial)
    traveler.position.set(journeySteps[0].position.x, journeySteps[0].position.y + 0.5, journeySteps[0].position.z)
    scene.add(traveler)
    travelerRef.current = traveler

    // Particle system for visual effects
    const particleCount = 100
    const particles = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.6)
      particleColors[i * 3] = color.r
      particleColors[i * 3 + 1] = color.g
      particleColors[i * 3 + 2] = color.b
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(stepsGroup.children.filter(child => child.userData.stepIndex !== undefined))

      if (intersects.length > 0) {
        const stepIndex = intersects[0].object.userData.stepIndex
        setCurrentStep(stepIndex)
        setProgress(stepIndex / (journeySteps.length - 1))
      }
    }

    renderer.domElement.addEventListener('click', onMouseClick)

    // Animation loop
    let animationProgress = 0
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Rotate camera around the path
      const radius = 10
      camera.position.x = Math.cos(time * 0.1) * radius
      camera.position.z = Math.sin(time * 0.1) * radius
      camera.lookAt(0, 0, 0)

      // Animate traveler along path if playing
      if (isPlaying && travelerRef.current) {
        animationProgress += 0.01
        if (animationProgress >= 1) {
          animationProgress = 0
          setIsPlaying(false)
        }

        const stepProgress = animationProgress * (journeySteps.length - 1)
        const currentStepIndex = Math.floor(stepProgress)
        const stepT = stepProgress - currentStepIndex

        if (currentStepIndex < journeySteps.length - 1) {
          const current = journeySteps[currentStepIndex].position
          const next = journeySteps[currentStepIndex + 1].position

          travelerRef.current.position.x = current.x + (next.x - current.x) * stepT
          travelerRef.current.position.y = current.y + (next.y - current.y) * stepT + 0.5
          travelerRef.current.position.z = current.z + (next.z - current.z) * stepT

          // Bounce animation
          travelerRef.current.position.y += Math.sin(time * 5) * 0.1

          setCurrentStep(currentStepIndex)
          setProgress(animationProgress)
        }
      }

      // Animate step markers
      stepsGroup.children.forEach((child, index) => {
        if (child.userData.stepIndex !== undefined) {
          const stepIndex = child.userData.stepIndex
          const isActive = stepIndex === currentStep
          const scale = isActive ? 1.2 + Math.sin(time * 3) * 0.1 : 1.0
          child.scale.set(scale, scale, scale)

          // Pulsing effect for active step
          if (isActive && child.material && 'opacity' in child.material) {
            child.material.opacity = 0.8 + Math.sin(time * 4) * 0.2
          }
        }
      })

      // Animate particles
      const positions = particleSystem.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.01
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
      particleSystem.rotation.y += 0.001

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    setIsLoaded(true)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', onMouseClick)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [isPlaying, currentStep])

  const resetJourney = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(false)
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 px-4 py-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
            Interactive Journey Map
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Your Study Abroad Journey in 3D
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Follow the complete pathway from initial discovery to university success. Click on any step to explore details.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50 text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  🎮 Journey Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progress * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${progress * 100}%` }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    {isPlaying ? (
                      <>
                        <PauseCircle size={16} className="mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle size={16} className="mr-2" />
                        Play
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={resetJourney}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Step Details */}
            <Card className="bg-slate-800/50 border-slate-700/50 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">{journeySteps[currentStep]?.icon}</span>
                  Step {currentStep + 1}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {journeySteps[currentStep]?.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-4">
                  {journeySteps[currentStep]?.description}
                </p>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Duration</span>
                  <span>{journeySteps[currentStep]?.duration} months</span>
                </div>
              </CardContent>
            </Card>

            {/* Step List */}
            <Card className="bg-slate-800/50 border-slate-700/50 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Journey Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {journeySteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all ${
                        index === currentStep
                          ? 'bg-blue-600/30 border border-blue-500/50'
                          : 'hover:bg-slate-700/50'
                      }`}
                      onClick={() => {
                        setCurrentStep(index)
                        setProgress(index / (journeySteps.length - 1))
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg">{step.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{step.title}</div>
                        <div className="text-xs text-slate-400">{step.duration} months</div>
                      </div>
                      {index <= currentStep && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-green-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Visualization */}
          <div className="lg:col-span-3">
            <motion.div
              className="relative bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div
                ref={mountRef}
                className="w-full h-[600px] relative"
                style={{ cursor: 'pointer' }}
              />

              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300">Loading Journey Visualization...</p>
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <img src="/scholarix-logo.svg" alt="Scholarix" className="w-4 h-4 mr-2 filter brightness-0 invert" />
                  Interactive 3D Journey Map
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4">
                <Badge className="bg-slate-800/80 text-slate-300 border-slate-600">
                  💡 Click on any step to explore details
                </Badge>
              </div>

              <div className="absolute top-4 right-4">
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">Total Duration</div>
                  <div className="text-lg font-bold text-white">
                    {journeySteps.reduce((total, step) => total + step.duration, 0)} months
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}