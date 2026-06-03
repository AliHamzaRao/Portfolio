"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from "lucide-react"
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

function TechTag({ tech }: { tech: string }) {
  return (
    <span className="rounded-md border border-white/10 bg-slate-800/60 px-2.5 py-1 font-mono text-xs text-slate-300">
      {tech}
    </span>
  )
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
  const handleCloseProject = () => setSelectedProject(null)
  const handlePrevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
  }
  const handleNextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            04 / Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            Featured <span className="text-brand-400">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            A selection of products and platforms I&apos;ve designed and engineered.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                <div className="mb-4 h-48 rounded-xl bg-slate-800" />
                <div className="mb-2 h-4 w-1/2 rounded bg-slate-800" />
                <div className="h-4 w-3/4 rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects?.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/30"
              >
                <div className="relative h-48 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className="font-mono text-sm text-slate-500">No preview</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-heading text-xl font-bold text-white">{project.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <TechTag key={index} tech={tech} />
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Button
                      onClick={() => handleOpenProject(project)}
                      className="w-full rounded-full bg-brand-500 text-white hover:bg-brand-400"
                    >
                      View Details
                    </Button>
                    {project.liveUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="rounded-full border-slate-700 bg-transparent text-slate-300 hover:border-brand-400/50 hover:text-white"
                      >
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
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && handleCloseProject()}>
        <DialogContent className="max-w-4xl overflow-hidden border-white/10 bg-slate-900 p-0 text-white">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/40 text-white hover:bg-black/60"
              onClick={handleCloseProject}
            >
              <X className="h-4 w-4" />
            </Button>

            {selectedProject?.images && selectedProject.images.length > 0 ? (
              <div className="relative h-64 bg-slate-950 md:h-80">
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
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-brand-400" : "bg-white/40"}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : null}

            <div className="p-6">
              <h3 className="mb-2 font-heading text-2xl font-bold text-white">{selectedProject?.title}</h3>
              <p className="mb-4 leading-relaxed text-slate-300">{selectedProject?.description}</p>

              <div className="mb-5">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wide text-slate-500">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.technologies.map((tech, index) => (
                    <TechTag key={index} tech={tech} />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {selectedProject?.liveUrl && (
                  <Button asChild className="rounded-full bg-brand-500 text-white hover:bg-brand-400">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Project
                    </a>
                  </Button>
                )}
                {selectedProject?.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-slate-700 bg-transparent text-slate-200 hover:border-brand-400/50 hover:text-white"
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
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
