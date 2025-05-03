"use client"

import { useState } from "react"
import { Paintbrush, X, Check, Palette, Type, Sparkles } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Slider } from "./slider"
import { Switch } from "./switch"
import { Label } from "./label"
import { useTheme } from "next-themes"
import { useThemeSettings } from "@/components/providers/ThemeProvider"

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { settings, setSettings } = useThemeSettings()

  const updateSettings = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
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
            <p className="text-xs text-muted-foreground mt-1">Personalize your portfolio appearance</p>
          </div>
          <Tabs defaultValue="colors">
            <div className="border-b">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
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
              <TabsContent value="colors" className="mt-0 space-y-4">
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
