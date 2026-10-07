import { social } from "@/lib/content";

/* Fixed round messaging button, bottom-right, as in the reference. */
export default function WhatsAppButton() {
  return (
    <a
      href={social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-canvas text-ink shadow-none transition-transform duration-300 hover:scale-105"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 20l1.3-4A8 8 0 1 1 8.2 18.7L4 20z" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
