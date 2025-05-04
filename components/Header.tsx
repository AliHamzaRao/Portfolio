"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { useProfile } from "@/contexts/ProfileContext"
import Link from "next/link"
import { ThemeToggle } from "./ui/theme-toggle"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { profile } = useProfile()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  if (!mounted) return null

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3"
            : "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-r ${
                theme === "dark"
                  ? "from-sky-400 to-blue-500 text-transparent"
                  : "from-sky-600 to-blue-700 text-transparent"
              } bg-clip-text`}
              style={{ fontFamily: "var(--font-body, 'Inter, sans-serif')" }}
            >
              {profile?.name || "Portfolio"}
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavItems closeMenu={closeMenu} />
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <div className="mr-4">
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={`${theme === "dark" ? "text-white hover:bg-slate-800" : "text-slate-800 hover:bg-slate-100"}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${theme === "dark" ? "bg-slate-900 border-t border-slate-800" : "bg-white border-t border-slate-200"} mt-2`}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <NavItems closeMenu={closeMenu} isMobile />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const NavItems = ({ closeMenu, isMobile = false }: { closeMenu: () => void; isMobile?: boolean }) => {
  const { theme } = useTheme()
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      {navItems.map((item) => (
        <NavItem key={item.name} href={item.href} onClick={closeMenu} isMobile={isMobile}>
          {item.name}
        </NavItem>
      ))}
    </>
  )
}

const NavItem = ({
  href,
  children,
  onClick,
  isMobile = false,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
  isMobile?: boolean
}) => {
  const { theme } = useTheme()

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 ${
        theme === "dark" ? "text-white hover:text-sky-400" : "text-slate-800 hover:text-sky-600"
      } transition-colors ${isMobile ? "text-lg" : ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}

export default Header
