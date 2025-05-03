"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { X, Plus, Loader2 } from "lucide-react"

interface Project {
  _id?: string
  title: string
  description: string
  technologies: string[]
  images: string[]
  githubUrl?: string
  liveUrl?: string
}

interface ProjectFormProps {
  projectId?: string
  initialData?: Project
  onSubmit: (data: Project) => Promise<void> // Add this line
}

export default function ProjectForm({ projectId, initialData, onSubmit }: ProjectFormProps) {
  const [project, setProject] = useState<Project>(
    initialData || {
      title: "",
      description: "",
      technologies: [],
      images: [],
      githubUrl: "",
      liveUrl: "",
    }
  )
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newTechnology, setNewTechnology] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (projectId && !initialData) {
      const fetchProject = async () => {
        setLoading(true)
        try {
          const response = await fetch(`/api/projects/${projectId}`)
          if (!response.ok) throw new Error("Failed to fetch project")
          const data = await response.json()
          setProject(data)
        } catch (error) {
          console.error("Error fetching project:", error)
          toast({
            title: "Error",
            description: "Failed to load project data",
            variant: "destructive",
          })
        } finally {
          setLoading(false)
        }
      }

      fetchProject()
    }
  }, [projectId, initialData, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "") {
      setProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }))
      setNewTechnology("")
    }
  }

  const handleRemoveTechnology = (index: number) => {
    setProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }))
  }

  const handleImagesChange = (url: string) => {
    setProject((prev) => ({ ...prev, images: [...prev.images, url] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = projectId ? `/api/projects/${projectId}` : "/api/projects"
      const method = projectId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) throw new Error("Failed to save project")

      toast({
        title: "Success",
        description: `Project ${projectId ? "updated" : "created"} successfully`,
      })

      router.push("/admin/projects")
      router.refresh()
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={project.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={project.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input
          id="githubUrl"
          name="githubUrl"
          value={project.githubUrl || ""}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="liveUrl">Live URL</Label>
        <Input
          id="liveUrl"
          name="liveUrl"
          value={project.liveUrl || ""}
          onChange={handleChange}
          placeholder="https://example.com"
        />
        <p className="text-sm text-muted-foreground">If provided, a "Visit Project" button will be displayed</p>
      </div>

      <div className="space-y-2">
        <Label>Technologies</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTechnology(index)}
                className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
            placeholder="Add a technology"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddTechnology()
              }
            }}
          />
          <Button type="button" onClick={handleAddTechnology} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Images</Label>
        <ImageUpload value={project.images} onChange={handleImagesChange} onRemove={(url) => setProject((prev) => ({ ...prev, images: prev.images.filter((image) => image !== url) }))}/>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {projectId ? "Update" : "Create"} Project
        </Button>
      </div>
    </form>
  )
}
