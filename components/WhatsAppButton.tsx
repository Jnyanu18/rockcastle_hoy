import { social } from "@/lib/content";

/* Fixed round messaging button, bottom-right, optimized for mobile and desktop. */
export default function WhatsAppButton() {
  return (
    <a
      href={social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      data-magnetic
      data-magnetic-strength="0.38"
      className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform duration-300 active:scale-95 hover:scale-105 hover:bg-canvas md:bottom-6 md:right-6 md:h-11 md:w-11 md:shadow-none"
    >
      <svg
        className="h-4 w-4 md:h-5 md:w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M4 20l1.3-4A8 8 0 1 1 8.2 18.7L4 20z" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
