"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"

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

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<ThemeSettings>({
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
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setSettings(data.data)
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Settings saved successfully",
        })
      } else {
        throw new Error("Failed to save settings")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (key: keyof ThemeSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading settings...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Portfolio Settings</h1>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="cursor">Cursor</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>Customize the colors used throughout your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <ColorPicker
                        color={settings.primaryColor}
                        onChange={(color) => handleChange("primaryColor", color)}
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => handleChange("primaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used for buttons, links, and highlights</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <ColorPicker
                        color={settings.secondaryColor}
                        onChange={(color) => handleChange("secondaryColor", color)}
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => handleChange("secondaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used for backgrounds and secondary elements</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <ColorPicker
                        color={settings.accentColor}
                        onChange={(color) => handleChange("accentColor", color)}
                      />
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => handleChange("accentColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used for accents and special highlights</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div className="flex flex-wrap gap-4">
                    <div
                      className="w-24 h-24 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: settings.primaryColor }}
                    >
                      Primary
                    </div>
                    <div
                      className="w-24 h-24 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: settings.secondaryColor }}
                    >
                      Secondary
                    </div>
                    <div
                      className="w-24 h-24 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      Accent
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Customize the fonts used in your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Name Font</Label>
                    <select
                      value={settings.nameFont}
                      onChange={(e) => handleChange("nameFont", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Pacifico, cursive">Pacifico (Cursive)</option>
                      <option value="Dancing Script, cursive">Dancing Script (Cursive)</option>
                      <option value="Great Vibes, cursive">Great Vibes (Cursive)</option>
                      <option value="Satisfy, cursive">Satisfy (Cursive)</option>
                      <option value="Tangerine, cursive">Tangerine (Cursive)</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Font used for your name in the hero section</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Title Font</Label>
                    <select
                      value={settings.titleFont}
                      onChange={(e) => handleChange("titleFont", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Poppins, sans-serif">Poppins</option>
                      <option value="Montserrat, sans-serif">Montserrat</option>
                      <option value="Raleway, sans-serif">Raleway</option>
                      <option value="Playfair Display, serif">Playfair Display</option>
                      <option value="Roboto, sans-serif">Roboto</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Font used for headings and titles</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Body Font</Label>
                    <select
                      value={settings.bodyFont}
                      onChange={(e) => handleChange("bodyFont", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Inter, sans-serif">Inter</option>
                      <option value="Roboto, sans-serif">Roboto</option>
                      <option value="Open Sans, sans-serif">Open Sans</option>
                      <option value="Lato, sans-serif">Lato</option>
                      <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Font used for body text</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg border">
                  <h3 className="font-medium mb-4">Preview</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name Font:</p>
                      <p style={{ fontFamily: settings.nameFont }} className="text-2xl">
                        Ali Hamza Rao
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Title Font:</p>
                      <p style={{ fontFamily: settings.titleFont }} className="text-xl font-bold">
                        Senior Software Engineer
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Body Font:</p>
                      <p style={{ fontFamily: settings.bodyFont }}>
                        This is an example of body text that would appear throughout your portfolio.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cursor" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Cursor</CardTitle>
                <CardDescription>Configure your custom cursor settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-cursor">Enable Custom Cursor</Label>
                  <Switch
                    id="custom-cursor"
                    checked={settings.enableCustomCursor}
                    onCheckedChange={(checked) => handleChange("enableCustomCursor", checked)}
                  />
                </div>

                {settings.enableCustomCursor && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Cursor Size</Label>
                        <span className="text-sm">{settings.cursorSize}px</span>
                      </div>
                      <Slider
                        value={[settings.cursorSize]}
                        min={10}
                        max={40}
                        step={1}
                        onValueChange={(value) => handleChange("cursorSize", value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Cursor Color</Label>
                      <div className="flex items-center gap-2">
                        <ColorPicker
                          color={settings.cursorColor}
                          onChange={(color) => handleChange("cursorColor", color)}
                        />
                        <Input
                          value={settings.cursorColor}
                          onChange={(e) => handleChange("cursorColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">Preview</h3>
                      <div
                        className="w-full h-40 bg-muted rounded-lg flex items-center justify-center relative"
                        style={{ cursor: "none" }}
                      >
                        <div
                          className="absolute rounded-full pointer-events-none transition-transform duration-100 ease-out"
                          style={{
                            width: `${settings.cursorSize}px`,
                            height: `${settings.cursorSize}px`,
                            backgroundColor: settings.cursorColor,
                            opacity: 0.7,
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        ></div>
                        <p>Move your cursor here to preview</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Visual Effects</CardTitle>
                <CardDescription>Configure visual effects for your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="light-effects">Light Mode Effects</Label>
                  <Switch
                    id="light-effects"
                    checked={settings.enableLightEffects}
                    onCheckedChange={(checked) => handleChange("enableLightEffects", checked)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enables colored bubbles and visual effects in light mode
                </p>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-effects">Dark Mode Effects</Label>
                  <Switch
                    id="dark-effects"
                    checked={settings.enableDarkEffects}
                    onCheckedChange={(checked) => handleChange("enableDarkEffects", checked)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">Enables glow effects and particles in dark mode</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
