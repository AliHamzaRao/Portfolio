"use client"

import { useInView } from "react-intersection-observer"
import { useTrail, animated, config } from "@react-spring/web"
import { Badge } from "./ui/badge"

const skills = [
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔵" },
  { name: "Vue.js", icon: "🟩" },
  { name: "Nuxt3", icon: "🟩" },
  { name: "Angular", icon: "🔴" },
  { name: "React.js", icon: "🔵" },
  { name: "Node.js", icon: "🟩" },
  { name: "Python", icon: "🟦" },
  { name: ".NET Core", icon: "🟪" },
  { name: "MongoDB", icon: "🟩" },
  { name: "MySQL", icon: "🐬" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MS SQL", icon: "🔵" },
  { name: "Git", icon: "🔄" },
  { name: "SVN", icon: "📚" },
]

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const trail = useTrail(skills.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: config.wobbly,
  })

  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Skills & Technologies</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          My toolkit is diverse and ever-expanding. Here are some of the technologies I've mastered:
        </p>
        <div ref={ref} className="flex flex-wrap justify-center gap-4">
          {trail.map((props, index) => (
            <animated.div key={skills[index].name} style={props}>
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2 bg-white dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <span className="mr-2">{skills[index].icon}</span>
                {skills[index].name}
              </Badge>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

