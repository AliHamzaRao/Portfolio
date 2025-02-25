"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Education {
  _id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

const Education = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { duration: 1000 },
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("/api/education");
        const data = await response.json();
        if (data.success) {
          setEducation(data.data);
        }
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  return (
    <animated.section
      ref={ref}
      style={fadeIn}
      id="education"
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Education & Certifications
        </h2>
        {education.map((edu) => (
          <Card key={edu._id} className="mb-6">
            <CardHeader>
              <CardTitle>{edu.degree}</CardTitle>
              <CardDescription>{edu.institution}</CardDescription>
              <CardDescription>{edu.period}</CardDescription>
            </CardHeader>
            {edu.description && (
              <CardContent>
                <p>{edu.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </animated.section>
  );
};

export default Education;

