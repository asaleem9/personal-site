import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About';
import Expertise from '@/components/sections/Expertise';
import Experience from '@/components/sections/Experience/Experience';
import Work from '@/components/sections/Work';
import GitHub from '@/components/sections/GitHub';
import Philosophy from '@/components/sections/Philosophy';
import Contact from '@/components/sections/Contact/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* Hero Section - Full 3D architectural scene */}
      <Hero />

      {/* About - Introduction and stats */}
      <About />

      {/* Expertise - Skills grid */}
      <Expertise />

      {/* Experience - Narrative scroll through career */}
      <Experience />

      {/* Work - Case studies and projects */}
      <Work />

      {/* GitHub - Open source repositories */}
      <GitHub />

      {/* Philosophy - How I work */}
      <Philosophy />

      {/* Contact - Form and social links */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}
