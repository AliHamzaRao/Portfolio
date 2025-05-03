"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-3">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/dashboard")}>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/profile")}>
                  <Link href="/admin/profile">
                    <User className="mr-2 h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/projects")}>
                  <Link href="/admin/projects">
                    <Code className="mr-2 h-5 w-5" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/experiences")}>
                  <Link href="/admin/experiences">
                    <Briefcase className="mr-2 h-5 w-5" />
                    <span>Experience</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/education")}>
                  <Link href="/admin/education">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    <span>Education</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/skills")}>
                  <Link href="/admin/skills">
                    <Award className="mr-2 h-5 w-5" />
                    <span>Skills</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/testimonials")}>
                  <Link href="/admin/testimonials">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    <span>Testimonials</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/socials")}>
                  <Link href="/admin/socials">
                    <Globe className="mr-2 h-5 w-5" />
                    <span>Social Links</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/resume")}>
                  <Link href="/admin/resume">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Resume</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
              <ModeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1">
          <div className="flex h-16 items-center border-b px-6">
            <SidebarTrigger />
            <div className="ml-4 text-lg font-medium">Portfolio Management</div>
          </div>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
