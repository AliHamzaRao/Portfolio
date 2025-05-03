"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { ProfileProvider } from "@/contexts/ProfileContext"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ThemeCustomizer } from "@/components/ui/theme-customizer"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProfileProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </ProfileProvider>
    </SessionProvider>
  )
}
