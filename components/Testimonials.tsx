"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  _id: string
  name: string
  position: string
  company: string
  content: string
  image?: string
  rating: number
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        if (data.success) {
          setTestimonials(data.data)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Client <span className="text-sky-400">Testimonials</span>
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
            Here's what clients and colleagues have to say about working with me:
          </motion.p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-800 rounded-xl p-8 md:p-12 shadow-xl relative"
          >
            <div className="absolute top-6 right-8 text-sky-400/30">
              <Quote className="w-16 h-16" />
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              {testimonials[currentIndex].image ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-sky-400/20">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-sky-400/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-sky-400">{testimonials[currentIndex].name.charAt(0)}</span>
                </div>
              )}

              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h3>
                <p className="text-sky-400">
                  {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                </p>
                <div className="flex justify-center md:justify-start mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonials[currentIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="text-slate-300 text-lg italic leading-relaxed">
              "{testimonials[currentIndex].content}"
            </blockquote>

            {testimonials.length > 1 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-slate-700 text-white hover:bg-sky-500 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-sky-400" : "bg-slate-600"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-slate-700 text-white hover:bg-sky-500 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
