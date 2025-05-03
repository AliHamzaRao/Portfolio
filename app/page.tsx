import Header from "../components/Header"
import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Experience from "../components/Experience"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Testimonials from "../components/Testimonials"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
