"use client"

import { useSpring, animated } from "@react-spring/web"
import { Github, Linkedin, Twitter } from "lucide-react"
import { useState } from "react"

const Footer = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  })

  return (
    <animated.footer style={fadeIn} className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Ali Hamza Rao. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <SocialLink href="https://github.com/AliHamzaRao" icon={<Github />} />
            <SocialLink href="https://linkedin.com/in/AliHamzaRao" icon={<Linkedin />} />
            <SocialLink href="https://twitter.com/AliHamzaRao" icon={<Twitter />} />
          </div>
        </div>
      </div>
    </animated.footer>
  )
}

const SocialLink = ({ href, icon }) => {
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    transform: isHovered ? "scale(1.2)" : "scale(1)",
    config: { tension: 300, friction: 10 },
  })

  return (
    <animated.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-300"
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </animated.a>
  )
}

export default Footer

