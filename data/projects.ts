/* Work content: featured categories (section 02) and flagship case studies (section 04).
 * PLACEHOLDER titles and imagery until client work is supplied. */

export type Media = { alt: string; ratio: string };

export const featuredCategories = [
  { slug: "live-events", title: "Live Events", media: { alt: "PLACEHOLDER live event", ratio: "4 / 5" } },
  { slug: "brand-experiences", title: "Brand Experiences", media: { alt: "PLACEHOLDER brand activation", ratio: "1 / 1" } },
  { slug: "festivals", title: "Festivals", media: { alt: "PLACEHOLDER festival", ratio: "3 / 4" } },
  { slug: "conferences", title: "Conferences", media: { alt: "PLACEHOLDER conference stage", ratio: "4 / 3" } },
  { slug: "shows", title: "Shows & Productions", media: { alt: "PLACEHOLDER show production", ratio: "1 / 1" } },
  { slug: "corporate", title: "Corporate Moments", media: { alt: "PLACEHOLDER corporate event", ratio: "3 / 4" } },
];

export const caseStudies = [
  {
    id: "case-1",
    client: "Client name",
    project: "Project title",
    category: "Live Event",
    year: "2026",
    media: { alt: "PLACEHOLDER case study visual", ratio: "4 / 5" } as Media,
  },
  {
    id: "case-2",
    client: "Client name",
    project: "Project title",
    category: "Brand Experience",
    year: "2025",
    media: { alt: "PLACEHOLDER case study visual", ratio: "4 / 5" } as Media,
  },
  {
    id: "case-3",
    client: "Client name",
    project: "Project title",
    category: "Festival",
    year: "2025",
    media: { alt: "PLACEHOLDER case study visual", ratio: "4 / 5" } as Media,
  },
  {
    id: "case-4",
    client: "Client name",
    project: "Project title",
    category: "Conference",
    year: "2024",
    media: { alt: "PLACEHOLDER case study visual", ratio: "4 / 5" } as Media,
  },
  {
    id: "case-5",
    client: "Client name",
    project: "Project title",
    category: "Show",
    year: "2024",
    media: { alt: "PLACEHOLDER case study visual", ratio: "4 / 5" } as Media,
  },
];
