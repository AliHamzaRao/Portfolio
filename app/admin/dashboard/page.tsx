"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Briefcase, Code, GraduationCap, Award, MessageSquare } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome to your Portfolio Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content from this central dashboard.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Profile"
            description="Manage your personal information"
            icon={<User className="h-5 w-5" />}
            href="/admin/profile"
          />
          <DashboardCard
            title="Projects"
            description="Showcase your work and achievements"
            icon={<Code className="h-5 w-5" />}
            href="/admin/projects"
          />
          <DashboardCard
            title="Experience"
            description="Highlight your professional journey"
            icon={<Briefcase className="h-5 w-5" />}
            href="/admin/experiences"
          />
          <DashboardCard
            title="Education"
            description="Share your academic background"
            icon={<GraduationCap className="h-5 w-5" />}
            href="/admin/education"
          />
          <DashboardCard
            title="Skills"
            description="Display your technical expertise"
            icon={<Award className="h-5 w-5" />}
            href="/admin/skills"
          />
          <DashboardCard
            title="Testimonials"
            description="Add client and colleague feedback"
            icon={<MessageSquare className="h-5 w-5" />}
            href="/admin/testimonials"
          />
        </div>
      </div>
    </AdminLayout>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <a href={href} className="inline-flex items-center mt-4 text-sm font-medium text-primary">
          Manage
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </CardContent>
    </Card>
  )
}
