"use client";

import { useEffect, useRef, useState } from "react";
import SlideUpText from "@/components/ui/SlideUpText";
import { stats, social } from "@/lib/content";
import { useInView } from "@/lib/hooks";
import "./Stats.css";

function parseMetric(val: string) {
  const hasPrefixPlus = val.startsWith("+");
  const cleaned = hasPrefixPlus ? val.slice(1) : val;

  if (cleaned.endsWith("M+")) {
    const num = parseFloat(cleaned.replace("M+", ""));
    return { target: num, prefix: hasPrefixPlus ? "+" : "", suffix: "M+", decimals: 1 };
  }
  if (cleaned.endsWith("+")) {
    const num = parseFloat(cleaned.replace("+", ""));
    return { target: num, prefix: hasPrefixPlus ? "+" : "", suffix: "+", decimals: 0 };
  }
  if (cleaned.includes(".") && !cleaned.includes("M")) {
    const parts = cleaned.split(".");
    if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3)) {
      const num = parseInt(cleaned.replace(/\./g, ""), 10);
      return { target: num, prefix: hasPrefixPlus ? "+" : "", suffix: "", separator: ".", decimals: 0 };
    }
  }
  const num = parseFloat(cleaned);
  return { target: isNaN(num) ? 0 : num, prefix: hasPrefixPlus ? "+" : "", suffix: "", decimals: 0 };
}

function RunningMetric({ value, delay = 0 }: { value: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.15);
  const hasAnimated = useRef(false);
  const initialValue = (() => {
    const { prefix = "", suffix = "", decimals = 0 } = parseMetric(value);
    return `${prefix}${decimals > 0 ? "0.0" : "0"}${suffix}`;
  })();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }

    const { target, prefix = "", suffix = "", decimals = 0, separator } = parseMetric(value);
    const duration = 1600;

    let rafId: number;
    const timerId = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
        if (!el) return;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - t, 4);
        const current = target * ease;

        let formatted = "";
        if (decimals > 0) {
          formatted = current.toFixed(decimals);
        } else if (separator === ".") {
          formatted = Math.round(current).toLocaleString("de-DE");
        } else {
          formatted = Math.round(current).toString();
        }

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          el.textContent = value;
        }
      };

      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
    };
  }, [inView, value, delay, ref]);

  return (
    <span ref={ref} className="tabular-nums">
      {initialValue}
    </span>
  );
}

/* Section [ 03 ] Beyond the Stage & Stats Showcase
   Experiential and live events metrics for Rock Castle Entertainment
*/
export default function Stats() {
  const figures = stats.figures;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      className="hoy-stats-section bg-[#1d1d1b] px-5 sm:px-8 lg:px-12 pt-14 md:pt-24 pb-16 md:pb-28"
      style={{ backgroundColor: "#1d1d1b" }}
    >
      {/* Container wrapper matching max content bounds */}
      <div className="mx-auto w-full max-w-[1760px]">
        {/* ========================================================================= */}
        {/* TOP INTRO BLOCK [ 03 ] Beyond the Stage                                    */}
        {/* ========================================================================= */}
        <div className="hoy-intro-cols mb-12 sm:mb-16 lg:mb-28">
          {/* Column 1: Section Index */}
          <div className="hoy-intro-col-1">
            <span className="text-xs md:text-[13px] font-medium tracking-wide text-[#f0f3a6]">
              <SlideUpText split="characters">
                {`[ ${stats.index} ]`}
              </SlideUpText>
            </span>
          </div>

          {/* Column 2: Beyond the Stage Eyebrow & Hero Statement */}
          <div className="hoy-intro-col-2">
            <p className="text-xs md:text-[13px] font-medium text-[#f0f3a6] mb-4">
              <SlideUpText split="words">
                {stats.label}
              </SlideUpText>
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-[27px] font-normal leading-[1.24] text-[#f0f3a6]">
              <SlideUpText split="words" stagger={0.012} delay={0.06}>
                {stats.heading}
              </SlideUpText>
            </h2>
          </div>

          {/* Column 3: Mobile Content / Brand Activations Aside */}
          <div className="hoy-intro-col-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block h-2.5 w-2.5 bg-[#f0f3a6] rounded-[1px] shrink-0" />
              <span className="text-xs md:text-[13px] font-medium text-[#f0f3a6]">
                <SlideUpText split="words" delay={0.04}>
                  {stats.mobile.label}
                </SlideUpText>
              </span>
            </div>
            <p className="text-xs md:text-[13px] leading-relaxed text-[#f0f3a6]/80 max-w-sm">
              <SlideUpText split="words" stagger={0.015} delay={0.1}>
                {stats.mobile.body}
              </SlideUpText>
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SHOWCASE ROW: Phone + Stats (Matches Reference Image 2)                    */}
        {/* ========================================================================= */}
        <div className="hoy-showcase-row">
          {/* Left Decorative Square Accent */}
          <div className="hoy-showcase-col-decor-left hidden lg:flex">
            <span
              aria-hidden
              className="h-2.5 w-2.5 bg-[#f0f3a6] rounded-[1px]"
            />
          </div>

          {/* Phone Mockup Column */}
          <div className="hoy-showcase-col-phone">
            <div className="hoy-phone-container">
              {/* Outer Pale-Yellow Border Shell */}
              <div className="hoy-phone-outline" />

              {/* Inner Screen Bezel */}
              <div className="hoy-phone-screen">
                {/* Status Bar */}
                <div className="hoy-phone-status text-white font-semibold text-[11px] md:text-xs">
                  <span>15:14</span>

                  {/* Dynamic Island pill */}
                  <div className="hoy-phone-camera" />

                  {/* Cellular, WiFi & Battery SVG */}
                  <div className="flex items-center">
                    <svg
                      width="58"
                      height="11"
                      viewBox="0 0 78 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[44px] md:w-[54px] h-auto"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.2 1.53295C19.2 0.899902 18.7224 0.386719 18.1333 0.386719H17.0667C16.4776 0.386719 16 0.899902 16 1.53295V11.4669C16 12.0999 16.4776 12.6131 17.0667 12.6131H18.1333C18.7224 12.6131 19.2 12.0999 19.2 11.4669V1.53295ZM11.7659 2.832H12.8326C13.4217 2.832 13.8992 3.3575 13.8992 4.00574V11.4394C13.8992 12.0876 13.4217 12.6131 12.8326 12.6131H11.7659C11.1768 12.6131 10.6992 12.0876 10.6992 11.4394V4.00574C10.6992 3.3575 11.1768 2.832 11.7659 2.832ZM7.43411 5.48105H6.36745C5.77834 5.48105 5.30078 6.01324 5.30078 6.66973V11.4244C5.30078 12.0809 5.77834 12.6131 6.36745 12.6131H7.43411C8.02322 12.6131 8.50078 12.0809 8.50078 11.4244V6.66973C8.50078 6.01324 8.02322 5.48105 7.43411 5.48105ZM2.13333 7.92634H1.06667C0.477563 7.92634 0 8.45093 0 9.09804V11.4414C0 12.0885 0.477563 12.6131 1.06667 12.6131H2.13333C2.72244 12.6131 3.2 12.0885 3.2 11.4414V9.09804C3.2 8.45093 2.72244 7.92634 2.13333 7.92634Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M34.7705 2.80222C37.2576 2.80232 39.6496 3.72441 41.4521 5.37789C41.5879 5.50554 41.8048 5.50393 41.9385 5.37428L43.236 4.11081C43.3037 4.04505 43.3414 3.95597 43.3409 3.86329C43.3403 3.77061 43.3015 3.68197 43.233 3.61697C38.502 -0.757741 31.0383 -0.757741 26.3073 3.61697C26.2387 3.68192 26.1999 3.77054 26.1992 3.86322C26.1986 3.9559 26.2363 4.045 26.3039 4.11081L27.6018 5.37428C27.7354 5.50413 27.9525 5.50574 28.0881 5.37789C29.8909 3.7243 32.2832 2.80221 34.7705 2.80222ZM34.7672 7.0225C36.1245 7.02241 37.4334 7.53415 38.4395 8.45828C38.5756 8.58943 38.7899 8.58659 38.9226 8.45187L40.2099 7.13256C40.2777 7.06336 40.3153 6.96948 40.3143 6.87193C40.3133 6.77438 40.2738 6.6813 40.2047 6.61351C37.1408 3.72266 32.3961 3.72266 29.3323 6.61351C29.2631 6.6813 29.2236 6.77443 29.2227 6.87201C29.2218 6.96959 29.2595 7.06346 29.3274 7.13256L30.6143 8.45187C30.747 8.58659 30.9614 8.58943 31.0974 8.45828C32.1029 7.53476 33.4107 7.02307 34.7672 7.0225ZM37.2916 9.81605C37.2935 9.9214 37.2565 10.023 37.1892 10.0968L35.0125 12.5515C34.9487 12.6236 34.8617 12.6642 34.7709 12.6642C34.6802 12.6642 34.5932 12.6236 34.5294 12.5515L32.3523 10.0968C32.2851 10.0229 32.2481 9.92131 32.2501 9.81596C32.2521 9.71061 32.2929 9.61085 32.3629 9.54023C33.753 8.22634 35.7889 8.22634 37.179 9.54023C37.2489 9.6109 37.2897 9.7107 37.2916 9.81605Z"
                        fill="white"
                      />
                      <rect
                        opacity="0.35"
                        x="50.8398"
                        y="0.5"
                        width="24"
                        height="12"
                        rx="3.8"
                        fill="white"
                        stroke="white"
                      />
                      <path
                        opacity="0.4"
                        d="M76.3398 4.78125V8.85672C77.1446 8.51155 77.6679 7.70859 77.6679 6.81899C77.6679 5.92938 77.1446 5.12642 76.3398 4.78125"
                        fill="white"
                      />
                      <rect
                        x="52.3398"
                        y="2"
                        width="21"
                        height="9"
                        rx="2.5"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>

                {/* Looping Content Video */}
                <video
                  ref={videoRef}
                  src="/video1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Floating Social Reactions (Hearts and Likes matching Screenshot 2) */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {/* Top Yellow Heart */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-heart right-[15%] top-[10%] h-8 w-8"
                    style={{ animationDelay: "0s" }}
                  >
                    <HeartIcon />
                  </div>

                  {/* Upper Yellow Heart */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-heart right-[20%] top-[20%] h-9 w-9"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <HeartIcon />
                  </div>

                  {/* Upper White Thumbs Up */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-like right-[10%] top-[23%] h-9 w-9"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <LikeIcon />
                  </div>

                  {/* Mid-Upper White Thumbs Up */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-like right-[22%] top-[37%] h-9 w-9"
                    style={{ animationDelay: "1.2s" }}
                  >
                    <LikeIcon />
                  </div>

                  {/* Mid White Thumbs Up */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-like right-[14%] top-[43%] h-8 w-8"
                    style={{ animationDelay: "1.8s" }}
                  >
                    <LikeIcon />
                  </div>

                  {/* Mid-Lower Yellow Heart */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-heart right-[22%] top-[49%] h-9 w-9"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <HeartIcon />
                  </div>

                  {/* Lower White Thumbs Up */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-like right-[11%] top-[56%] h-9 w-9"
                    style={{ animationDelay: "2.1s" }}
                  >
                    <LikeIcon />
                  </div>

                  {/* Lower White Thumbs Up */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-like right-[21%] top-[66%] h-9 w-9"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <LikeIcon />
                  </div>

                  {/* Bottom Yellow Heart */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-heart right-[14%] top-[77%] h-9 w-9"
                    style={{ animationDelay: "0.9s" }}
                  >
                    <HeartIcon />
                  </div>

                  {/* Bottom Subtle Yellow Heart */}
                  <div
                    className="hoy-reaction-badge hoy-reaction-heart right-[19%] top-[88%] h-8 w-8 opacity-70"
                    style={{ animationDelay: "1.7s" }}
                  >
                    <HeartIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Figures Column */}
          <div className="hoy-showcase-col-stats w-full">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:flex lg:flex-col lg:gap-11">
              {figures.map((item, index) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-xs md:text-[14px] font-normal text-[#f0f3a6]/80 mb-1">
                    <SlideUpText split="words" delay={0.06}>
                      {item.label}
                    </SlideUpText>
                  </span>
                  <span className="text-3xl sm:text-5xl lg:text-[72px] xl:text-[80px] font-normal tabular-nums leading-none tracking-[-0.04em] text-[#f0f3a6]">
                    <RunningMetric value={item.value} delay={index * 120} />
                  </span>
                </div>
              ))}
            </div>

            {/* Follow Us on Instagram CTA Button next to stats */}
            <div className="mt-8 lg:mt-12 flex items-center">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                aria-label="Follow Rock Castle on Instagram"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#f0f3a6] text-[#1d1d1b] font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_8px_24px_rgba(240,243,166,0.22)] active:scale-95 cursor-pointer select-none"
              >
                <InstagramIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-[#1d1d1b]" />
                <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                  Follow us on Instagram
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 font-bold">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Decorative Sparkle Star Accent */}
          <div className="hoy-showcase-col-decor-right hidden lg:flex">
            <SparkleIcon />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- SVG Icon Components directly extracted from Reference --- */

function HeartIcon() {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-3.5 text-[#1D1D1B]"
    >
      <path
        d="M24 7.33691C24 6.63575 23.8622 5.94154 23.5947 5.29395C23.3607 4.72735 23.0315 4.20612 22.6221 3.75293L22.4414 3.5625C21.9478 3.06708 21.3614 2.67426 20.7168 2.40625C20.072 2.13824 19.3803 2 18.6826 2C17.985 2.00006 17.294 2.1383 16.6494 2.40625C16.0852 2.64082 15.566 2.97092 15.1143 3.38184L14.9248 3.5625L13.708 4.7832C13.5205 4.97136 13.2657 5.07707 13 5.07715C12.7342 5.07715 12.4786 4.97143 12.291 4.7832L11.0742 3.5625C10.077 2.56214 8.72527 2.001 7.31641 2.00098C5.90755 2.00098 4.55583 2.56217 3.55859 3.5625C2.5613 4.56299 2.00007 5.92064 2 7.33691C2 8.75329 2.56123 10.1117 3.55859 11.1123L12.999 20.583L22.4414 11.1113C22.9352 10.6162 23.3273 10.0283 23.5947 9.38086C23.8622 8.73318 24 8.03818 24 7.33691ZM26 7.33691C26 8.29989 25.8108 9.25374 25.4434 10.1436C25.0758 11.0335 24.5369 11.8431 23.8574 12.5244L23.8564 12.5234L13.708 22.7061C13.5205 22.8942 13.2657 22.9999 13 23C12.7342 23 12.4786 22.8943 12.291 22.7061L2.1416 12.5234C0.77004 11.1473 0 9.28154 0 7.33691C6.97314e-05 5.39226 0.769941 3.52644 2.1416 2.15039C3.51343 0.774171 5.37496 0.000976562 7.31641 0.000976562C9.25782 0.000996834 11.1194 0.774184 12.4912 2.15039L12.999 2.66016L13.5088 2.15039C14.1878 1.46901 14.9942 0.928589 15.8818 0.55957C16.7696 0.19053 17.7214 5.80496e-05 18.6826 0C19.6439 0 20.5964 0.190474 21.4844 0.55957C22.372 0.928597 23.1784 1.469 23.8574 2.15039C24.5369 2.83168 25.0758 3.64039 25.4434 4.53027C25.8109 5.42011 26 6.3739 26 7.33691Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5 text-[#1D1D1B]"
    >
      <path
        d="M13.3984 4.29688C13.3984 3.69305 13.1547 3.11066 12.7158 2.67871C12.4216 2.38915 12.0555 2.18452 11.6572 2.08008L7.58301 11.1035V21.9766H19.1885C19.4904 21.9799 19.7816 21.8757 20.0078 21.6865C20.2334 21.4977 20.3785 21.2374 20.4219 20.9561L20.4229 20.9551L21.9629 11.0654C21.9888 10.8965 21.9772 10.7241 21.9287 10.5596C21.8801 10.3947 21.7958 10.2408 21.6797 10.1094C21.5634 9.97782 21.4181 9.87136 21.2539 9.79883C21.0897 9.72632 20.9106 9.68939 20.7295 9.69141H14.3984C13.8463 9.69129 13.3984 9.24362 13.3984 8.69141V4.29688ZM2 20.7793C2.00009 21.0916 2.12606 21.3943 2.35547 21.6201C2.58554 21.8465 2.90124 21.9766 3.2334 21.9766H5.58301V11.8896H3.2334C2.90124 11.8896 2.58554 12.0197 2.35547 12.2461C2.12607 12.4719 2.00006 12.7746 2 13.0869V20.7793ZM15.3984 7.69141H20.7188C21.181 7.68789 21.6396 7.78294 22.0625 7.96973C22.4887 8.15805 22.8693 8.43611 23.1777 8.78516C23.4863 9.13436 23.7158 9.54632 23.8477 9.99316C23.9795 10.4401 24.0104 10.9106 23.9395 11.3711V11.373L22.3984 21.2598L22.3994 21.2607C22.2813 22.0273 21.8859 22.723 21.291 23.2207C20.6994 23.7156 19.9489 23.9815 19.1777 23.9756V23.9766H3.2334C2.38104 23.9766 1.55966 23.6438 0.952148 23.0459C0.344261 22.4476 9.49763e-05 21.6324 0 20.7793V13.0869C5.87839e-05 12.2338 0.344271 11.4186 0.952148 10.8203C1.55966 10.2224 2.38104 9.88965 3.2334 9.88965H5.9375L10.1377 0.588867L10.207 0.459961C10.389 0.176097 10.7051 5.47237e-05 11.0488 0C12.1973 0 13.3022 0.448992 14.1191 1.25293C14.9365 2.05739 15.3984 3.15224 15.3984 4.29688V7.69141Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-[#f0f3a6]"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.2822 10.6685L14.9526 10.6685C12.9488 10.6685 11.3247 9.04439 11.3247 7.04057L11.3247 0.711897C11.3247 0.624892 11.254 0.554201 11.167 0.554201L10.2661 0.554201C10.1791 0.554201 10.1084 0.624892 10.1084 0.711897L10.1084 7.04148C10.1084 9.0453 8.48433 10.6694 6.48051 10.6694L0.151835 10.6694C0.06483 10.6694 -0.00586116 10.7401 -0.00586117 10.8271L-0.00586133 11.7279C-0.00586134 11.8149 0.0648298 11.8856 0.151834 11.8856L6.48141 11.8856C8.48524 11.8856 10.1093 13.5097 10.1093 15.5135L10.1093 21.8431C10.1093 21.9301 10.18 22.0008 10.267 22.0008L11.1679 22.0008C11.2549 22.0008 11.3256 21.9301 11.3256 21.8431L11.3256 15.5135C11.3256 13.5097 12.9497 11.8856 14.9535 11.8856L21.2831 11.8856C21.3701 11.8856 21.4408 11.8149 21.4408 11.7279L21.4408 10.8271C21.4408 10.7401 21.3701 10.6694 21.2831 10.6694L21.2822 10.6685Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
