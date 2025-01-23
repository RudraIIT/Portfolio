"use client"
import dynamic from "next/dynamic"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

const DynamicCursor = dynamic(() => import("./components/Cursor"), { ssr: false })
const DynamicProjects = dynamic(() => import("./components/Projects"), { ssr: false })
const DynamicSkills = dynamic(() => import("./components/Skills"), { ssr: false })

export default function Home() {
  return (
    <main className="relative">
      <DynamicCursor />
      <Header />
      <Hero />
      <About />
      <DynamicProjects />
      <DynamicSkills />
      <Contact />
      <Footer />
    </main>
  )
}

