import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, GraduationCap } from '@phosphor-icons/react'

interface UniversityLocation {
  id: number
  name: string
  country: string
  city: string
  lat: number
  lng: number
  programs: number
  students: number
  ranking?: number
}

const universityData: UniversityLocation[] = [
  { id: 1, name: "Harvard University", country: "USA", city: "Cambridge", lat: 42.3744, lng: -71.1169, programs: 150, students: 23000, ranking: 1 },
  { id: 2, name: "University of Oxford", country: "UK", city: "Oxford", lat: 51.7548, lng: -1.2544, programs: 120, students: 24000, ranking: 2 },
  { id: 3, name: "University of Melbourne", country: "Australia", city: "Melbourne", lat: -37.7964, lng: 144.9612, programs: 95, students: 48000, ranking: 14 },
  { id: 4, name: "University of Toronto", country: "Canada", city: "Toronto", lat: 43.6629, lng: -79.3957, programs: 180, students: 97000, ranking: 18 },
  { id: 5, name: "ETH Zurich", country: "Switzerland", city: "Zurich", lat: 47.3769, lng: 8.5417, programs: 85, students: 22000, ranking: 7 },
  { id: 6, name: "National University of Singapore", country: "Singapore", city: "Singapore", lat: 1.2966, lng: 103.7764, programs: 110, students: 38000, ranking: 11 },
  { id: 7, name: "University of Tokyo", country: "Japan", city: "Tokyo", lat: 35.7128, lng: 139.7617, programs: 140, students: 28000, ranking: 23 },
  { id: 8, name: "Sorbonne University", country: "France", city: "Paris", lat: 48.8467, lng: 2.3431, programs: 105, students: 55000, ranking: 44 },
  { id: 9, name: "Technical University of Munich", country: "Germany", city: "Munich", lat: 48.1497, lng: 11.5683, programs: 90, students: 45000, ranking: 37 },
  { id: 10, name: "Peking University", country: "China", city: "Beijing", lat: 39.9990, lng: 116.3069, programs: 130, students: 48000, ranking: 12 }
]

export const InteractiveGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const globeRef = useRef<THREE.Mesh>()
  const markersRef = useRef<THREE.Group>()
  const animationIdRef = useRef<number>()

  const [selectedUniversity, setSelectedUniversity] = useState<UniversityLocation | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000011)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64)

    // Earth texture (using a gradient for now)
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Create earth-like gradient
    const gradient = ctx.createLinearGradient(0, 0, 512, 256)
    gradient.addColorStop(0, '#1e3a8a')
    gradient.addColorStop(0.3, '#1e40af')
    gradient.addColorStop(0.7, '#0ea5e9')
    gradient.addColorStop(1, '#0284c7')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 256)

    // Add some land-like patterns
    ctx.fillStyle = '#065f46'
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 256
      const size = Math.random() * 80 + 20
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    const texture = new THREE.CanvasTexture(canvas)

    const globeMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    })

    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)
    globeRef.current = globe

    // Add atmosphere effect
    const atmosphereGeometry = new THREE.SphereGeometry(1.03, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    })

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Create markers group
    const markersGroup = new THREE.Group()
    scene.add(markersGroup)
    markersRef.current = markersGroup

    // Add university markers
    universityData.forEach((university) => {
      const phi = (90 - university.lat) * Math.PI / 180
      const theta = (university.lng + 180) * Math.PI / 180

      const x = -(Math.sin(phi) * Math.cos(theta))
      const y = Math.cos(phi)
      const z = Math.sin(phi) * Math.sin(theta)

      // Create marker
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16)
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: university.ranking && university.ranking <= 10 ? 0xff6b35 : 0x3b82f6,
        transparent: true
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)

      marker.position.set(x * 1.02, y * 1.02, z * 1.02)
      marker.userData = { university }

      // Add pulsing animation
      const pulseGeometry = new THREE.RingGeometry(0.02, 0.04, 16)
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: university.ranking && university.ranking <= 10 ? 0xff6b35 : 0x3b82f6,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      })
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
      pulse.lookAt(camera.position)
      pulse.position.copy(marker.position)

      markersGroup.add(marker)
      markersGroup.add(pulse)
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Stars background
    const starsGeometry = new THREE.BufferGeometry()
    const starsVertices = []
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      starsVertices.push(x, y, z)
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(markersGroup.children.filter(child => child.userData.university))

      if (intersects.length > 0) {
        const university = intersects[0].object.userData.university
        setSelectedUniversity(university)
      } else {
        setSelectedUniversity(null)
      }
    }

    renderer.domElement.addEventListener('click', onMouseClick)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (globe) {
        globe.rotation.y += 0.002
      }

      // Animate pulse effects
      markersGroup.children.forEach((child, index) => {
        if (index % 2 === 1) { // Pulse rings
          const scale = 1 + Math.sin(Date.now() * 0.005 + index) * 0.3
          child.scale.set(scale, scale, 1)
          const material = child.material as THREE.MeshBasicMaterial
          material.opacity = 0.3 + Math.sin(Date.now() * 0.005 + index) * 0.2
        }
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
  }, [])

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 px-4 py-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
            Global University Network
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore World-Class Universities
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Discover top-ranked universities across the globe. Click on any location to learn more about programs and opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Globe Container */}
          <div className="lg:col-span-2">
            <motion.div
              className="relative bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div
                ref={mountRef}
                className="w-full h-[500px] relative"
                style={{ cursor: 'pointer' }}
              />

              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300">Loading Interactive Globe...</p>
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <img src="/scholarix-logo.svg" alt="Scholarix" className="w-4 h-4 mr-2 filter brightness-0 invert" />
                  {universityData.length} Universities
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* University Details Panel */}
          <div className="space-y-6">
            {selectedUniversity ? (
              <motion.div
                key={selectedUniversity.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{selectedUniversity.name}</h3>
                        <div className="flex items-center gap-2 text-slate-300 mb-2">
                          <MapPin size={16} />
                          <span>{selectedUniversity.city}, {selectedUniversity.country}</span>
                        </div>
                      </div>
                      {selectedUniversity.ranking && (
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                          #{selectedUniversity.ranking}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedUniversity.programs}</div>
                        <div className="text-sm text-slate-400">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{selectedUniversity.students.toLocaleString()}</div>
                        <div className="text-sm text-slate-400">Students</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Application Deadline</span>
                        <span className="text-white">Jan 15, 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Acceptance Rate</span>
                        <span className="text-green-400">12-18%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Language Req.</span>
                        <span className="text-white">IELTS 7.0+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="bg-slate-800/30 border-slate-700/50 text-white border-dashed">
                <CardContent className="p-6 text-center">
                  <GraduationCap size={48} className="mx-auto mb-4 text-slate-500" />
                  <h3 className="text-lg font-semibold mb-2">Select a University</h3>
                  <p className="text-slate-400 text-sm">
                    Click on any marker on the globe to view detailed information about universities and their programs.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-blue-500/10 border-blue-500/30 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-400">25+</div>
                  <div className="text-sm text-slate-300">Countries</div>
                </CardContent>
              </Card>
              <Card className="bg-green-500/10 border-green-500/30 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-400">200+</div>
                  <div className="text-sm text-slate-300">Universities</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}