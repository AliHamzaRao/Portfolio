"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences")
      const data = await response.json()
      if (data.success) {
        setExperiences(data.data)
      }
    } catch (error) {
      console.error("Error fetching experiences:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setExperiences(experiences.filter((exp: any) => exp._id !== id))
      }
    } catch (error) {
      console.error("Error deleting experience:", error)
    }
  }

  if (isLoading) {
    return <AdminLayout><div>Loading...</div></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Experience</h1>
          <Button onClick={() => router.push("/admin/experiences/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience: any) => (
            <Card key={experience._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span>{experience.title}</span>
                    <span className="text-muted-foreground text-sm ml-2">at {experience.company}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/admin/experiences/${experience._id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(experience._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{experience.period}</p>
                <p className="mt-2">{experience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div></AdminLayout>
  )
}

