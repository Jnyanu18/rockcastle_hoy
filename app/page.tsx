import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecentExperiences from "@/components/sections/RecentExperiences";
import Statement from "@/components/Statement";
import Works from "@/components/Works";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Services from "@/components/Services";
import ScrollingServices from "@/components/sections/ScrollingServices";
import Contact from "@/components/Contact";
import BriefForm from "@/components/sections/BriefForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RecentExperiences />
        <Statement />
        <Works />
        <Clients />
        <Stats />
        <Process />
        <Services />
        <ScrollingServices />
        <Contact />
        <BriefForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
