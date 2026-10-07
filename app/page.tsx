import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import SocialSection from "@/components/home/SocialSection";
import CaseStudies from "@/components/home/CaseStudies";
import Awards from "@/components/home/Awards";
import Clients from "@/components/home/Clients";
import Team from "@/components/home/Team";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

/* Homepage order is fixed by the brief: 00 Hero → 08 Contact → Footer. */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <FeaturedWork />
        <SocialSection />
        <CaseStudies />
        <Awards />
        <Clients />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
