"use client";

import Link from "next/link";
import SlideUpText from "@/components/ui/SlideUpText";
import { process as processContent } from "@/lib/content";

/* Section [ 04 ] How we roll
   Exact House of Yellow Architecture matching Reference Image 1:
   - Col 1 (left): "How we roll"
   - Col 2 (center): Primary statement & supporting paragraph
   - Col 3 (right): Top "[ 04 ]", bottom white ticker pill button ("SCROLL HOW WE ROLL \")
*/
export default function Process() {
  return (
    <section
      id="process"
      className="relative bg-[#f4f6f9] text-[#111925] px-5 sm:px-8 lg:px-12 pt-14 md:pt-24 pb-16 md:pb-32 overflow-hidden"
      style={{ backgroundColor: "#f4f6f9" }}
    >
      <div className="mx-auto w-full max-w-[1760px]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          {/* Column 1: Label + Index on Mobile (24vw) */}
          <div className="flex w-full items-center justify-between lg:w-[24.0625vw] shrink-0">
            <span className="text-xs md:text-[13px] font-medium tracking-wide text-[#111925]">
              <SlideUpText split="words">
                {processContent.label}
              </SlideUpText>
            </span>
            <span className="text-xs md:text-[13px] font-medium tabular-nums text-[#111925] lg:hidden">
              <SlideUpText split="characters" delay={0.04}>
                {`[ ${processContent.index} ]`}
              </SlideUpText>
            </span>
          </div>

          {/* Column 2: Large Statement + Subparagraph (40vw) */}
          <div className="w-full lg:w-[40.125vw] lg:pr-8">
            <h2 className="text-base sm:text-xl lg:text-[24px] font-normal leading-[1.28] sm:leading-[1.24] text-[#111925]">
              <SlideUpText split="words" stagger={0.012} delay={0.06}>
                {processContent.body}
              </SlideUpText>
            </h2>
            <p className="mt-5 sm:mt-8 text-xs md:text-[13px] font-normal leading-relaxed text-[#111925]/80 max-w-md">
              <SlideUpText split="words" stagger={0.015} delay={0.12}>
                {processContent.sub}
              </SlideUpText>
            </p>
          </div>

          {/* Column 3: Index [ 04 ] + Bottom-Right Inline Button (30vw) */}
          <div className="w-full lg:w-[30.8125vw] flex flex-col justify-between items-start lg:items-end lg:min-h-[220px] shrink-0">
            {/* Top Index (Desktop only) */}
            <div className="hidden lg:block text-right">
              <span className="text-xs md:text-[13px] font-medium tabular-nums text-[#111925]">
                <SlideUpText split="characters" delay={0.04}>
                  {"[ 04 ]"}
                </SlideUpText>
              </span>
            </div>

            {/* Bottom-Right White Ticker Marquee Button (Normal Compact Pill Size) */}
            <div className="mt-6 lg:mt-auto pt-2 lg:pt-4">
              <a
                href="#services"
                className="process-pill-btn"
                data-magnetic
                aria-label="How we roll"
              >
                {/* Scrolling Ticker Text */}
                <div className="process-pill-track-mask">
                  <div className="process-pill-track">
                    <span>HOW WE ROLL </span>
                    <span>HOW WE ROLL </span>
                    <span>HOW WE ROLL </span>
                    <span>HOW WE ROLL </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
