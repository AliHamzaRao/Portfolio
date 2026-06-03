"use client"

import { useEffect, useState, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"

interface Skill {
  _id: string
  name: string
  icon: string
  category: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fetchSkills = useCallback(async () => {
    try {
      const response = await fetch("/api/skills")
      const data = await response.json()
      if (data.success) {
        setSkills(data.data)

        // Group skills by category
        const groupedSkills = data.data.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = []
          }
          acc[skill.category].push(skill)
          return acc
        }, {})

        const skillCategories = Object.keys(groupedSkills).map((name) => ({
          name,
          skills: groupedSkills[name],
        }))

        setCategories(skillCategories)
        if (skillCategories.length > 0) {
          setActiveCategory(skillCategories[0].name)
        }
      }
    } catch (error) {
      console.error("Error fetching skills:", error)
    }
  }, [])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section id="skills" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            02 / Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            Technical <span className="text-brand-400">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            A diverse, ever-expanding toolkit — the technologies I reach for to ship robust, scalable products.
          </motion.p>
        </div>

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category.name
                    ? "border-brand-400/50 bg-brand-500/15 text-brand-300"
                    : "border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          >
            {categories
              .find((category) => category.name === activeCategory)
              ?.skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={itemVariants}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/30"
                >
                  <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                    <Image
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                  <h3 className="text-center text-sm font-medium text-slate-200">{skill.name}</h3>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
