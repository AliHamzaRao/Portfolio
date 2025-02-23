"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring, animated, config } from "@react-spring/web"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: config.molasses,
  })

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects")
      const data = await response.json()
      if (data.success) {
        setProjects(data.data)
      }
    }
    fetchProjects()
  }, [])

  const openModal = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1))
  }

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Featured Projects</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Here are some of the projects I've worked on that showcase my skills and problem-solving abilities:
        </p>
        <animated.div ref={ref} style={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              onClick={() => openModal(project)}
            >
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={300}
                layout="responsive"
                className="object-cover"
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.shortDescription}</p>
              </CardContent>
            </Card>
          ))}
        </animated.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={closeModal}>
        {selectedProject && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-video">
              <Image
                src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronRight />
              </button>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Description:</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProject.fullDescription}</p>
              <h4 className="text-lg font-semibold mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}

export default Projects

