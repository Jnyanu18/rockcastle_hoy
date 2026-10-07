import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecentExperiences from "@/components/sections/RecentExperiences";
import Statement from "@/components/Statement";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import ScrollingServices from "@/components/sections/ScrollingServices";
import Leadership from "@/components/sections/Leadership";
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
        <Statement />
        <RecentExperiences />
        <Stats />
        <Process />
        <ScrollingServices />
        <Leadership />
        <Clients />
        <Contact />
        <BriefForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
