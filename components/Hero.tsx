"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { animated, config, useSpring } from "@react-spring/web";
import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  const { profile, loading } = useProfile();

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.molasses,
  });

  const imageSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.8) rotate(-10deg)" },
    to: { opacity: 1, transform: "scale(1) rotate(0deg)" },
    config: config.wobbly,
  });

  const titleProps = useSpring({
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: config.molasses,
    delay: 300,
  });

  const subtitleProps = useSpring({
    from: { opacity: 0, transform: "translateX(50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: config.molasses,
    delay: 600,
  });

  if (loading) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <animated.div
          style={fadeIn}
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
        >
          <animated.h1 style={titleProps} className="text-5xl font-bold mb-4">
            {profile?.name}
          </animated.h1>
          <animated.h2 style={subtitleProps} className="text-3xl mb-6">
            {profile?.title}
          </animated.h2>
          <animated.p style={fadeIn} className="text-xl mb-8 max-w-lg">
            {profile?.description}
          </animated.p>
          <Button
            asChild
            className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300"
          >
            <a href="#contact">Let's Create Something Amazing</a>
          </Button>
        </animated.div>
        <animated.div
          style={imageSpring}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src={profile?.image || "/placeholder.svg"}
              alt={profile?.name || "Profile"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default Hero;

