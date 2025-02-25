"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { animated, useSpring } from "@react-spring/web";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const { profile } = useProfile();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.footer style={fadeIn} className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()} {profile?.name}. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            {profile?.socialLinks.map((link, index) => (
              <SocialLink
                key={index}
                href={link.url}
                platform={link.platform}
              />
            ))}
          </div>
        </div>
      </div>
    </animated.footer>
  );
};

const SocialLink = ({ href, platform }: { href: string; platform: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isHovered ? "scale(1.2)" : "scale(1)",
    config: { tension: 300, friction: 10 },
  });

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github />;
      case "linkedin":
        return <Linkedin />;
      case "twitter":
        return <Twitter />;
      default:
        return null;
    }
  };

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
      {getIcon(platform)}
    </animated.a>
  );
};

export default Footer;

