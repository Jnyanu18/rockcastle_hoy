import { social } from "@/lib/content";

/* Fixed round messaging button, bottom-right, coded with pure SVG hand-mic emblem. */
export default function WhatsAppButton() {
  return (
    <a
      href={social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      data-magnetic
      data-magnetic-strength="0.38"
      className="fixed bottom-5 right-5 z-50 flex h-[60px] w-[60px] items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 md:bottom-8 md:right-8 md:h-[70px] md:w-[70px]"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-contain filter drop-shadow-[0_8px_26px_rgba(0,0,0,0.38)] transition-transform duration-300"
        aria-hidden="true"
      >
        {/* Centered Circle Base */}
        <circle cx="32" cy="32" r="28" fill="#ea7700" />

        {/* Pure Code Vector Hand & Microphone Outline */}
        <g
          transform="translate(32, 32) scale(0.91) translate(-37.5, -42.75)"
          stroke="#ffffff"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Microphone Head: Dome, Sides, Center Band & Collar */}
          <path d="M 43.5 35.5 L 44 31.5 C 44 28 46.5 27 48.8 27.2 C 51 27.5 52.8 29 53 31.5 L 49.5 35.5" />
          <path d="M 44.2 31.5 C 47 32.2 49.8 32.2 52.8 31.5" />
          <path d="M 43.2 35.8 C 45.5 36.8 47.8 36.8 49.8 35.8" />
          
          {/* Microphone Handle / Shaft */}
          <path d="M 43 36.8 L 41.5 38.5" />
          <path d="M 48 36.8 L 46 39" />
          <path d="M 37.5 41.8 L 33 49" />
          
          {/* Thumb wrapping over handle */}
          <path d="M 34.5 40.5 C 34.5 38.5 37 37.5 39.5 37.5 C 41.8 37.5 42.8 38.5 42.8 40.2 C 42.8 41.5 40.8 41.8 38 41.8" />
          
          {/* 4 Curled Fingers on Right Side of Handle */}
          <path d="M 41.5 39.5 C 43.5 38.8 46.2 39.5 46.2 41.2 C 46.2 42.5 44 42.8 39.5 42.8" />
          <path d="M 39.5 42.8 C 42.2 42.2 45.2 42.5 45.2 44.2 C 45.2 45.5 43 45.5 38.2 45.2" />
          <path d="M 38.2 45.2 C 40.8 44.6 44.2 44.8 44.2 46.6 C 44.2 47.8 42.2 47.8 37 47.6" />
          <path d="M 37 47.6 C 39.5 47.3 42.5 47.6 42.5 49.3 C 42.5 50.8 40 51 35.5 50.5" />
          
          {/* Hand Palm & Wrist going into cuff */}
          <path d="M 34.5 40.5 C 31.5 42.5 29.5 45 28 47" />
          <path d="M 35.5 50.5 C 34 50.5 32 49 31.5 48" />
          
          {/* Sleeve Cuff: Angled rectangular fold */}
          <path d="M 27 46.5 L 34.5 42.5 L 37.5 45.5 L 30 49.5 Z" />
          
          {/* Forearm lines extending from cuff down to edge */}
          <path d="M 27 46.5 C 23.5 49.5 20.5 52.5 17.5 55.5" />
          <path d="M 30 49.5 C 28.5 52 26.5 54 24.5 55.5" />
          
          {/* Cable curling along circle bottom contour naturally */}
          <path d="M 12 56 C 15 57.5 19 57.8 23 57 C 26 56.2 27.5 54.5 28.5 52" />
        </g>
      </svg>
    </a>
  );
}
