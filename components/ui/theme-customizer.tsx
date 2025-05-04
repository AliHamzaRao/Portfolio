"use client"

import { useState, useEffect } from "react"
import { Paintbrush, X, Check, Palette, Type, Sparkles } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Slider } from "./slider"
import { Switch } from "./switch"
import { Label } from "./label"
import { useTheme } from "next-themes"

// Define the theme settings interface
interface ThemeSettings {
  primaryColor: string
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

// Default settings
const defaultSettings: ThemeSettings = {
  primaryColor: "#0ea5e9", // sky-500
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

// Material UI inspired color palettes
const colorPalettes = {
  blue: {
    primary: "#1976d2",
    accent: "#42a5f5",
    name: "Blue",
  },
  purple: {
    primary: "#7c3aed",
    accent: "#a78bfa",
    name: "Purple",
  },
  green: {
    primary: "#2e7d32",
    accent: "#66bb6a",
    name: "Green",
  },
  amber: {
    primary: "#ff8f00",
    accent: "#ffca28",
    name: "Amber",
  },
  pink: {
    primary: "#c2185b",
    accent: "#f06292",
    name: "Pink",
  },
  teal: {
    primary: "#00796b",
    accent: "#26a69a",
    name: "Teal",
  },
  indigo: {
    primary: "#3949ab",
    accent: "#7986cb",
    name: "Indigo",
  },
  red: {
    primary: "#d32f2f",
    accent: "#ef5350",
    name: "Red",
  },
}

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("theme-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
    setIsLoaded(true)
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("theme-settings", JSON.stringify(settings))
      applySettings(settings)
    }
  }, [settings, isLoaded])

  // Apply settings to the DOM
  const applySettings = (settings: ThemeSettings) => {
    const root = document.documentElement

    // Apply colors
    root.style.setProperty("--color-primary", settings.primaryColor)
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
  }

  const updateSettings = (key: keyof ThemeSettings, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  const applyPalette = (palette: (typeof colorPalettes)[keyof typeof colorPalettes]) => {
    setSettings({
      ...settings,
      primaryColor: palette.primary,
      accentColor: palette.accent,
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-background shadow-md">
            {isOpen ? <X className="h-4 w-4" /> : <Paintbrush className="h-4 w-4" />}
            <span className="sr-only">Toggle theme customizer</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <p className="font-medium">Customize Theme</p>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Personalize your portfolio appearance (local only)</p>
          </div>
          <Tabs defaultValue="palettes">
            <div className="border-b">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="palettes"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Palettes
                </TabsTrigger>
                <TabsTrigger
                  value="colors"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger
                  value="fonts"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Type className="mr-2 h-4 w-4" />
                  Fonts
                </TabsTrigger>
                <TabsTrigger
                  value="effects"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Effects
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="p-4 pb-2">
              <TabsContent value="palettes" className="mt-0 space-y-4">
                <div className="space-y-1.5">
                  <Label>Theme Mode</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className="w-full"
                    >
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className="w-full"
                    >
                      Dark
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Color Palettes</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(colorPalettes).map(([key, palette]) => (
                      <button
                        key={key}
                        onClick={() => applyPalette(palette)}
                        className="flex flex-col items-center p-2 rounded-md border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex w-full gap-1 mb-1">
                          <div className="h-6 w-full rounded-sm" style={{ backgroundColor: palette.primary }}></div>
                          <div className="h-6 w-full rounded-sm" style={{ backgroundColor: palette.accent }}></div>
                        </div>
                        <span className="text-xs">{palette.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="colors" className="mt-0 space-y-4">
                <div className="space-y-1.5">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["#0ea5e9", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"].map((color) => (
                      <button
                        key={color}
                        onClick={() => updateSettings("primaryColor", color)}
                        className={`h-8 w-full rounded-md border ${
                          settings.primaryColor === color ? "ring-2 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {settings.primaryColor === color && <Check className="h-4 w-4 text-white mx-auto" />}
                        <span className="sr-only">Select color</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Accent Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["#7c3aed", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                      <button
                        key={color}
                        onClick={() => updateSettings("accentColor", color)}
                        className={`h-8 w-full rounded-md border ${
                          settings.accentColor === color ? "ring-2 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {settings.accentColor === color && <Check className="h-4 w-4 text-white mx-auto" />}
                        <span className="sr-only">Select color</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="fonts" className="mt-0 space-y-4">
                <div className="space-y-1.5">
                  <Label>Name Font</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: "Pacifico", value: "Pacifico, cursive" },
                      { name: "Dancing Script", value: "Dancing Script, cursive" },
                      { name: "Great Vibes", value: "Great Vibes, cursive" },
                      { name: "Satisfy", value: "Satisfy, cursive" },
                      { name: "Poppins", value: "Poppins, sans-serif" },
                    ].map((font) => (
                      <button
                        key={font.value}
                        onClick={() => updateSettings("nameFont", font.value)}
                        className={`h-10 w-full rounded-md border px-3 text-left ${
                          settings.nameFont === font.value ? "border-primary" : ""
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Title Font</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: "Poppins", value: "Poppins, sans-serif" },
                      { name: "Montserrat", value: "Montserrat, sans-serif" },
                      { name: "Raleway", value: "Raleway, sans-serif" },
                      { name: "Playfair Display", value: "Playfair Display, serif" },
                      { name: "Roboto", value: "Roboto, sans-serif" },
                    ].map((font) => (
                      <button
                        key={font.value}
                        onClick={() => updateSettings("titleFont", font.value)}
                        className={`h-10 w-full rounded-md border px-3 text-left ${
                          settings.titleFont === font.value ? "border-primary" : ""
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="effects" className="mt-0 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="custom-cursor">Custom Cursor</Label>
                    <Switch
                      id="custom-cursor"
                      checked={settings.enableCustomCursor}
                      onCheckedChange={(checked) => updateSettings("enableCustomCursor", checked)}
                    />
                  </div>
                  {settings.enableCustomCursor && (
                    <div className="space-y-2 mt-2">
                      <Label>Cursor Size</Label>
                      <Slider
                        min={10}
                        max={40}
                        step={2}
                        value={[settings.cursorSize]}
                        onValueChange={(value) => updateSettings("cursorSize", value[0])}
                      />
                      <Label>Cursor Color</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {["#0ea5e9", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"].map((color) => (
                          <button
                            key={color}
                            onClick={() => updateSettings("cursorColor", color)}
                            className={`h-8 w-full rounded-md border ${
                              settings.cursorColor === color ? "ring-2 ring-offset-2" : ""
                            }`}
                            style={{ backgroundColor: color }}
                          >
                            {settings.cursorColor === color && <Check className="h-4 w-4 text-white mx-auto" />}
                            <span className="sr-only">Select color</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="light-effects">Light Mode Effects</Label>
                    <Switch
                      id="light-effects"
                      checked={settings.enableLightEffects}
                      onCheckedChange={(checked) => updateSettings("enableLightEffects", checked)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-effects">Dark Mode Effects</Label>
                    <Switch
                      id="dark-effects"
                      checked={settings.enableDarkEffects}
                      onCheckedChange={(checked) => updateSettings("enableDarkEffects", checked)}
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
            <div className="p-4 pt-0">
              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Apply Changes
              </Button>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Custom cursor component
export function CustomCursor({ size, color }: { size: number; color: string }) {
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
