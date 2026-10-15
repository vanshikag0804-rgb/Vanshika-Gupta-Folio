import { Footer } from '../components/Closing'
import { Hero } from '../components/Hero'
import { LogoMarquee } from '../components/LogoMarquee'
import { Navbar } from '../components/Navbar'
import { ExpertiseSection, FeaturedSection, RolesSection } from '../components/Sections'
import { WorkSection } from '../components/Work'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <RolesSection />
        <ExpertiseSection />
        <FeaturedSection />
        <WorkSection />
      </main>
      <Footer />
    </>
  )
}
