"use client"

import type React from "react"

import { useProfile } from "@/contexts/ProfileContext"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

// EmailJS config — public values (safe to expose by EmailJS design).
// Override via NEXT_PUBLIC_* env vars without code changes.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_5ha2ncf"
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_bectk6l"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "bIJ0TP2VcmoF9v7bK"

const Contact = () => {
  const { profile } = useProfile()
  const [formData, setFormData] = useState({
    name: "",
    reply_to: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        // `from_name` + `reply_to` let the template show the visitor as sender
        // and route replies to them (set the template's Reply-To to {{reply_to}}).
        name: formData.name,
        from_name: formData.name,
        reply_to: formData.reply_to,
        message: formData.message,
      }, EMAILJS_PUBLIC_KEY)
      setSubmitStatus("success")
      setFormData({ name: "", reply_to: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    }

    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(null), 5000)
  }

  const contactItems = [
    { icon: Mail, label: "Email", value: profile?.email, href: profile?.email ? `mailto:${profile.email}` : undefined },
    { icon: Phone, label: "Phone", value: profile?.phone, href: profile?.phone ? `tel:${profile.phone}` : undefined },
    { icon: MapPin, label: "Location", value: profile?.location, href: undefined },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-brand-400"
          >
            07 / Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            Let&apos;s build something <span className="text-brand-400">together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-slate-300"
          >
            I&apos;m always open to new opportunities and collaborations. Reach out and I&apos;ll get back to you.
          </motion.p>
        </div>

        <div ref={ref} className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-white/5 bg-slate-900/60 p-8"
          >
            <h3 className="mb-6 font-heading text-xl font-bold text-white">Contact Information</h3>
            <div className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-400/20">
                      <Icon className="h-5 w-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                      <p className="text-white">{item.value || "—"}</p>
                    </div>
                  </>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex items-center gap-4">
                    {content}
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
              <h3 className="mb-6 font-heading text-xl font-bold text-white">Send a Message</h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wide text-slate-400">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-white/10 bg-slate-950/60 text-white focus-visible:ring-brand-400/40"
                  />
                </div>

                <div>
                  <label htmlFor="reply_to" className="mb-2 block font-mono text-xs uppercase tracking-wide text-slate-400">
                    Your Email
                  </label>
                  <Input
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    value={formData.reply_to}
                    onChange={handleChange}
                    required
                    className="border-white/10 bg-slate-950/60 text-white focus-visible:ring-brand-400/40"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wide text-slate-400">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-white/10 bg-slate-950/60 text-white focus-visible:ring-brand-400/40"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 py-6 font-medium text-white hover:bg-brand-400"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {submitStatus === "success" && (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-emerald-300">
                    Message sent successfully!
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-center text-red-300">
                    Failed to send message. Please try again.
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
