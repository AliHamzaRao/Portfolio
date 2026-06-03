"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import {
  ACCENTS,
  APPEARANCE_STORAGE_KEY,
  applyAccent,
  defaultAppearance,
  isTouchDevice,
  type AppearanceSettings,
} from "@/lib/appearance"

interface AppearanceContextType {
  settings: AppearanceSettings
  updateSettings: (patch: Partial<AppearanceSettings>) => void
  isTouch: boolean
}

const AppearanceContext = createContext<AppearanceContextType>({
  settings: defaultAppearance,
  updateSettings: () => {},
  isTouch: false,
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [settings, setSettings] = useState<AppearanceSettings>(defaultAppearance)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  // Load persisted settings (localStorage only — no API round-trip).
  useEffect(() => {
    setIsTouch(isTouchDevice())
    try {
      const saved = localStorage.getItem(APPEARANCE_STORAGE_KEY)
      if (saved) {
        setSettings({ ...defaultAppearance, ...JSON.parse(saved) })
      }
    } catch {
      /* ignore malformed storage */
    }
    setIsLoaded(true)
  }, [])

  // Apply settings to the DOM + persist.
  useEffect(() => {
    if (!isLoaded) return

    applyAccent(settings.accent)

    const cursorOn = settings.enableCustomCursor && !isTouch
    document.body.classList.toggle("custom-cursor", cursorOn)

    try {
      localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* ignore quota errors */
    }
  }, [settings, isLoaded, isTouch])

  const updateSettings = (patch: Partial<AppearanceSettings>) =>
    setSettings((prev) => ({ ...prev, ...patch }))

  const cursorOn = isLoaded && settings.enableCustomCursor && !isTouch

  return (
    <AppearanceContext.Provider value={{ settings, updateSettings, isTouch }}>
      <NextThemesProvider {...props}>
        {children}
        {cursorOn && (
          <CustomCursor size={settings.cursorSize} color={ACCENTS[settings.accent].hex} />
        )}
      </NextThemesProvider>
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  return useContext(AppearanceContext)
}

function CustomCursor({ size, color }: { size: number; color: string }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      setIsPointer(isClickable)
    }

    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] rounded-full mix-blend-difference transition-transform duration-100 ease-out"
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
  )
}
