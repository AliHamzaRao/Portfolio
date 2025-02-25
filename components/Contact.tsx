"use client";

import { useProfile } from "@/contexts/ProfileContext";
import emailjs from "@emailjs/browser";
import { animated, config, useSpring } from "@react-spring/web";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProfileImage } from "./ui/profile-image";
import { Textarea } from "./ui/textarea";

const Contact = () => {
  const { profile } = useProfile();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_5ha2ncf",
        "template_bectk6l",
        formData,
        "bIJ0TP2VcmoF9v7bK"
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: {
      opacity: isClient ? 1 : 0,
      transform: isClient ? "translateY(0)" : "translateY(50px)",
    },
    config: config.molasses,
  });

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: {
      opacity: isClient ? 1 : 0,
      transform: isClient ? "scale(1)" : "scale(0.9)",
    },
    config: config.wobbly,
  });

  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <animated.h2
          style={fadeIn}
          className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white"
        >
          Let's Connect
        </animated.h2>
        <div className="flex justify-center mb-8">
          <ProfileImage
            src={profile?.image || "/placeholder.svg"}
            alt={profile?.name || "Profile"}
            size="xl"
          />
        </div>
        <animated.p
          style={fadeIn}
          className="text-center text-gray-600 dark:text-gray-300 mb-12"
        >
          I'm always open to new opportunities and collaborations. Feel free to
          reach out!
        </animated.p>
        <animated.div
          style={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="mr-2" /> hamzaraoa010@gmail.com
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="mr-2" /> +92 311 4637356
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="mr-2" /> Pakistan
              </p>
            </div>
          </div>
          <animated.form
            onSubmit={handleSubmit}
            className="space-y-4"
            style={formAnimation}
          >
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full transition-all duration-300 hover:bg-blue-600"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {submitStatus === "success" && (
              <p className="text-green-500">Message sent successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500">
                Failed to send message. Please try again.
              </p>
            )}
          </animated.form>
        </animated.div>
      </div>
    </section>
  );
};

export default Contact;

