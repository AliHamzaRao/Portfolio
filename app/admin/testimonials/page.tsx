"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TestimonialForm } from "@/components/admin/forms/TestimonialForm"
import Image from "next/image"

interface Testimonial {

    name: String;
    position: String;
    company: String;
    content: String;
    image: String;
    rating: Number;
    order: Number;
    _id: String;
}

export default function TestimonialsPage() {
    const { toast } = useToast()
    const [testimonials, setTestimonials] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchTestimonials = useCallback(async () => {
        try {
            const response = await fetch("/api/testimonials")
            const data = await response.json()
            if (data.success) {
                setTestimonials(data.data)
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTestimonials()
    }, [fetchTestimonials])

    const handleOpenModal = (testimonial = null) => {
        setSelectedTestimonial(testimonial)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedTestimonial(null)
        setIsModalOpen(false)
    }

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            const url = selectedTestimonial ? `/api/testimonials/${selectedTestimonial?._id}` : "/api/testimonials"
            const method = selectedTestimonial ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to save testimonial")

            toast({
                title: "Success",
                description: `Testimonial ${selectedTestimonial ? "updated" : "created"} successfully`,
            })
            fetchTestimonials()
            handleCloseModal()
        } catch (error) {
            console.error("Error saving testimonial:", error)
            toast({
                title: "Error",
                description: "Failed to save testimonial",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return

        try {
            const response = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setTestimonials(testimonials.filter((testimonial: any) => testimonial._id !== id))
                toast({
                    title: "Success",
                    description: "Testimonial deleted successfully",
                })
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error)
            toast({
                title: "Error",
                description: "Failed to delete testimonial",
                variant: "destructive",
            })
        }
    }

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p>Loading testimonials...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Manage Testimonials</h1>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                    </Button>
                </div>

                <div className="grid gap-6">
                    {testimonials.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center h-40">
                                <p className="text-muted-foreground mb-4">No testimonials found</p>
                                <Button onClick={() => handleOpenModal()}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Your First Testimonial
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        testimonials.map((testimonial: any) => (
                            <Card key={testimonial._id} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <div className="flex items-center space-x-4">
                                        {testimonial.image && (
                                            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                                <Image
                                                    src={testimonial.image || "/placeholder.svg"}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.position} at {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="icon" onClick={() => handleOpenModal(testimonial)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(testimonial._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">"{testimonial.content}"</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                    </DialogHeader>
                    <TestimonialForm initialData={selectedTestimonial} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                </DialogContent>
            </Dialog>
        </AdminLayout>
    )
}
