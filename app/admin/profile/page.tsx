"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProfileForm } from "@/components/admin/forms/ProfileForm"
import AdminLayout from "@/components/admin/AdminLayout"

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/admin/dashboard")
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (isLoading) {
    return <AdminLayout> <div>Loading...</div></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <ProfileForm initialData={profile} onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  )
}

