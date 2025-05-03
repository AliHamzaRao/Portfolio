"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  images: string[]
  liveUrl?: string
  githubUrl?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setProjects(data.data)
        console.log("Fetched projects:", data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const handleCloseProject = () => {
    setSelectedProject(null)
  }

  const handlePrevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
          <div className="flex justify-center">
            <div className="animate-pulse w-full max-w-3xl">
              <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12"
        >
          Explore my recent work and projects
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                    <span className="text-slate-500 dark:text-slate-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleOpenProject(project)} variant="default" className="w-full">
                    View Details
                  </Button>
                  {project.liveUrl && (
                    <Button asChild variant="outline" size="icon">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Visit Project">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && handleCloseProject()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white dark:bg-slate-900">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
              onClick={handleCloseProject}
            >
              <X className="h-4 w-4" />
            </Button>

            {selectedProject?.images && selectedProject.images.length > 0 ? (
              <div className="relative h-64 md:h-80 bg-slate-200 dark:bg-slate-800">
                <Image
                  src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />

                {selectedProject.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : null}

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedProject?.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{selectedProject?.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {selectedProject?.liveUrl && (
                  <Button asChild variant="default">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Project
                    </a>
                  </Button>
                )}
                {selectedProject?.githubUrl && (
                  <Button asChild variant="outline">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
