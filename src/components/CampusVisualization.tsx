import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Buildings, Users, BookOpen, Trophy, Eye, RotateCcw } from '@phosphor-icons/react'

interface Campus {
  id: number
  name: string
  university: string
  country: string
  buildings: BuildingData[]
  students: number
  facilities: string[]
}

interface BuildingData {
  id: number
  name: string
  type: 'academic' | 'dormitory' | 'library' | 'sports' | 'dining'
  height: number
  width: number
  depth: number
  x: number
  z: number
  color: string
}

const campusData: Campus[] = [
  {
    id: 1,
    name: "Harvard Yard",
    university: "Harvard University",
    country: "USA",
    students: 23000,
    facilities: ["Library", "Research Labs", "Student Center", "Sports Complex"],
    buildings: [
      { id: 1, name: "Widener Library", type: "library", height: 0.8, width: 1.2, depth: 0.8, x: 0, z: 0, color: "#8B4513" },
      { id: 2, name: "Science Center", type: "academic", height: 1.0, width: 1.0, depth: 1.0, x: -2, z: -1, color: "#4A90E2" },
      { id: 3, name: "Student Dormitory A", type: "dormitory", height: 1.2, width: 0.6, depth: 0.8, x: 2, z: -2, color: "#E94B3C" },
      { id: 4, name: "Student Dormitory B", type: "dormitory", height: 1.2, width: 0.6, depth: 0.8, x: 2.8, z: -2, color: "#E94B3C" },
      { id: 5, name: "Athletics Center", type: "sports", height: 0.6, width: 1.5, depth: 1.0, x: -2, z: 2, color: "#50C878" },
      { id: 6, name: "Dining Hall", type: "dining", height: 0.5, width: 1.0, depth: 0.6, x: 1, z: 2, color: "#FFA500" }
    ]
  },
  {
    id: 2,
    name: "Oxford Campus",
    university: "University of Oxford",
    country: "UK",
    students: 24000,
    facilities: ["Historic Libraries", "Research Centers", "Colleges", "Botanical Gardens"],
    buildings: [
      { id: 1, name: "Bodleian Library", type: "library", height: 1.0, width: 0.8, depth: 1.0, x: 0, z: 0, color: "#8B4513" },
      { id: 2, name: "Christ Church", type: "academic", height: 1.3, width: 1.0, depth: 0.8, x: -2.5, z: -1, color: "#D2691E" },
      { id: 3, name: "All Souls College", type: "academic", height: 0.9, width: 0.8, depth: 0.6, x: 2, z: -1, color: "#D2691E" },
      { id: 4, name: "Student Quarters", type: "dormitory", height: 0.8, width: 0.5, depth: 0.7, x: -1.5, z: 2, color: "#B22222" },
      { id: 5, name: "Science Labs", type: "academic", height: 1.1, width: 1.2, depth: 0.9, x: 1.5, z: 1.5, color: "#4682B4" },
      { id: 6, name: "Great Hall", type: "dining", height: 0.7, width: 1.3, depth: 0.8, x: 0, z: -2.5, color: "#DAA520" }
    ]
  },
  {
    id: 3,
    name: "Melbourne Campus",
    university: "University of Melbourne",
    country: "Australia",
    students: 48000,
    facilities: ["Modern Labs", "Innovation Hub", "Student Villages", "Recreation Center"],
    buildings: [
      { id: 1, name: "Baillieu Library", type: "library", height: 1.2, width: 1.0, depth: 0.8, x: 0, z: 0, color: "#8B4513" },
      { id: 2, name: "Engineering Block", type: "academic", height: 1.5, width: 1.2, depth: 1.0, x: -2, z: -1.5, color: "#2E8B57" },
      { id: 3, name: "Business School", type: "academic", height: 1.1, width: 1.0, depth: 0.9, x: 2, z: -1, color: "#4A90E2" },
      { id: 4, name: "Student Village", type: "dormitory", height: 1.0, width: 0.8, depth: 0.6, x: -2.5, z: 2, color: "#FF6347" },
      { id: 5, name: "Sports Complex", type: "sports", height: 0.8, width: 1.8, depth: 1.2, x: 2, z: 2, color: "#32CD32" },
      { id: 6, name: "Union House", type: "dining", height: 0.6, width: 1.1, depth: 0.7, x: 0.5, z: 3, color: "#FF8C00" }
    ]
  }
]

export const CampusVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const animationIdRef = useRef<number>()
  const buildingsRef = useRef<THREE.Group>()

  const [selectedCampus, setSelectedCampus] = useState<Campus>(campusData[0])
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  const getBuildingIcon = (type: BuildingData['type']) => {
    switch (type) {
      case 'library': return BookOpen
      case 'academic': return Buildings
      case 'dormitory': return Users
      case 'sports': return Trophy
      case 'dining': return Users
      default: return Buildings
    }
  }

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f8ff)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    )
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    scene.add(directionalLight)

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(10, 10)
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: 0x90EE90,
      transparent: true,
      opacity: 0.8
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 20, 0x000000, 0x000000)
    gridHelper.material.opacity = 0.1
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // Buildings group
    const buildingsGroup = new THREE.Group()
    scene.add(buildingsGroup)
    buildingsRef.current = buildingsGroup

    // Mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(buildingsGroup.children, true)

      if (intersects.length > 0) {
        const buildingMesh = intersects[0].object.parent
        if (buildingMesh && buildingMesh.userData.building) {
          setSelectedBuilding(buildingMesh.userData.building)
        }
      } else {
        setSelectedBuilding(null)
      }
    }

    renderer.domElement.addEventListener('click', onMouseClick)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (autoRotate && buildingsGroup) {
        buildingsGroup.rotation.y += 0.003
      }

      // Animate buildings with hover effect
      buildingsGroup.children.forEach((buildingGroup) => {
        const building = buildingGroup as THREE.Group
        if (building.userData.building) {
          const isSelected = selectedBuilding && building.userData.building.id === selectedBuilding.id
          const targetScale = isSelected ? 1.1 : 1.0
          building.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
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
  }, [autoRotate, selectedBuilding])

  // Load campus buildings
  useEffect(() => {
    if (!buildingsRef.current) return

    // Clear existing buildings
    while (buildingsRef.current.children.length > 0) {
      buildingsRef.current.remove(buildingsRef.current.children[0])
    }

    // Add new buildings
    selectedCampus.buildings.forEach((building) => {
      const buildingGroup = new THREE.Group()
      buildingGroup.userData = { building }

      // Main building geometry
      const geometry = new THREE.BoxGeometry(building.width, building.height, building.depth)
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(building.color),
        transparent: true,
        opacity: 0.9
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.y = building.height / 2
      mesh.castShadow = true
      mesh.receiveShadow = true

      // Add some architectural details
      if (building.type === 'library') {
        // Add columns
        for (let i = 0; i < 3; i++) {
          const columnGeometry = new THREE.CylinderGeometry(0.05, 0.05, building.height)
          const columnMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f5dc })
          const column = new THREE.Mesh(columnGeometry, columnMaterial)
          column.position.set(
            (i - 1) * building.width * 0.3,
            building.height / 2,
            building.depth / 2 + 0.1
          )
          buildingGroup.add(column)
        }
      }

      if (building.type === 'academic') {
        // Add roof details
        const roofGeometry = new THREE.ConeGeometry(building.width * 0.6, 0.3, 4)
        const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
        const roof = new THREE.Mesh(roofGeometry, roofMaterial)
        roof.position.y = building.height + 0.15
        roof.rotation.y = Math.PI / 4
        buildingGroup.add(roof)
      }

      buildingGroup.add(mesh)
      buildingGroup.position.set(building.x, 0, building.z)

      buildingsRef.current?.add(buildingGroup)
    })
  }, [selectedCampus])

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-600 border-blue-200">
            Campus Exploration
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Explore Campus Life in 3D
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Take a virtual tour of world-renowned university campuses. Click on buildings to learn more about facilities and student life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Campus Selection Panel */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Campus</h3>
            {campusData.map((campus) => (
              <motion.div
                key={campus.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedCampus.id === campus.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCampus(campus)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{campus.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {campus.university}, {campus.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users size={16} />
                      <span>{campus.students.toLocaleString()} students</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Controls */}
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRotate(!autoRotate)}
                className="w-full"
              >
                <RotateCcw size={16} className="mr-2" />
                {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
              </Button>
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <motion.div
              className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
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
                <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Campus Model...</p>
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-700 border-gray-200">
                  <Eye size={16} className="mr-2" />
                  Click buildings to explore
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4">
                <Badge className="bg-blue-500 text-white">
                  <Buildings size={16} className="mr-2" />
                  {selectedCampus.buildings.length} Buildings
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Building Details Panel */}
          <div className="space-y-6">
            {selectedBuilding ? (
              <motion.div
                key={selectedBuilding.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = getBuildingIcon(selectedBuilding.type)
                        return <Icon size={24} className="text-blue-500" />
                      })()}
                      <div>
                        <CardTitle className="text-lg">{selectedBuilding.name}</CardTitle>
                        <CardDescription className="capitalize">
                          {selectedBuilding.type} Building
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Building Type</span>
                        <span className="capitalize font-medium">{selectedBuilding.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Floors</span>
                        <span className="font-medium">{Math.ceil(selectedBuilding.height * 3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capacity</span>
                        <span className="font-medium">
                          {selectedBuilding.type === 'library' ? '2,000 seats' :
                           selectedBuilding.type === 'dormitory' ? '400 students' :
                           selectedBuilding.type === 'sports' ? '5,000 people' :
                           selectedBuilding.type === 'dining' ? '800 diners' :
                           '1,500 students'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="bg-gray-50 border-gray-200 border-dashed">
                <CardContent className="p-6 text-center">
                  <Buildings size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Select a Building</h3>
                  <p className="text-gray-500 text-sm">
                    Click on any building in the 3D model to view detailed information about facilities and features.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Campus Facilities */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Campus Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCampus.facilities.map((facility, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs justify-center py-1"
                    >
                      {facility}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}