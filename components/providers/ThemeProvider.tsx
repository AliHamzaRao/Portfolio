"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  nameFont: string
  titleFont: string
  bodyFont: string
  enableCustomCursor: boolean
  cursorSize: number
  cursorColor: string
  enableLightEffects: boolean
  enableDarkEffects: boolean
}

interface ThemeContextType {
  settings: ThemeSettings
  setSettings: (settings: ThemeSettings) => void
  isCustomizing: boolean
  setIsCustomizing: (isCustomizing: boolean) => void
}

const defaultSettings: ThemeSettings = {
  primaryColor: "#0ea5e9", // sky-500
  secondaryColor: "#1e293b", // slate-800
  accentColor: "#7c3aed", // violet-600
  nameFont: "Pacifico, cursive",
  titleFont: "Poppins, sans-serif",
  bodyFont: "Inter, sans-serif",
  enableCustomCursor: true,
  cursorSize: 20,
  cursorColor: "#0ea5e9",
  enableLightEffects: true,
  enableDarkEffects: true,
}

const ThemeContext = createContext<ThemeContextType>({
  settings: defaultSettings,
  setSettings: () => {},
  isCustomizing: false,
  setIsCustomizing: () => {},
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load settings from localStorage or API
    const loadSettings = async () => {
      try {
        // Try to load from localStorage first
        const savedSettings = localStorage.getItem("theme-settings")
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings))
          setIsLoaded(true)
          return
        }

        // If not in localStorage, try to fetch from API
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setSettings(data.data)
            localStorage.setItem("theme-settings", JSON.stringify(data.data))
          }
        }
      } catch (error) {
        console.error("Error loading theme settings:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadSettings()
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("theme-settings", JSON.stringify(settings))
    }
  }, [settings, isLoaded])

  // Apply CSS variables for theme settings
  useEffect(() => {
    if (!isLoaded) return

    const root = document.documentElement

    // Apply colors
    root.style.setProperty("--color-primary", settings.primaryColor)
    root.style.setProperty("--color-secondary", settings.secondaryColor)
    root.style.setProperty("--color-accent", settings.accentColor)

    // Apply fonts
    root.style.setProperty("--font-name", settings.nameFont)
    root.style.setProperty("--font-title", settings.titleFont)
    root.style.setProperty("--font-body", settings.bodyFont)

    // Apply cursor settings
    if (settings.enableCustomCursor) {
      root.style.setProperty("--cursor-size", `${settings.cursorSize}px`)
      root.style.setProperty("--cursor-color", settings.cursorColor)
      document.body.classList.add("custom-cursor")
    } else {
      document.body.classList.remove("custom-cursor")
    }

    // Apply effects settings
    if (settings.enableLightEffects) {
      root.style.setProperty("--enable-light-effects", "1")
    } else {
      root.style.setProperty("--enable-light-effects", "0")
    }

    if (settings.enableDarkEffects) {
      root.style.setProperty("--enable-dark-effects", "1")
    } else {
      root.style.setProperty("--enable-dark-effects", "0")
    }
  }, [settings, isLoaded])

  return (
    <ThemeContext.Provider
      value={{
        settings,
        setSettings,
        isCustomizing,
        setIsCustomizing,
      }}
    >
      <NextThemesProvider {...props}>
        {children}
        {settings.enableCustomCursor && <CustomCursor size={settings.cursorSize} color={settings.cursorColor} />}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeSettings() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeSettings must be used within a ThemeProvider")
  }
  return context
}

function CustomCursor({ size, color }: { size: number; color: string }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(!!isClickable)
    }

    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return (
    <>
      <style jsx global>{`
        body.custom-cursor {
          cursor: none;
        }
        body.custom-cursor a, 
        body.custom-cursor button,
        body.custom-cursor [role="button"],
        body.custom-cursor input[type="submit"],
        body.custom-cursor input[type="button"] {
          cursor: none;
        }
      `}</style>
      <div
        className="fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          width: isPointer ? size * 0.5 : size,
          height: isPointer ? size * 0.5 : size,
          backgroundColor: color,
          opacity: 0.7,
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
    </>
  )
}
