"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useProfile } from "@/contexts/ProfileContext"
import { Button } from "./ui/button"
import { Download, ChevronDown, Github, Linkedin, Twitter, Globe } from "lucide-react"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"
import { useTheme } from "next-themes"

export default function Hero() {
  const { profile, loading } = useProfile()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDownloadResume = async () => {
    try {
      if (profile) {
        // If we have a direct resume URL, use it
        if (profile.resumeUrl) {
          window.open(profile.resumeUrl, "_blank")
          return
        }

        // Fallback to the API endpoint
        const response = await fetch("/api/resume")
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = profile.resumeName || "resume.pdf"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Error downloading resume:", error)
    }
  }

  if (loading) return null

  const parallaxY = -scrollY * 0.5
  const opacityValue = Math.max(0, 1 - scrollY / 500)

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background elements - different for light/dark modes */}
      <div className="absolute inset-0 z-0">
        {/* Dark mode background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:opacity-100 opacity-0 transition-opacity duration-500"></div>

        {/* Light mode background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:opacity-0 opacity-100 transition-opacity duration-500"></div>

        {/* Dark mode effects */}
        <div className="absolute inset-0 dark:opacity-30 opacity-0 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(76,29,149,0)_70%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),rgba(56,189,248,0)_70%)]"></div>
        </div>

        {/* Light mode effects - colorful bubbles */}
        <div className="absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-500 overflow-hidden">
          <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-pink-200 to-pink-300 opacity-20 blur-3xl"></div>
          <div className="absolute top-[40%] left-[60%] w-[250px] h-[250px] rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-20 blur-3xl"></div>
          <div className="absolute top-[70%] left-[25%] w-[350px] h-[350px] rounded-full bg-gradient-to-r from-purple-200 to-indigo-200 opacity-20 blur-3xl"></div>
        </div>

        {/* Grid overlay for both modes */}
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Content */}
      <div
        className="container mx-auto px-4 z-10 flex flex-col items-center justify-center"
        style={{ transform: `translateY(${parallaxY}px)`, opacity: opacityValue }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-40 h-40 md:w-48 md:h-48 mb-8 rounded-full overflow-hidden border-4 border-sky-400/30 shadow-xl shadow-sky-500/20 dark:border-sky-400/30 dark:shadow-sky-500/20 border-sky-300/50 shadow-sky-300/30"
        >
          <Image
            src={profile?.image || "/placeholder.svg"}
            alt={profile?.name || "Profile"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 160px, 192px"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white dark:text-white text-slate-800 text-center mb-4 font-handwriting italic"
          style={{ fontFamily: "var(--font-name, 'Pacifico, cursive')" }}
        >
          {profile?.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-sky-600 dark:text-sky-400 font-light mb-6 text-center font-handwriting italic"
          style={{ fontFamily: "var(--font-title, 'Poppins, sans-serif')" }}
        >
          <TypeAnimation
            sequence={[
              profile?.title || "Senior Software Engineer",
              1000,
              "UI/UX Specialist",
              1000,
              "Frontend Architect",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-slate-700 dark:text-slate-300 max-w-2xl text-center mb-8"
          style={{ fontFamily: "var(--font-body, 'Inter, sans-serif')" }}
        >
          {profile?.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={handleDownloadResume}
            className="bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-500 dark:hover:bg-sky-600 dark:text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20"
            disabled={!profile?.resumeUrl}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-sky-500/50 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/10 px-6 py-2 rounded-full flex items-center gap-2"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex gap-4 mt-8"
        >
          {profile?.socialLinks?.map((link, index) => (
            <SocialIcon key={index} platform={link.platform} url={link.url} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-slate-500 dark:text-slate-400 text-sm mb-2">Scroll to explore</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        </motion.div>
      </motion.div>
    </div>
  )
}

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  const { theme } = useTheme()

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg"
    >
      <img
        src={`https://cdn.simpleicons.org/${platform.toLowerCase()}/${theme === "dark" ? "white" : "0ea5e9"}`}
        alt={platform}
        className="w-5 h-5"
        onError={(e) => {
          // Fallback to default icons if the CDN fails
          const getDefaultIcon = () => {
            switch (platform.toLowerCase()) {
              case "github":
                return <Github className="w-5 h-5" />
              case "linkedin":
                return <Linkedin className="w-5 h-5" />
              case "twitter":
                return <Twitter className="w-5 h-5" />
              default:
                return <Globe className="w-5 h-5" />
            }
          }

          // Replace the img with the fallback icon
          const parent = e.currentTarget.parentNode as HTMLElement
          if (parent) {
            parent.innerHTML = ""
            const iconElement = document.createElement("div")
            iconElement.innerHTML = getDefaultIcon().toString()
            parent.appendChild(iconElement)
          }
        }}
      />
    </motion.a>
  )
}
