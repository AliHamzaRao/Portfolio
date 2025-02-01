"use client"

import { useInView } from "react-intersection-observer"
import { useSpring, animated, config } from "@react-spring/web"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import Image from "next/image"

const projects = [
  {
    title: "Go-Safe Vehicle Tracking",
    description:
      "An advanced vehicle tracking application leveraging Angular 13+ and Google Maps API. Features include real-time route creation, geo-fencing, and geo-tagging for enhanced fleet management and safety.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Bizly",
    description:
      "A cutting-edge social platform built with a focus on reusability and clean code architecture. This project showcases my ability to create scalable and maintainable applications.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Ereqs-Lab",
    description:
      "A sophisticated SaaS-based CMS tailored for creating and managing medical portals for laboratories. This project demonstrates my expertise in developing industry-specific solutions.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "PIPER",
    description:
      "An innovative Medical Registry system designed for tracking and managing health data for pregnant women. This project highlights my ability to create sensitive and user-friendly healthcare applications.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: config.molasses,
  })

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Featured Projects</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Here are some of the projects I've worked on that showcase my skills and problem-solving abilities:
        </p>
        <animated.div ref={ref} style={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={300}
                height={200}
                layout="responsive"
                className="object-cover"
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </animated.div>
      </div>
    </section>
  )
}

export default Projects

