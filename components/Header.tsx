"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { useProfile } from "@/contexts/ProfileContext"
import Link from "next/link"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
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
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-name, 'Pacifico, cursive')" }}
            >
              {profile?.name || "Portfolio"}
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavItems closeMenu={closeMenu} />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 text-white hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2 text-white hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-slate-800">
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
            className="md:hidden bg-slate-900 border-t border-slate-800 mt-2"
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
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 text-white hover:text-sky-400 transition-colors ${isMobile ? "text-lg" : ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}

export default Header
