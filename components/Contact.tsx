"use client"

import type React from "react"

import { useProfile } from "@/contexts/ProfileContext"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { Github, Globe, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

const Contact = () => {
  const { profile } = useProfile()
  const [formData, setFormData] = useState({
    name: "",
    reply_to: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        "service_5ha2ncf",
        "template_bectk6l",
        formData,
        "bIJ0TP2VcmoF9v7bK"
      );
      setSubmitStatus("success");
      setFormData({ name: "", reply_to: "", message: "" });
    } catch (error) {
      setSubmitStatus("error")
    }

    setIsSubmitting(false)

    // Reset status after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  }

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),rgba(56,189,248,0)_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(76,29,149,0)_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Get In <span className="text-sky-400">Touch</span>
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
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </motion.p>
        </div>

        <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-sky-500/20 mr-4">
                  <Mail className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Email</p>
                  <a href={`mailto:${profile?.email}`} className="text-white hover:text-sky-400 transition-colors">
                    {profile?.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-full bg-sky-500/20 mr-4">
                  <Phone className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Phone</p>
                  <a href={`tel:${profile?.phone}`} className="text-white hover:text-sky-400 transition-colors">
                    {profile?.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-full bg-sky-500/20 mr-4">
                  <MapPin className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Location</p>
                  <p className="text-white">{profile?.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-4">Connect with me</h4>
              {/* <div className="flex gap-4">
                {profile?.socialLinks?.map((link, index) => (
                  <SocialIcon key={index} platform={link.platform} url={link.url} />
                ))}
              </div> */}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-slate-400 text-sm mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-slate-700 border-slate-600 text-white focus:border-sky-400 focus:ring-sky-400/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-slate-400 text-sm mb-2">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="reply_to"
                    type="email"
                    value={formData.reply_to}
                    onChange={handleChange}
                    required
                    className="bg-slate-700 border-slate-600 text-white focus:border-sky-400 focus:ring-sky-400/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-slate-400 text-sm mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-slate-700 border-slate-600 text-white focus:border-sky-400 focus:ring-sky-400/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                    Message sent successfully!
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
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

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
    >
      <img
        src={`https://cdn.simpleicons.org/${platform.toLowerCase()}`}
        alt={platform}
        className="w-5 h-5"
        onError={(e) => {
          // Fallback to default icons if the CDN fails
          const getDefaultIcon = () => {
            switch (platform.toLowerCase()) {
              case "github":
                return <Github className="w-5 h-5" />
              case "linkedin":
                return <Linkedin className="w-5 h-5" />
              case "twitter":
                return <Twitter className="w-5 h-5" />
              default:
                return <Globe className="w-5 h-5" />
            }
          }

          // Replace the img with the fallback icon
          const parent = e.currentTarget.parentNode as HTMLElement
          if (parent) {
            parent.innerHTML = ""
            const iconElement = document.createElement("div")
            iconElement.innerHTML = getDefaultIcon().toString()
            parent.appendChild(iconElement)
          }
        }}
      />
    </motion.a>
  )
}

export default Contact
