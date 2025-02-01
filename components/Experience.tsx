"use client"

import { useInView } from "react-intersection-observer"
import { useSpring, animated, config } from "@react-spring/web"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

const experiences = [
  {
    title: "Frontend Developer UIUX/ VUE.JS",
    company: "Techscale",
    period: "Dec 2024 - Present",
    description:
      "Spearheading the development of cutting-edge user interfaces, I blend modern design principles with robust Vue.js implementations to create seamless, responsive web applications that push the boundaries of user experience.",
  },
  {
    title: "Senior Software Engineer",
    company: "MentorSol",
    period: "Sept 2024 - Dec 2024",
    description:
      "Led complex projects and mentored junior developers, driving the adoption of best practices in software architecture and code quality. My role was pivotal in elevating the team's capabilities and delivering high-performance, scalable solutions.",
  },
  {
    title: "MERN Stack Developer",
    company: "MentorSol",
    period: "June 2023 - Sept 2024",
    description:
      "Architected and developed full-stack applications using MongoDB, Express.js, React, and Node.js. My focus on creating intuitive user interfaces and optimizing backend performance resulted in highly efficient and user-friendly web applications.",
  },
  {
    title: "Software Engineer Dotnet",
    company: "Cimplet Technologies",
    period: "June 2022 - June 2023",
    description:
      "Leveraged .NET technologies to design and implement robust web applications. My work involved creating scalable backend systems and integrating them with responsive front-end interfaces, ensuring optimal performance and user satisfaction.",
  },
  {
    title: "Frontend Developer",
    company: "2B VisionTechnologies",
    period: "Feb. 2020 - June 2022",
    description:
      "Began my journey as a junior developer and quickly progressed to handling complex frontend tasks. I played a key role in modernizing legacy interfaces and implementing new features that significantly improved user engagement and satisfaction.",
  },
]

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    config: config.molasses,
  })

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Professional Journey</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          My career has been a journey of continuous growth and learning. Each role has added new dimensions to my
          skills and perspective:
        </p>
        <animated.div ref={ref} style={fadeIn} className="relative">
          {experiences.map((exp, index) => (
            <Card key={index} className="mb-8 relative z-10 transform transition-all duration-300 hover:scale-105">
              <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
              <div className="absolute -left-3 top-0 w-7 h-7 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800" />
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
                <CardDescription>
                  {exp.company} | {exp.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{exp.description}</p>
              </CardContent>
            </Card>
          ))}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-blue-300 dark:bg-blue-700"
            style={{ left: "0.125rem" }}
          />
        </animated.div>
      </div>
    </section>
  )
}

export default Experience

