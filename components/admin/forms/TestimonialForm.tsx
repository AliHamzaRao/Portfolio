"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"
import { useToast } from "@/components/ui/use-toast"
import { Star, StarOff } from "lucide-react"

interface TestimonialFormProps {
  initialData?: any
  onSubmit: (data: any) => Promise<void>
  isSubmitting?: boolean
}

export function TestimonialForm({ initialData, onSubmit, isSubmitting = false }: TestimonialFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    position: initialData?.position || "",
    company: initialData?.company || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    rating: initialData?.rating || 5,
    order: initialData?.order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      toast({
        title: "Success",
        description: "Testimonial saved successfully",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      })
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Client Image</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            value={formData.image ? [formData.image] : []}
            onChange={(url) => setFormData({ ...formData, image: url })}
            onRemove={() => setFormData({ ...formData, image: "" })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonial Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Client Name</label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="position">Position</label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company">Company</label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content">Testimonial Content</label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <label>Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  {star <= formData.rating ? (
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="order">Display Order</label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Testimonial"}
      </Button>
    </form>
  )
}
