"use client"

import type React from "react"

import { useState, useRef } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Download, FileUp, Trash2, Eye, File } from "lucide-react"
import { put } from "@vercel/blob"

export default function ResumePage() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [resumeName, setResumeName] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch existing resume on component mount
  useState(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/resume/info")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.url) {
            setResumeUrl(data.url)
            setResumeName(data.name || "resume.pdf")
          }
        }
      } catch (error) {
        console.error("Error fetching resume info:", error)
      }
    }

    fetchResume()
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Resume file must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Upload to Vercel Blob
      const blob = await put(`resumes/${file.name}`, file, {
        access: "public",
    })
    // token: process.env.BLOB_READ_WRITE_TOKEN,

      // Save resume info to database
      const response = await fetch("/api/resume/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: blob.url,
          name: file.name,
          size: file.size,
          type: file.type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save resume info")
      }

      setResumeUrl(blob.url)
      setResumeName(file.name)

      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading resume:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteResume = async () => {
    if (!resumeUrl) return

    try {
      const response = await fetch("/api/resume/info", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete resume")
      }

      setResumeUrl(null)
      setResumeName(null)

      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting resume:", error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting your resume",
        variant: "destructive",
      })
    }
  }

  const handlePreviewToggle = () => {
    setPreviewOpen(!previewOpen)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Resume Management</h1>
            <p className="text-muted-foreground">Upload and manage your resume</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>
                  Upload your resume in PDF format. This will be available for download on your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="hidden"
                  />

                  {!resumeUrl ? (
                    <div
                      className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">Upload your resume</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Click to browse or drag and drop your PDF file here
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Max file size: 5MB</p>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center">
                        <File className="h-10 w-10 text-blue-500 mr-4" />
                        <div className="flex-1">
                          <h3 className="font-medium">{resumeName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Your resume is ready for download on your portfolio
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={handlePreviewToggle}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <a href={resumeUrl} download={resumeName} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="destructive" size="icon" onClick={handleDeleteResume}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      variant={resumeUrl ? "outline" : "default"}
                    >
                      <FileUp className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : resumeUrl ? "Replace Resume" : "Upload Resume"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>Preview how your resume appears</CardDescription>
              </CardHeader>
              <CardContent>
                {resumeUrl ? (
                  <div className="aspect-[1/1.414] bg-white rounded-md border shadow-sm relative overflow-hidden">
                    {previewOpen ? (
                      <iframe
                        src={`${resumeUrl}#view=FitH`}
                        className="absolute inset-0 w-full h-full"
                        title="Resume Preview"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="outline" onClick={handlePreviewToggle} className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Preview Resume
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[1/1.414] bg-muted/30 rounded-md border shadow-sm flex items-center justify-center">
                    <p className="text-muted-foreground text-center px-4">Upload a resume to see a preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
