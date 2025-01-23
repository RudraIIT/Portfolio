"use client"
import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import * as THREE from "three"
import Image from "next/image"
import reactLogo from "@/public/react.svg"
import nextLogo from "@/public/Next.js.svg"
import typeScriptLogo from "@/public/typescript.png"
import nodeJsLogo from "@/public/nodejs.svg"
import redisLogo from "@/public/redis.svg"
import cppLogo from "@/public/python.svg"
import dockerLogo from "@/public/docker.svg"

interface Skill {
  name: string
  color: string
  icon: any
}

const skills = [
  { name: "React", color: "#61DAFB", icon: reactLogo },
  { name: "Next.js", color: "#000000", icon: nextLogo },
  { name: "TypeScript", color: "#3178C6", icon: typeScriptLogo },
  { name: "Node.js", color: "#339933", icon: nodeJsLogo },
  { name: "Redis", color: "#E10098", icon: redisLogo },
  { name: "Python", color: "#FF9900", icon: cppLogo },
  { name: "Docker", color: "#2496ED", icon: dockerLogo },
]

function SkillCard({ skill } : {skill : Skill}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e : any) => {
    if(!ref.current) return;
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-40 w-40 rounded-xl bg-gradient-to-br from-primary to-secondary p-1 shadow-xl"
    >
      <div className="absolute inset-0 bg-background rounded-xl" style={{ transform: "translateZ(-20px)" }} />
      <div
        className="h-full w-full bg-background rounded-xl p-4 flex flex-col items-center justify-center transform-style-3d"
        style={{ transform: "translateZ(20px)" }}
      >
        <Image src={skill.icon || "/placeholder.svg"} alt={skill.name} width={64} height={64} className="mb-2" />
        <h3 className="text-lg font-semibold" style={{ color: skill.color }}>
          {skill.name}
        </h3>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x6d28d9, // Primary color
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.x += 0.0001
      particlesMesh.rotation.y += 0.0001
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

