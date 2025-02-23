"use client"

import { useRouter } from "next/navigation"
import { ProjectForm } from "@/components/admin/forms/ProjectForm"

export default function NewProjectPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/admin/projects")
      } else {
        throw new Error("Failed to create project")
      }
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  )
}

