"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            03 / Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            Career <span className="text-brand-400">progression</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            A journey of building exceptional user experiences and scalable systems.
          </motion.p>
        </div>

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-brand-400/60 via-white/10 to-transparent md:left-[7px]" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp._id} experience={exp} index={index} inView={inView} />
            ))}
          </div>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-900 bg-brand-500 shadow-[0_0_0_4px_rgba(14,165,233,0.15)]" />

      <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6 transition-all duration-300 hover:border-brand-400/30">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-heading text-xl font-bold text-white">{experience.title}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary/10 px-3 py-1 font-mono text-xs text-tertiary ring-1 ring-tertiary/20">
            <Calendar className="h-3 w-3" />
            {experience.period}
          </span>
        </div>

        <h4 className="mb-2 font-semibold text-brand-400">{experience.company}</h4>

        {experience.location && (
          <div className="mb-4 flex items-center text-sm text-slate-400">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{experience.location}</span>
          </div>
        )}

        <p className="leading-relaxed text-slate-300">{experience.description}</p>

        {experience.type && (
          <div className="mt-4 border-t border-white/5 pt-4">
            <span className="font-mono text-xs uppercase tracking-wide text-slate-500">{experience.type}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Experience
