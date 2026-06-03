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
    <footer className="border-t border-white/5 bg-slate-950 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-sm text-slate-500">
            &copy; {currentYear} {profile?.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500">Crafted with passion &amp; precision</p>
            <motion.button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full border border-white/10 bg-slate-900 p-2 text-brand-400 transition-colors hover:border-brand-400/40 hover:bg-brand-500/10"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
