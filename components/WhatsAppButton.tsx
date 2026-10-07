import { social } from "@/lib/content";

/* Fixed round messaging button, bottom-right, optimized for mobile and desktop. */
export default function WhatsAppButton() {
  return (
    <a
      href={social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-ink shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform duration-300 active:scale-95 hover:scale-105 md:bottom-6 md:right-6 md:h-14 md:w-14 md:shadow-none"
    >
      <svg
        className="h-5 w-5 md:h-6 md:w-6"
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
