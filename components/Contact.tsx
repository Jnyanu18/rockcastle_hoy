"use client";

import Link from "next/link";
import { contact } from "@/lib/content";
import Sparkle from "@/components/ui/Sparkle";
import SlideUpText from "@/components/ui/SlideUpText";

/* Pale-yellow closing call matching House of Yellow [ 08 ] Let's connect:
   - Left: [ 08 ] index with outlined squarish rounded frame containing an upper-third sparkle mark
   - Right: "Let's connect" eyebrow, massive dark headline, "Built for brands that want to lead." subhead, and white scrolling pill button
*/
export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-center bg-[#1d1d1b] px-5 py-14 sm:px-10 md:px-14 md:py-20 lg:px-20 text-[#f2efa3] overflow-hidden">
      <div className="mx-auto w-full max-w-[1680px]">
        {/* Mobile top meta row */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <p className="text-xs font-medium tracking-normal text-[#f2efa3]">
            <SlideUpText split="words">
              {contact.label}
            </SlideUpText>
          </p>
          <p className="text-xs font-medium tracking-normal text-[#f2efa3] tabular-nums">
            <SlideUpText split="characters" delay={0.04}>
              {`[ ${contact.index} ]`}
            </SlideUpText>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[clamp(220px,20vw,320px)_1fr] md:gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column (Desktop): [ 08 ] and shifted outlined frame */}
          <div className="hidden md:flex flex-col">
            <p className="text-xs md:text-[13px] font-medium tracking-normal text-[#f2efa3] tabular-nums">
              <SlideUpText split="characters" delay={0.04}>
                {`[ ${contact.index} ]`}
              </SlideUpText>
            </p>
            <div
              aria-hidden
              className="relative mt-6 md:mt-7 aspect-[1/1.08] w-full max-w-[220px] rounded-[32px] md:rounded-[36px] border border-white/20"
            >
              <Sparkle
                size={36}
                className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 text-[#f2efa3]"
              />
            </div>
          </div>

          {/* Right Column: Let's connect, headlines, and white pill CTA */}
          <div className="flex flex-col md:pl-[clamp(16px,2vw,40px)]">
            <p className="hidden md:block text-xs md:text-[13px] font-medium tracking-normal text-[#f2efa3]">
              <SlideUpText split="words">
                {contact.label}
              </SlideUpText>
            </p>

            <h2 className="md:mt-6 max-w-[880px] text-[24px] sm:text-[30px] md:text-[36px] lg:text-[44px] xl:text-[50px] font-medium leading-[1.12] sm:leading-[1.08] tracking-[-0.03em] text-[#f2efa3]">
              <SlideUpText split="words" stagger={0.015} delay={0.06}>
                {contact.heading}
              </SlideUpText>
            </h2>

            <p className="mt-5 sm:mt-6 md:mt-7 max-w-[700px] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] xl:text-[36px] font-medium leading-[1.12] sm:leading-[1.08] tracking-[-0.03em] text-white/85">
              <SlideUpText split="words" stagger={0.02} delay={0.12}>
                {contact.subheading}
              </SlideUpText>
            </p>

            {/* Mobile: button on left and squircle frame on right; Desktop: button only (frame is in left col) */}
            <div className="mt-8 sm:mt-10 md:mt-10 flex items-center justify-between gap-4">
              <Link
                href="/contact"
                className="contact-pill-btn shrink-0"
                data-magnetic
                aria-label="Connect with Rockcastle"
              >
                <div className="contact-pill-track-mask">
                  <div className="contact-pill-track">
                    <span>CONNECT</span>
                    <span>CONNECT</span>
                    <span>CONNECT</span>
                    <span>CONNECT</span>
                    <span>CONNECT</span>
                    <span>CONNECT</span>
                  </div>
                </div>
              </Link>

              {/* Mobile squircle with center sparkle star sitting beside the button (matches reference image) */}
              <div
                aria-hidden
                className="flex md:hidden h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] shrink-0 items-center justify-center rounded-[28px] border border-white/20 shadow-sm"
              >
                <Sparkle
                  size={32}
                  className="text-[#f2efa3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
