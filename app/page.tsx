import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RecentExperiences from "@/components/sections/RecentExperiences";
import { WhoWeAre } from "@/components/figma/FigmaSections";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import ScrollingServices from "@/components/sections/ScrollingServices";
import Awards from "@/components/Awards";
import Leadership from "@/components/sections/Leadership";
import Footer from "@/components/Footer.jsx";
import WhatsAppButton from "@/components/WhatsAppButton";
import Cinematics from "@/components/cinematics/Cinematics";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Sticky Hero with Curtain-rising Statement (Who are we) Scroll Effect */}
        <div className="relative z-20">
          <Hero />
          <WhoWeAre />
        </div>
        <RecentExperiences />
        <Stats />
        <Process />
        <ScrollingServices id="services" />
        <Awards />
        <Leadership />
        <Clients />
      </main>
      <Footer />
      <WhatsAppButton />
      <Cinematics />
    </>
  );
}
