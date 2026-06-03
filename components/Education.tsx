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
    <section id="education" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            05 / Education
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            Education & <span className="text-brand-400">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            The academic foundation and credentials that shaped my expertise.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          {education.map((edu) => (
            <motion.div
              key={edu._id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/30"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-400/20">
                  <GraduationCap className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">{edu.degree}</h3>
                  <p className="text-brand-400">{edu.institution}</p>
                </div>
              </div>
              <div className="mb-4 flex items-center font-mono text-xs uppercase tracking-wide text-slate-400">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{edu.period}</span>
              </div>
              {edu.description && <p className="text-sm leading-relaxed text-slate-300">{edu.description}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Education
