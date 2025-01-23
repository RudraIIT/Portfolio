"use client"
import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

const projects: Project[] = [
  {
    id: 1,
    title: "Chat-App",
    description: "A real-time chat application for real-time communication, Redis for message brokering and scalability.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["ReactJs", "NodeJs", "WebSocket", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Code-Craft",
    description: "A sleek and interactive web-based code editor that supports multiple languages and syntax highlighting.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["ReactJs", "WebSocket", "Docker"],
  },
  {
    id: 3,
    title: "Note-Corner",
    description: "This project is a comprehensive productivity web application designed to streamline various tasks and enhance user efficiency.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["NextJs", "Prisma", "PostgresQl", "NextAuth"],
  },
]

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return
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
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-primary to-secondary p-1 shadow-xl"
    >
      <div className="absolute inset-0 bg-background rounded-xl" style={{ transform: "translateZ(-50px)" }} />
      <div
        className="h-full w-full bg-background rounded-xl p-6 flex flex-col justify-between transform-style-3d"
        style={{ transform: "translateZ(50px)" }}
      >
        <div>
          <h3 className="text-2xl font-bold mb-2 text-primary">{project.title}</h3>
          <p className="text-text mb-4">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={`${project.id}-${index}`} className="bg-secondary text-background text-sm rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
