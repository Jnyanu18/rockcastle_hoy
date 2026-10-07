import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Work from "@/components/Work";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Work />
        <About />
        <Stats />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
