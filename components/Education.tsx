"use client"

import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

const Education = () => {
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
    <animated.section ref={ref} style={fadeIn} id="education" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Education & Certifications
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Bachelors of Sciences in Computer Science</CardTitle>
            <CardDescription>2020 - 2024</CardDescription>
          </CardHeader>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>MERN Stack Development Certification</CardTitle>
            <CardDescription>Vvork Cloud Technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Started learning in 2018, covering fundamentals of web development with hands-on experience in ReactJS and
              NodeJS.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Social Media Marketing Workshop</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learned about using colors to attract audience and finding niche audiences.</p>
          </CardContent>
        </Card>
      </div>
    </animated.section>
  )
}

export default Education

