"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { ExperienceForm } from "@/components/admin/forms/ExperienceForm"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditExperiencePage({ params }: { params: { id: string } }) {
  const [experience, setExperience] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchExperience()
  }, [params.id])

  const fetchExperience = async () => {
    try {
      const response = await fetch(`/api/experiences/${params.id}`)
      const data = await response.json()
      console.log("[v0] Fetched experience:", data.data)
      if (data.success) {
        setExperience(data.data)
      }
    } catch (error) {
      console.error("Error fetching experience:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/experiences/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/admin/experiences")
      } else {
        throw new Error("Failed to update experience")
      }
    } catch (error) {
      console.error("Error updating experience:", error)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-8">Loading...</div>
      </AdminLayout>
    )
  }

  if (!experience) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-8">Experience not found</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Experience</h1>
        <ExperienceForm initialData={experience} onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  )
}
