"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { ExperienceForm } from "@/components/admin/forms/ExperienceForm"
import { useRouter } from "next/navigation"

export default function NewExperiencePage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/admin/experiences")
      } else {
        throw new Error("Failed to create experience")
      }
    } catch (error) {
      console.error("Error creating experience:", error)
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Add New Experience</h1>
        <ExperienceForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  )
}
