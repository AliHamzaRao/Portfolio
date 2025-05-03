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
    <section id="skills" className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Technical <span className="text-sky-400">Skills</span>
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
            My toolkit is diverse and ever-expanding. Here are some of the technologies I've mastered over my career:
          </motion.p>
        </div>

        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {categories
              .find((category) => category.name === activeCategory)
              ?.skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={itemVariants}
                  className="bg-slate-700 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 group"
                >
                  <div className="w-16 h-16 relative mb-4 flex items-center justify-center">
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
                  <h3 className="text-white text-center font-medium">{skill.name}</h3>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
