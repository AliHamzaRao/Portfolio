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
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            06 / Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            What people <span className="text-brand-400">say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            Words from clients and colleagues I&apos;ve collaborated with.
          </motion.p>
        </div>

        <div ref={ref} className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-8 md:p-12"
          >
            <div className="absolute right-8 top-6 text-brand-400/15">
              <Quote className="h-16 w-16" />
            </div>

            <div className="mb-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
              {testimonials[currentIndex].image ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-brand-400/30">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10 ring-1 ring-brand-400/20">
                  <span className="font-heading text-2xl font-bold text-brand-400">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
              )}

              <div className="text-center md:text-left">
                <h3 className="font-heading text-xl font-bold text-white">{testimonials[currentIndex].name}</h3>
                <p className="text-brand-400">
                  {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                </p>
                <div className="mt-2 flex justify-center md:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonials[currentIndex].rating ? "fill-tertiary text-tertiary" : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="text-lg leading-relaxed text-slate-200">
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </blockquote>

            {testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="rounded-full border border-white/10 bg-slate-900 p-2 text-slate-200 transition-colors hover:border-brand-400/40 hover:text-brand-400"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        index === currentIndex ? "bg-brand-400" : "bg-slate-600 hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="rounded-full border border-white/10 bg-slate-900 p-2 text-slate-200 transition-colors hover:border-brand-400/40 hover:text-brand-400"
                >
                  <ChevronRight className="h-5 w-5" />
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
