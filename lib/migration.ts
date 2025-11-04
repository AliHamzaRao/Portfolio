import Education from "../models/Education"
import Experience from "../models/Experience"
import Profile from "../models/Profile"
import Project from "../models/Project"
import Skill from "../models/Skill"
import dbConnect from "./mongodb"

const defaultData = {
  profile: {
    name: "Ali Hamza Rao",
    title: "Senior Software Engineer",
    description:
      "Crafting elegant solutions to complex problems. With a passion for clean code and user-centric design, I bring ideas to life through innovative web applications.",
    email: "hamzaraoa010@gmail.com",
    phone: "+92 311 4637356",
    location: "Pakistan",
    socialLinks: {
      github: "https://github.com/AliHamzaRao",
      linkedin: "https://linkedin.com/in/AliHamzaRao",
      twitter: "https://twitter.com/AliHamzaRao",
    },
    aboutMe:
      "As a Senior Software Engineer with more than 7 years of experience, I specialize in enhancing performance, optimizing user interfaces, and ensuring seamless user experiences. I have a proven track record in launching innovative web services and applications, driving technical leadership, and fostering cross-functional collaboration. My expertise bridges development and design, focusing on high-performance, scalable solutions that drive organizations forward.",
  },
  projects: [
    {
      title: "Bizly",
      shortDescription: "A cutting-edge social platform built with a focus on reusability and clean code architecture.",
      fullDescription:
        "Bizly is a next-generation social networking platform designed for professionals. It features a modular architecture that allows for easy scaling and maintenance, showcasing best practices in modern web development.",
      technologies: ["React", "Redux", "Node.js", "GraphQL", "PostgreSQL"],
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      order: 1,
    },
    {
      title: "Ereqs-Lab",
      shortDescription:
        "A sophisticated SaaS-based CMS tailored for creating and managing medical portals for laboratories.",
      fullDescription:
        "Ereqs-Lab is a comprehensive content management system designed specifically for medical laboratories. It streamlines the process of managing patient data, test results, and laboratory workflows, improving efficiency and accuracy in medical reporting.",
      technologies: ["Vue.js", "Nuxt.js", "Express.js", "MySQL", "Docker"],
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      order: 2,
    },
    {
      title: "PIPER",
      shortDescription:
        "An innovative Medical Registry system designed for tracking and managing health data for pregnant women.",
      fullDescription:
        "PIPER (Pregnancy Information and Prenatal Electronic Registry) is a specialized medical registry system that helps healthcare providers track and manage the health data of pregnant women throughout their pregnancy journey. It offers features like appointment scheduling, health metric tracking, and personalized care plans.",
      technologies: [".NET Core", "Angular", "SQL Server", "Azure Cloud Services"],
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      order: 3,
    },
  ],
  skills: [
    { name: "JavaScript", icon: "🟨", category: "Frontend", order: 1 },
    { name: "TypeScript", icon: "🔵", category: "Frontend", order: 2 },
    { name: "Vue.js", icon: "🟩", category: "Frontend", order: 3 },
    { name: "Nuxt3", icon: "🟩", category: "Frontend", order: 4 },
    { name: "Angular", icon: "🔴", category: "Frontend", order: 5 },
    { name: "React.js", icon: "🔵", category: "Frontend", order: 6 },
    { name: "Node.js", icon: "🟩", category: "Backend", order: 7 },
    { name: "Python", icon: "🟦", category: "Backend", order: 8 },
    { name: ".NET Core", icon: "🟪", category: "Backend", order: 9 },
    { name: "MongoDB", icon: "🟩", category: "Database", order: 10 },
    { name: "MySQL", icon: "🐬", category: "Database", order: 11 },
    { name: "PostgreSQL", icon: "🐘", category: "Database", order: 12 },
    { name: "MS SQL", icon: "🔵", category: "Database", order: 13 },
    { name: "Git", icon: "🔄", category: "Tools", order: 14 },
    { name: "SVN", icon: "📚", category: "Tools", order: 15 },
  ],
  experiences: [
    {
      title: "Frontend Developer UIUX/ VUE.JS",
      company: "Techscale",
      period: "Dec 2024 - June 2025",
      description:
        "Spearheading the development of cutting-edge user interfaces, I blend modern design principles with robust Vue.js implementations to create seamless, responsive web applications that push the boundaries of user experience.",
      order: 1,
    },
    {
      title: "Senior Software Engineer",
      company: "MentorSol",
      period: "Sept 2024 - Dec 2024",
      description:
        "Led complex projects and mentored junior developers, driving the adoption of best practices in software architecture and code quality. My role was pivotal in elevating the team's capabilities and delivering high-performance, scalable solutions.",
      order: 2,
    },
    {
      title: "MERN Stack Developer",
      company: "MentorSol",
      period: "June 2023 - Sept 2024",
      description:
        "Architected and developed full-stack applications using MongoDB, Express.js, React, and Node.js. My focus on creating intuitive user interfaces and optimizing backend performance resulted in highly efficient and user-friendly web applications.",
      order: 3,
    },
    {
      title: "Software Engineer Dotnet",
      company: "Cimplet Technologies",
      period: "June 2022 - June 2023",
      description:
        "Leveraged .NET technologies to design and implement robust web applications. My work involved creating scalable backend systems and integrating them with responsive front-end interfaces, ensuring optimal performance and user satisfaction.",
      order: 4,
    },
    {
      title: "Frontend Developer",
      company: "2B VisionTechnologies",
      period: "Feb. 2020 - June 2022",
      description:
        "Began my journey as a junior developer and quickly progressed to handling complex frontend tasks. I played a key role in modernizing legacy interfaces and implementing new features that significantly improved user engagement and satisfaction.",
      order: 5,
    },
    {
      title: "Trainee Web Developer",
      company: "Vvork Cloud Technologies",
      period: "Sept. 2018 - Feb 2020",
      description:
        "I was a trainee there and learnt all basics about web development that built a strong foundation of everything I know now.",
      order: 5,
    },
  ],
  education: [
    {
      degree: "Bachelors of Sciences in Computer Science",
      institution: "Lahore Leads University",
      period: "2020 - 2024",
      description: "Focused on software engineering, data structures, and algorithms.",
      order: 1,
    },
    {
      degree: "MERN Stack Development Certification",
      institution: "Vvork Cloud Technologies",
      period: "2018",
      description:
        "Comprehensive training in MongoDB, Express.js, React, and Node.js, covering fundamentals of web development with hands-on experience.",
      order: 2,
    },
    {
      degree: "Social Media Marketing Workshop",
      institution: "Online Course",
      period: "2019",
      description: "Learned about using colors to attract audience and finding niche audiences.",
      order: 3,
    },
  ],
}

export async function runMigration() {
  await dbConnect()

  // Seed Profile
  await Profile.findOneAndUpdate({}, defaultData.profile, { upsert: true })

  // Seed Projects
  await Project.deleteMany({})
  await Project.insertMany(defaultData.projects)

  // Seed Skills
  await Skill.deleteMany({})
  await Skill.insertMany(defaultData.skills)

  // Seed Experiences
  await Experience.deleteMany({})
  await Experience.insertMany(defaultData.experiences)

  // Seed Education
  await Education.deleteMany({})
  await Education.insertMany(defaultData.education)

  console.log("Migration completed successfully")
}

