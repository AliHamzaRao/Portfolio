// Shared "Appearance" config for the public-site personalization widget.
// The accent is wired into the `brand` Tailwind token via --brand-* RGB
// channels, so picking an accent recolors the whole site live.

export type AccentKey = "sky" | "emerald" | "violet" | "amber" | "rose"

export interface Accent {
  name: string
  hex: string // 400-shade, used for the cursor + swatches
  shades: { 300: string; 400: string; 500: string; 600: string } // "r g b"
}

export const ACCENTS: Record<AccentKey, Accent> = {
  sky: {
    name: "Sky",
    hex: "#38bdf8",
    shades: { 300: "125 211 252", 400: "56 189 248", 500: "14 165 233", 600: "2 132 199" },
  },
  emerald: {
    name: "Emerald",
    hex: "#34d399",
    shades: { 300: "110 231 183", 400: "52 211 153", 500: "16 185 129", 600: "5 150 105" },
  },
  violet: {
    name: "Violet",
    hex: "#a78bfa",
    shades: { 300: "196 181 253", 400: "167 139 250", 500: "139 92 246", 600: "124 58 237" },
  },
  amber: {
    name: "Amber",
    hex: "#fbbf24",
    shades: { 300: "252 211 77", 400: "251 191 36", 500: "245 158 11", 600: "217 119 6" },
  },
  rose: {
    name: "Rose",
    hex: "#fb7185",
    shades: { 300: "253 164 175", 400: "251 113 133", 500: "244 63 94", 600: "225 29 72" },
  },
}

export interface AppearanceSettings {
  accent: AccentKey
  enableCustomCursor: boolean
  cursorSize: number
}

export const defaultAppearance: AppearanceSettings = {
  accent: "sky",
  enableCustomCursor: false,
  cursorSize: 20,
}

export const APPEARANCE_STORAGE_KEY = "appearance-settings"

/** Whether the device is touch-primary (no fine pointer) — cursor controls are useless there. */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: coarse)").matches
}

/** Apply the selected accent to the document root as --brand-* RGB channels. */
export function applyAccent(accent: AccentKey) {
  if (typeof document === "undefined") return
  const { shades } = ACCENTS[accent] ?? ACCENTS.sky
  const root = document.documentElement
  root.style.setProperty("--brand-300", shades[300])
  root.style.setProperty("--brand-400", shades[400])
  root.style.setProperty("--brand-500", shades[500])
  root.style.setProperty("--brand-600", shades[600])
}
