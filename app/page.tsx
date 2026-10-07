import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Works from "@/components/Works";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Works />
        <Clients />
        <Stats />
        <Process />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
