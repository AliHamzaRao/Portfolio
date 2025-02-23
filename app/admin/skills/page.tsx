"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2 } from "lucide-react"

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills")
      const data = await response.json()
      if (data.success) {
        setSkills(data.data)
      }
    } catch (error) {
      console.error("Error fetching skills:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSkills(skills.filter((skill: any) => skill._id !== id))
      }
    } catch (error) {
      console.error("Error deleting skill:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <Button onClick={() => router.push("/admin/skills/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="grid gap-4">
        {skills.map((skill: any) => (
          <Card key={skill._id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => router.push(`/admin/skills/${skill._id}`)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(skill._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Category: {skill.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

