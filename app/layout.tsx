import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Manrope, JetBrains_Mono } from "next/font/google"
import Providers from "@/components/providers/Providers"
import { Toaster } from "@/components/ui/toaster"

// Architect design system fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ali Hamza Rao — Senior Frontend Lead & UI Architect",
  description:
    "Portfolio of Ali Hamza Rao — architecting scalable, high-performance digital experiences with React, Next.js, and TypeScript.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
