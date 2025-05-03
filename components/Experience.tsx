"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

interface ExperienceItem {
  _id: string
  title: string
  company: string
  period: string
  description: string
  location?: string
  type?: string
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experiences")
        const data = await response.json()
        if (data.success) {
          setExperiences(data.data)
        }
      } catch (error) {
        console.error("Error fetching experiences:", error)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <section id="experience" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Work <span className="text-sky-400">Experience</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={inView ? { opacity: 1, width: "80px" } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-sky-400 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 max-w-3xl mx-auto text-lg"
          >
            My professional journey has been focused on creating exceptional user experiences and scalable solutions:
          </motion.p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-sky-600"></div>

          {experiences.map((exp, index) => (
            <TimelineItem key={exp._id} experience={exp} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TimelineItem = ({
  experience,
  index,
  inView,
}: {
  experience: ExperienceItem
  index: number
  inView: boolean
}) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex flex-col md:flex-row items-center mb-16 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] w-5 h-5 rounded-full bg-sky-500 border-4 border-slate-900 z-10"></div>

      {/* Content */}
      <div className={`w-full md:w-[calc(50%-20px)] ${isEven ? "md:pl-0 md:pr-8" : "md:pl-8 md:pr-0"} pl-8`}>
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-sky-500/10 transition-all duration-300">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{experience.title}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-500/20 text-sky-400">
              <Calendar className="w-3 h-3 mr-1" />
              {experience.period}
            </span>
          </div>

          <h4 className="text-sky-400 font-semibold mb-2">{experience.company}</h4>

          {experience.location && (
            <div className="flex items-center text-slate-400 text-sm mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{experience.location}</span>
            </div>
          )}

          <p className="text-slate-300">{experience.description}</p>

          {experience.type && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <span className="text-sm text-slate-400">{experience.type}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Experience
