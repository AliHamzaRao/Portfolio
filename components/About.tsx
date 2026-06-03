"use client"

import { useProfile } from "@/contexts/ProfileContext"
import { motion } from "framer-motion"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useInView } from "react-intersection-observer"

const strengths = [
  {
    icon: Code,
    title: "Clean Architecture",
    description: "Maintainable, scalable code built on proven patterns and clear boundaries.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "High-performance applications with optimized rendering and efficient data flow.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Pragmatic, innovative solutions to ambiguous, high-stakes engineering problems.",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Mentoring engineers and aligning cross-functional teams around a shared vision.",
  },
]

const defaultAbout =
  "I specialize in enhancing performance, optimizing user interfaces, and ensuring seamless user experiences. With a proven track record launching innovative web services, I bridge development and design — focusing on high-performance, scalable solutions that drive organizations forward."

const About = () => {
  const { profile } = useProfile()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            01 / About
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            Bridging architecture & <span className="text-brand-400">human experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            {profile?.aboutMe || profile?.description || defaultAbout}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {strengths.map((strength) => {
            const Icon = strength.icon
            return (
              <motion.div
                key={strength.title}
                variants={itemVariants}
                className="group rounded-2xl border border-white/5 bg-slate-950/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/30"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-400/20 transition-colors group-hover:bg-brand-500/20">
                  <Icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-white">{strength.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{strength.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default About
