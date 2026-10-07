import { brand } from "@/data/content";

/** Fixed yellow chat button, bottom right, present on every screen. */
export default function FloatingChat() {
  return (
    <a
      href={brand.chatHref}
      aria-label="Start a conversation"
      className="fixed bottom-8 right-[var(--gutter)] z-40 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-pale text-night transition-transform duration-500 ease-cinematic hover:scale-105 max-md:bottom-6 max-md:h-14 max-md:w-14"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M4 5h16v11H9l-5 4V5z" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
