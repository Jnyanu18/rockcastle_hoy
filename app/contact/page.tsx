import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import BriefForm from "@/components/sections/BriefForm";
import Footer from "@/components/Footer.jsx";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact — Rock Castle",
  description:
    "Get in touch with Rock Castle. Whether you have an impossible brief, need production at scale, or want to talk shape — our team is ready.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-canvas main--contact !shadow-none" style={{ boxShadow: "none" }}>
        <BriefForm className="bg-canvas px-4 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
