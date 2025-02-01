"use client"

import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { duration: 1000 },
  })

  return (
    <animated.section ref={ref} style={fadeIn} id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">About Me</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
          As a Senior Software Engineer with more than 5 years of experience, I specialize in enhancing performance,
          optimizing user interfaces, and ensuring seamless user experiences. I have a proven track record in launching
          innovative web services and applications, driving technical leadership, and fostering cross-functional
          collaboration. My expertise bridges development and design, focusing on high-performance, scalable solutions
          that drive organizations forward.
        </p>
      </div>
    </animated.section>
  )
}

export default About

