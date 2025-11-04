"use client"

import { motion } from "framer-motion"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useInView } from "react-intersection-observer"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  const strengths = [
    {
      icon: <Code className="w-6 h-6 text-sky-400" />,
      title: "Clean Code Architecture",
      description: "I write maintainable, scalable code following best practices and design patterns.",
    },
    {
      icon: <Zap className="w-6 h-6 text-sky-400" />,
      title: "Performance Optimization",
      description: "I build high-performance applications with optimized rendering and efficient algorithms.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-sky-400" />,
      title: "Creative Problem Solving",
      description: "I approach challenges with innovative solutions and outside-the-box thinking.",
    },
    {
      icon: <Users className="w-6 h-6 text-sky-400" />,
      title: "Team Collaboration",
      description: "I excel in cross-functional teams, mentoring juniors and communicating effectively.",
    },
  ]

  return (
    <section id="about" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            About <span className="text-sky-400">Me</span>
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
            As a Senior Software Engineer with more than 7 years of experience, I specialize in enhancing performance,
            optimizing user interfaces, and ensuring seamless user experiences. I have a proven track record in
            launching innovative web services and applications, driving technical leadership, and fostering
            cross-functional collaboration. My expertise bridges development and design, focusing on high-performance,
            scalable solutions that drive organizations forward.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-sky-500/10 hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-700 mb-6 mx-auto">
                {strength.icon}
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-3">{strength.title}</h3>
              <p className="text-slate-400 text-center">{strength.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
