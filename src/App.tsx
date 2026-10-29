import './styles/globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Interests } from '@/components/Interests'
import { Contact } from '@/components/Contact'
import { LatestProjects } from '@/components/LatestProjects'
import { DevOpsJourney } from '@/components/DevOpsJourney'
import { EventsJourney } from '@/components/EventsJourney'

function App() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <Hero />
        <Section id="about" title="About">
          <About />
        </Section>
        <Section id="latest" title="Latest Project">
          <LatestProjects />
        </Section>
        <Section id="education" title="Education">
          <Education />
        </Section>
        <Section id="experience" title="Experience">
          <Experience />
        </Section>
        <Section
          id="devops"
          title="DevOps Journey"
          description="Engineering practice grouped by domain, not chronology."
        >
          <DevOpsJourney />
        </Section>
        <Section
          id="events"
          title="Hackathons & Technical Journey"
          description="Events, challenges, and verified learning experiences."
        >
          <EventsJourney />
        </Section>
        <Section id="projects" title="Projects">
          <Projects />
        </Section>
        <Section id="interests" title="Interests">
          <Interests />
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <Footer />
    </div>
  )
}

export default App
