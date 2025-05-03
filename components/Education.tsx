"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"

interface EducationItem {
  _id: string
  degree: string
  institution: string
  period: string
  description?: string
}

const Education = () => {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("/api/education")
        const data = await response.json()
        if (data.success) {
          setEducation(data.data)
        }
      } catch (error) {
        console.error("Error fetching education:", error)
      }
    }

    fetchEducation()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="education" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Education & <span className="text-sky-400">Certifications</span>
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
            My academic background and professional certifications that have shaped my expertise:
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {education.map((edu) => (
            <motion.div
              key={edu._id}
              variants={itemVariants}
              className="bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-sky-500/10 transition-all duration-300 hover:translate-y-[-5px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-sky-500/10 rounded-bl-full"></div>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-sky-500/20 mr-4">
                  <GraduationCap className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-sky-400">{edu.institution}</p>
                </div>
              </div>
              <div className="flex items-center text-slate-400 text-sm mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{edu.period}</span>
              </div>
              {edu.description && <p className="text-slate-300">{edu.description}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Education
