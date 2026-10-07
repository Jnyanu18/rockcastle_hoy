import Link from "next/link";
import { contact } from "@/lib/content";
import Sparkle from "@/components/ui/Sparkle";

/* Dark closing call matching House of Yellow [ 08 ] Let's connect:
   - Left: [ 08 ] index with outlined squarish rounded frame containing an upper-third sparkle mark
   - Right: "Let's connect" eyebrow, massive pale-yellow headline, "Built for brands that want to lead." subhead, and white scrolling pill button
*/
export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#141413] px-5 py-14 sm:px-10 md:px-14 md:py-28 lg:px-20 lg:py-32 text-[#edeea5] overflow-hidden">
      <div className="mx-auto max-w-[1680px]">
        {/* Mobile top meta row */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <p className="text-xs font-medium tracking-normal text-[#edeea5]">
            {contact.label}
          </p>
          <p className="text-xs font-medium tracking-normal text-[#edeea5] tabular-nums">
            [ {contact.index} ]
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[clamp(340px,28vw,450px)_1fr] md:gap-14 lg:gap-20 xl:gap-28 items-start">
          {/* Left Column (Desktop): [ 08 ] and shifted outlined frame */}
          <div className="hidden md:flex flex-col">
            <p className="text-xs md:text-[13px] font-medium tracking-normal text-[#edeea5] tabular-nums">
              [ {contact.index} ]
            </p>
            <div
              aria-hidden
              className="relative mt-7 md:mt-9 md:ml-[clamp(48px,5.5vw,110px)] aspect-[1/1.08] w-full max-w-[360px] rounded-[44px] md:rounded-[52px] border border-[#edeea5]/40"
            >
              <Sparkle
                size={44}
                className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 text-[#edeea5]"
              />
            </div>
          </div>

          {/* Right Column: Let's connect, headlines, and white pill CTA */}
          <div className="flex flex-col md:pl-[clamp(24px,2.5vw,56px)]">
            <p className="hidden md:block text-xs md:text-[13px] font-medium tracking-normal text-[#edeea5]">
              {contact.label}
            </p>

            <h2 className="md:mt-9 max-w-[1150px] text-[26px] sm:text-[38px] md:text-[52px] lg:text-[66px] xl:text-[76px] font-medium leading-[1.08] sm:leading-[1.04] tracking-[-0.035em] text-[#edeea5]">
              If you&apos;re looking for a creative<br className="hidden md:inline" />{" "}
              partner that combines<br className="hidden md:inline" />{" "}
              craftsmanship, speed and<br className="hidden md:inline" />{" "}
              impact, let&apos;s make something<br className="hidden md:inline" />{" "}
              remarkable.
            </h2>

            <p className="mt-8 sm:mt-12 md:mt-16 max-w-[960px] text-[22px] sm:text-[32px] md:text-[46px] lg:text-[56px] xl:text-[68px] font-medium leading-[1.08] sm:leading-[1.04] tracking-[-0.035em] text-[#edeea5]">
              Built for brands that want to<br className="hidden md:inline" />{" "}
              lead.
            </p>

            {/* Mobile: button on left and squircle frame on right; Desktop: button only (frame is in left col) */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-between gap-4">
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
                className="flex md:hidden h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] shrink-0 items-center justify-center rounded-[28px] border border-[#edeea5]/50 shadow-sm"
              >
                <Sparkle
                  size={32}
                  className="text-[#edeea5]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
