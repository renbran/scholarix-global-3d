import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface FloatingElements3DProps {
  className?: string
  particleCount?: number
  theme?: 'academic' | 'space' | 'success'
}

export const FloatingElements3D: React.FC<FloatingElements3DProps> = ({
  className = "",
  particleCount = 50,
  theme = 'academic'
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const animationIdRef = useRef<number>()
  const particlesRef = useRef<THREE.Points[]>([])
  const floatingObjectsRef = useRef<THREE.Group>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles based on theme
    const createParticles = () => {
      const particles = []

      for (let i = 0; i < particleCount; i++) {
        let geometry: THREE.BufferGeometry
        let material: THREE.Material

        switch (theme) {
          case 'academic':
            // Create book, graduation cap, and atom-like particles
            if (i % 3 === 0) {
              // Books
              geometry = new THREE.BoxGeometry(0.1, 0.15, 0.02)
              material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.3, 0.7, 0.6),
                transparent: true,
                opacity: 0.8
              })
            } else if (i % 3 === 1) {
              // Spherical particles (atoms/knowledge)
              geometry = new THREE.SphereGeometry(0.05, 8, 8)
              material = new THREE.MeshBasicMaterial({
                color: 0x4a90e2,
                transparent: true,
                opacity: 0.7
              })
            } else {
              // Geometric shapes (formulas)
              geometry = new THREE.TetrahedronGeometry(0.08)
              material = new THREE.MeshBasicMaterial({
                color: 0x50c878,
                transparent: true,
                opacity: 0.6,
                wireframe: true
              })
            }
            break

          case 'space':
            // Stars and cosmic elements
            geometry = new THREE.SphereGeometry(Math.random() * 0.05 + 0.01, 6, 6)
            material = new THREE.MeshBasicMaterial({
              color: new THREE.Color().setHSL(0.6, 1, 0.5 + Math.random() * 0.5),
              transparent: true,
              opacity: 0.8
            })
            break

          case 'success':
            // Trophies, stars, and achievement symbols
            if (i % 2 === 0) {
              geometry = new THREE.ConeGeometry(0.05, 0.1, 5)
              material = new THREE.MeshBasicMaterial({
                color: 0xffd700,
                transparent: true,
                opacity: 0.8
              })
            } else {
              geometry = new THREE.OctahedronGeometry(0.06)
              material = new THREE.MeshBasicMaterial({
                color: 0xff6b35,
                transparent: true,
                opacity: 0.7
              })
            }
            break

          default:
            geometry = new THREE.SphereGeometry(0.02, 8, 8)
            material = new THREE.MeshBasicMaterial({ color: 0xffffff })
        }

        const particle = new THREE.Mesh(geometry, material)

        // Random position
        particle.position.x = (Math.random() - 0.5) * 10
        particle.position.y = (Math.random() - 0.5) * 10
        particle.position.z = (Math.random() - 0.5) * 10

        // Random rotation
        particle.rotation.x = Math.random() * Math.PI * 2
        particle.rotation.y = Math.random() * Math.PI * 2
        particle.rotation.z = Math.random() * Math.PI * 2

        // Store initial position for oscillation
        particle.userData = {
          initialX: particle.position.x,
          initialY: particle.position.y,
          initialZ: particle.position.z,
          oscillationSpeedX: Math.random() * 0.02 + 0.01,
          oscillationSpeedY: Math.random() * 0.02 + 0.01,
          oscillationSpeedZ: Math.random() * 0.02 + 0.01,
          rotationSpeedX: Math.random() * 0.02 + 0.005,
          rotationSpeedY: Math.random() * 0.02 + 0.005,
          rotationSpeedZ: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2
        }

        particles.push(particle)
        scene.add(particle)
      }

      return particles
    }

    const particles = createParticles()

    // Create floating objects group
    const floatingObjectsGroup = new THREE.Group()
    scene.add(floatingObjectsGroup)
    floatingObjectsRef.current = floatingObjectsGroup

    // Add some larger floating objects based on theme
    const createFloatingObjects = () => {
      switch (theme) {
        case 'academic':
          // Create a large book
          const bookGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1)
          const bookMaterial = new THREE.MeshBasicMaterial({
            color: 0x8b4513,
            transparent: true,
            opacity: 0.3
          })
          const book = new THREE.Mesh(bookGeometry, bookMaterial)
          book.position.set(-2, 1, -1)
          book.userData = { rotationSpeed: 0.01, oscillationSpeed: 0.005 }
          floatingObjectsGroup.add(book)

          // Create a graduation cap
          const capGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 8)
          const capMaterial = new THREE.MeshBasicMaterial({
            color: 0x000080,
            transparent: true,
            opacity: 0.4
          })
          const cap = new THREE.Mesh(capGeometry, capMaterial)
          cap.position.set(2, -1, 0)
          cap.userData = { rotationSpeed: -0.008, oscillationSpeed: 0.007 }
          floatingObjectsGroup.add(cap)
          break

        case 'space':
          // Create orbiting rings
          const ringGeometry = new THREE.RingGeometry(0.5, 0.7, 16)
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a90e2,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
          })
          const ring = new THREE.Mesh(ringGeometry, ringMaterial)
          ring.position.set(0, 0, -2)
          ring.userData = { rotationSpeed: 0.02, oscillationSpeed: 0.01 }
          floatingObjectsGroup.add(ring)
          break

        case 'success':
          // Create a trophy-like structure
          const trophyGeometry = new THREE.ConeGeometry(0.3, 0.6, 8)
          const trophyMaterial = new THREE.MeshBasicMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.4
          })
          const trophy = new THREE.Mesh(trophyGeometry, trophyMaterial)
          trophy.position.set(1.5, 0.5, -1)
          trophy.userData = { rotationSpeed: 0.015, oscillationSpeed: 0.008 }
          floatingObjectsGroup.add(trophy)
          break
      }
    }

    createFloatingObjects()

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Animate particles
      particles.forEach((particle) => {
        const userData = particle.userData

        // Floating motion
        particle.position.x = userData.initialX + Math.sin(time * userData.oscillationSpeedX + userData.phase) * 0.5
        particle.position.y = userData.initialY + Math.cos(time * userData.oscillationSpeedY + userData.phase) * 0.3
        particle.position.z = userData.initialZ + Math.sin(time * userData.oscillationSpeedZ + userData.phase) * 0.4

        // Rotation
        particle.rotation.x += userData.rotationSpeedX
        particle.rotation.y += userData.rotationSpeedY
        particle.rotation.z += userData.rotationSpeedZ

        // Pulsing opacity
        const baseMaterial = particle.material as THREE.MeshBasicMaterial
        baseMaterial.opacity = 0.6 + Math.sin(time * 2 + userData.phase) * 0.2
      })

      // Animate floating objects
      floatingObjectsGroup.children.forEach((obj) => {
        const userData = obj.userData
        obj.rotation.y += userData.rotationSpeed
        obj.position.y += Math.sin(time * userData.oscillationSpeed) * 0.002
      })

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

    return () => {
      window.removeEventListener('resize', handleResize)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      particles.forEach(particle => {
        scene.remove(particle)
        particle.geometry.dispose()
        if (Array.isArray(particle.material)) {
          particle.material.forEach(mat => mat.dispose())
        } else {
          particle.material.dispose()
        }
      })

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [particleCount, theme])

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}

// Enhanced Hero Section with 3D elements
export const Enhanced3DHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* 3D Floating Elements Background */}
      <FloatingElements3D theme="academic" particleCount={80} className="opacity-60" />

      {/* Original content with enhanced styling */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            {/* Animated Scholarix logo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
              }}
            >
              <motion.img
                src="/scholarix-logo.svg"
                alt="Scholarix Study Abroad"
                className="w-20 h-20 object-contain filter brightness-0 invert"
                animate={{ rotateZ: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Orbital rings */}
            <motion.div
              className="absolute inset-0 border-2 border-blue-300/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ transform: 'rotateX(60deg)' }}
            />
            <motion.div
              className="absolute inset-2 border border-purple-300/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transform: 'rotateX(60deg) rotateY(30deg)' }}
            />
          </div>

          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white/90 text-sm font-medium"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            Est. 2010 • Trusted by 5,000+ Students Worldwide
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Scholarix Study Abroad
          </span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          >
            Education Community
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Join our thriving community of ambitious learners. Experience education in a whole new dimension
          with our cutting-edge 3D visualization tools and immersive campus exploration.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.button
            className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 flex items-center gap-2">
              🚀 Explore in 3D
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            className="px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            📞 Book Free Consultation
          </motion.button>
        </motion.div>

        {/* Enhanced trust indicators with 3D effect */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 text-center text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {[
            { icon: '🏆', text: '15+ Years Excellence' },
            { icon: '🌍', text: '25+ Countries' },
            { icon: '💖', text: '98% Satisfaction' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                className="text-lg"
              >
                {item.icon}
              </motion.span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Additional floating elements in corners */}
      <motion.div
        className="absolute top-10 left-10 text-4xl opacity-30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        📚
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 text-3xl opacity-30"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        🎯
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 text-3xl opacity-30"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-16 text-4xl opacity-30"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
      >
        👥
      </motion.div>
    </section>
  )
}