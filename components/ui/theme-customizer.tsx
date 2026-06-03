"use client"

import { useState } from "react"
import { Check, Paintbrush, X } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Slider } from "./slider"
import { Switch } from "./switch"
import { Label } from "./label"
import { useAppearance } from "@/components/providers/ThemeProvider"
import { ACCENTS, type AccentKey } from "@/lib/appearance"

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, updateSettings, isTouch } = useAppearance()

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            aria-label="Customize appearance"
            className="h-11 w-11 rounded-full border border-white/10 bg-slate-900 text-brand-400 shadow-lg shadow-black/40 hover:bg-slate-800"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Paintbrush className="h-5 w-5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={12}
          className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border-white/10 bg-slate-900 p-0 text-slate-200"
        >
          <div className="border-b border-white/10 p-4">
            <p className="font-heading font-semibold text-white">Appearance</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Personalize this site — saved on your device only.
            </p>
          </div>

          <div className="space-y-6 p-4">
            {/* Accent color — recolors the whole site live */}
            <div className="space-y-3">
              <Label className="font-mono text-xs uppercase tracking-wide text-slate-400">
                Accent color
              </Label>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(ACCENTS) as AccentKey[]).map((key) => {
                  const accent = ACCENTS[key]
                  const active = settings.accent === key
                  return (
                    <button
                      key={key}
                      onClick={() => updateSettings({ accent: key })}
                      title={accent.name}
                      aria-label={accent.name}
                      aria-pressed={active}
                      className={`flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-slate-900 transition-all ${
                        active ? "ring-white/80" : "ring-transparent hover:ring-white/30"
                      }`}
                      style={{ backgroundColor: accent.hex }}
                    >
                      {active && <Check className="h-4 w-4 text-slate-900" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom cursor — only meaningful with a fine pointer */}
            {!isTouch && (
              <div className="space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-cursor" className="text-sm text-slate-200">
                    Custom cursor
                  </Label>
                  <Switch
                    id="custom-cursor"
                    checked={settings.enableCustomCursor}
                    onCheckedChange={(checked) => updateSettings({ enableCustomCursor: checked })}
                  />
                </div>
                {settings.enableCustomCursor && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase tracking-wide text-slate-400">
                      Cursor size
                    </Label>
                    <Slider
                      min={12}
                      max={36}
                      step={2}
                      value={[settings.cursorSize]}
                      onValueChange={(value) => updateSettings({ cursorSize: value[0] })}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
