"use client"

import { useProfile } from "@/contexts/ProfileContext"
import { ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  const { profile } = useProfile()
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400">
              &copy; {currentYear} {profile?.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-slate-400 text-sm">Crafted with passion and precision</p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
