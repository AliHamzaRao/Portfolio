"use client"

import { useState, useEffect } from "react"
import { useSpring, animated, config } from "@react-spring/web"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const headerSpring = useSpring({
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
    config: config.wobbly,
  })

  const menuAnimation = useSpring({
    transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
    config: config.stiff,
  })

  const logoProps = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.molasses,
  })

  if (!mounted) return null

  return (
    <animated.header
      style={headerSpring}
      className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <animated.h1
          style={logoProps}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Ali Hamza Rao
        </animated.h1>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4">
            <NavItem href="#about">About</NavItem>
            <NavItem href="#skills">Skills</NavItem>
            <NavItem href="#experience">Experience</NavItem>
            <NavItem href="#projects">Projects</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-800 dark:text-white"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>
      <animated.nav
        style={menuAnimation}
        className="md:hidden fixed top-16 left-0 w-full h-screen bg-white dark:bg-gray-900 p-4"
      >
        <div className="flex flex-col space-y-4">
          <NavItem href="#about" onClick={() => setIsOpen(false)}>
            About
          </NavItem>
          <NavItem href="#skills" onClick={() => setIsOpen(false)}>
            Skills
          </NavItem>
          <NavItem href="#experience" onClick={() => setIsOpen(false)}>
            Experience
          </NavItem>
          <NavItem href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </NavItem>
          <NavItem href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </NavItem>
        </div>
      </animated.nav>
    </animated.header>
  )
}

const NavItem = ({ href, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
    color: isHovered ? "#3B82F6" : "#4B5563",
    config: config.wobbly,
  })

  return (
    <animated.a
      href={href}
      style={springProps}
      className="text-gray-600 dark:text-gray-300 transition-colors duration-200"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.a>
  )
}

export default Header

