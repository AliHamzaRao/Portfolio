"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { useProfile } from "@/contexts/ProfileContext"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
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
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 ring-1 ring-brand-400/30 font-mono text-sm font-semibold text-brand-400 transition-colors group-hover:bg-brand-500/20">
              {(profile?.name || "P")
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-lg font-bold tracking-tight text-white"
            >
              {profile?.name || "Portfolio"}
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavItems closeMenu={closeMenu} />
            <Button
              asChild
              className="ml-4 rounded-full bg-brand-500 px-5 font-medium text-white hover:bg-brand-400 transition-colors"
            >
              <a href="#contact">Let&apos;s Talk</a>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-white/10"
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
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-md border-t border-white/5 mt-2"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                <NavItems closeMenu={closeMenu} isMobile />
                <Button
                  asChild
                  className="mt-2 rounded-full bg-brand-500 font-medium text-white hover:bg-brand-400"
                >
                  <a href="#contact" onClick={closeMenu}>
                    Let&apos;s Talk
                  </a>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const NavItems = ({ closeMenu, isMobile = false }: { closeMenu: () => void; isMobile?: boolean }) => {
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
      className={`relative rounded-md px-3 py-2 font-mono text-sm uppercase tracking-wide text-slate-300 transition-colors hover:text-brand-400 ${
        isMobile ? "text-base" : ""
      }`}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  )
}

export default Header
