"use client";

import { animated, config, useTrail } from "@react-spring/web";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Badge } from "./ui/badge";

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fetchSkills = useCallback(async () => {
    try {
      const response = await fetch("/api/skills", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      const data = await response.json();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const trail = useTrail(skills.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: config.wobbly,
  });

  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Skills & Technologies
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          My toolkit is diverse and ever-expanding. Here are some of the
          technologies I've mastered:
        </p>
        <div ref={ref} className="flex flex-wrap justify-center gap-4">
          {trail.map((props, index) => (
            <animated.div key={skills[index]._id} style={props}>
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2 bg-white dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
              >
                {skills[index].icon && (
                  <Image
                    src={skills[index].icon || "/placeholder.svg"}
                    alt={skills[index].name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                )}
                {skills[index].name}
              </Badge>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
