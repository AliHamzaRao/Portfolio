"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProjectForm } from "@/components/admin/forms/ProjectForm"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setProject(data.data)
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/admin/projects")
      } else {
        throw new Error("Failed to update project")
      }
    } catch (error) {
      console.error("Error updating project:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <ProjectForm initialData={project} onSubmit={handleSubmit} />
    </div>
  )
}

