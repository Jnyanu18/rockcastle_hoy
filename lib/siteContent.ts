/*
 * Site content. Everything a client would replace lives here.
 * Strings marked PLACEHOLDER are temporary until client copy arrives.
 */

export const site = {
  name: "BRAND", // PLACEHOLDER wordmark
  descriptor: "STUDIO", // PLACEHOLDER small line under the wordmark
  tagline: "Let's shape the future, frame by frame.", // PLACEHOLDER
  title: "BRAND Studio | Creative Content",
  description: "PLACEHOLDER studio description.",
};

export const nav = [
  { label: "Work", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com", short: "in" },
  { label: "Instagram", href: "https://www.instagram.com", short: "ig" },
];

export const cta = {
  label: "Connect",
  href: "#contact",
};

export const hero = {
  // Letters in the floating tile cluster. PLACEHOLDER: replace with client mark.
  mark: ["A", "B", "C"],
  leftCopy:
    "PLACEHOLDER: We are a creative content studio. Short sentence about the approach.",
  rightCopy:
    "PLACEHOLDER: Supporting paragraph describing formats and delivery at each scale.",
};

export const intro = {
  marker: "Who are we?",
  index: "[ 01 ]",
  statement:
    "PLACEHOLDER: Opening statement about the studio's approach, craft and speed, written in the client's own voice.",
  lead: "Looking for a partner that's agile and thinks big? Let's talk.",
  primaryCta: { label: "Connect", href: "#contact" },
  secondaryCta: { label: "Our culture", href: "#about" },
};

export const works = {
  marker: "The works",
  index: "[ 02 ]",
  intro:
    "PLACEHOLDER: A short introduction to the selected work and the partners it was made with.",
  projects: [
    {
      title: "Project One",
      client: "Client name",
      tags: ["Category", "Commercials"],
      metrics: [
        { label: "Views", value: "0" },
        { label: "Delivery", value: "0 weeks" },
      ],
      image: { alt: "PLACEHOLDER project still", ratio: "1 / 1.09" },
    },
    {
      title: "Project Two",
      client: "Client name",
      tags: ["Artists", "Events"],
      metrics: [
        { label: "Views", value: "0" },
        { label: "Delivery", value: "0 weeks" },
      ],
      image: { alt: "PLACEHOLDER project still", ratio: "1 / 1.09" },
    },
    {
      title: "Project Three",
      client: "Client name",
      tags: ["Artists", "Campaigns"],
      metrics: [
        { label: "Views", value: "0" },
        { label: "Delivery", value: "0 days" },
      ],
      image: { alt: "PLACEHOLDER project still", ratio: "1 / 1.09" },
    },
  ],
  // Brand strip. PLACEHOLDER names until client logos are supplied.
  clients: ["Client 01", "Client 02", "Client 03", "Client 04", "Client 05", "Client 06", "Client 07"],
};

export const about = {
  marker: "Beyond the screen",
  index: "[ 03 ]",
  statement:
    "PLACEHOLDER: A large editorial paragraph about how the studio works across screens, from the smallest feed to the largest cinema.",
  side: {
    title: "Mobile content",
    body: "PLACEHOLDER: Short note on a specific format or capability.",
  },
  stats: [
    { label: "Countries", value: "0" },
    { label: "Followers", value: "0" },
  ],
};

export const stats = {
  index: "[ 04 ]",
  items: [
    { value: "00", label: "PLACEHOLDER stat" },
    { value: "00", label: "PLACEHOLDER stat" },
    { value: "000", label: "PLACEHOLDER stat" },
  ],
  body: "PLACEHOLDER: Small supporting paragraph explaining the numbers above.",
};

export const services = [
  {
    index: "[ 05 ]",
    title: "Video that moves beyond the screen",
    body: "PLACEHOLDER: Brand films, social cuts and long-form documentaries.",
    images: ["Still A", "Still B", "Still C", "Still D"],
  },
  {
    index: "[ 06 ]",
    title: "Photography that captures more than moments",
    body: "PLACEHOLDER: Campaign and editorial photography built around one clear idea.",
    images: ["Still E", "Still F", "Still G", "Still H"],
  },
  {
    index: "[ 07 ]",
    title: "Animation that brings ideas into motion",
    body: "PLACEHOLDER: Motion design and 3D that makes abstract ideas tangible.",
    images: ["Still I", "Still J", "Still K", "Still L"],
  },
];

export const contact = {
  index: "[ 08 ]",
  marker: "Let's connect",
  lead: "lead.",
  cta: { label: "Connect", href: "mailto:hello@example.com" },
  statement:
    "PLACEHOLDER: If you're looking for a creative partner that combines craftsmanship, speed and impact, let's talk about what you're building.",
};

export const footer = {
  office: {
    title: "Office",
    lines: ["PLACEHOLDER street 1", "0000 AA, City", "Country"],
  },
  contact: {
    title: "Contact",
    lines: ["+00 0 0000 0000", "hello@example.com"],
  },
  sitemap: {
    title: "Sitemap",
    links: nav.map((n) => ({ label: n.label, href: n.href })),
  },
  join: { label: "Join the movement", note: "Let's shape the future — frame by frame." },
  copyright: "© 2026 BRAND Studio. All rights reserved.",
  legal: "Privacy",
};

/* Story viewer: one story per project card, in the same order as works.projects.
 * PLACEHOLDER frames until client stills and copy are supplied. */
const storyFrames = (n: number) => [
  { id: `cover-${n}`, type: "image" as const, variant: "cover" as const, label: "Opening", duration: 5000, caption: "PLACEHOLDER caption" },
  { id: `brief-${n}`, type: "text" as const, label: "Brief", duration: 4500, statement: "PLACEHOLDER: The idea behind the piece, in one short statement." },
  { id: `still-${n}`, type: "image" as const, label: "Still", duration: 5000, caption: "PLACEHOLDER still caption" },
  {
    id: `facts-${n}`,
    type: "metadata" as const,
    label: "Facts",
    duration: 5000,
    stats: [
      { value: "0", label: "Views" },
      { value: "0", label: "Countries" },
    ],
    facts: [
      ["Client", "Client name"],
      ["Delivery", "0 weeks"],
      ["Crew", "0"],
      ["Format", "Film"],
    ] as [string, string][],
  },
  { id: `cta-${n}`, type: "cta" as const, label: "Next", duration: 6000, caption: "" },
];

export const stories = works.projects.map((p, i) => ({
  id: `story-${i + 1}`,
  title: p.title,
  client: p.client,
  city: "City",
  date: "2026",
  category: p.tags[0],
  tagline: `PLACEHOLDER: ${p.title} in one line.`,
  projectUrl: "#works",
  frames: storyFrames(i + 1),
}));
