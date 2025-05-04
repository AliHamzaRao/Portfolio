"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className="relative w-14 h-7 rounded-full p-1 overflow-hidden"
      style={{
        backgroundColor: theme === "dark" ? "#0f172a" : "#0ea5e9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background elements */}
      {theme === "light" && (
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute top-3 right-4 w-1 h-1 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-2 right-3 w-1 h-1 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
          />
        </div>
      )}

      {theme === "dark" && (
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1 left-8 w-1 h-1 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute top-3 left-10 w-1 h-1 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-2 left-9 w-1 h-1 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
          />
        </div>
      )}

      {/* Toggle thumb */}
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 0 : 26,
          backgroundColor: theme === "dark" ? "#e2e8f0" : "#fbbf24",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {theme === "dark" ? <Moon className="h-3 w-3 text-slate-900" /> : <Sun className="h-3 w-3 text-amber-900" />}
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
