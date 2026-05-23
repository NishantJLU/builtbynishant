import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import Projects from "@/components/sections/Projects";
import Terminal from "@/components/sections/Terminal";
import Footer from "@/components/sections/Footer";
import ScrollSectionWrapper from "@/components/ui/ScrollSectionWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden selection:bg-neon-cyan/20 selection:text-white">
      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <Hero />

      {/* Bento Grid Skills & Specialties */}
      <ScrollSectionWrapper>
        <BentoGrid />
      </ScrollSectionWrapper>

      {/* Projects Showcase Dashboard */}
      <ScrollSectionWrapper>
        <Projects />
      </ScrollSectionWrapper>

      {/* Retro Systems AI Terminal */}
      <ScrollSectionWrapper>
        <Terminal />
      </ScrollSectionWrapper>

      {/* Minimalist Contacts Directory & Socials */}
      <Footer />
    </main>
  );
}
