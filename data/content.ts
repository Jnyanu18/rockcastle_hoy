/*
 * All site copy, navigation, media and contact details live here.
 * Layout components read from this file, so client content can be
 * substituted without touching markup.
 *
 * Anything marked PLACEHOLDER is temporary copy written to match the
 * approved reference length. Replace it with the client's own copy.
 */

export type Media = {
  alt: string;
  /** Placeholder tone until real imagery is supplied (replace with `src`). */
  tone: string;
  src?: string;
};

export const brand = {
  name: "LUM", // PLACEHOLDER: confirm the client's brand name
  /** Three letters drive the hero and footer marks. */
  mark: ["L", "U", "M"] as const,
  descriptor: ["creative", "studio"],
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  chatHref: "mailto:hello@example.com",
};

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
];

export const cta = { label: "Connect", href: "#contact" };

export const hero = {
  label: "Welcome!",
  headline:
    "PLACEHOLDER: short positioning line for the studio, two to three sentences, written in the client's voice.",
  aside:
    "PLACEHOLDER: supporting detail about services, output and turnaround, set in small type on the right.",
  // Background: replace with <video> or a real image when supplied.
  backgroundTone: "#262c33",
  puckLabel: "View reel",
};

export const statement = {
  label: "Who are we?",
  index: "[01]",
  body:
    "PLACEHOLDER: the studio's core statement about craft, pace and results. Keep it to roughly six lines at desktop width.",
  subhead: "PLACEHOLDER: a partner-style question for prospective clients?",
  primary: { label: "Connect", href: "#contact" },
  secondary: { label: "Culture", href: "#about" },
};

export type Project = {
  title: string;
  tags: string[];
  meta: string;
  stats: { label: string; value: string }[];
  media: Media;
};

export const works = {
  label: "The works",
  index: "[02]",
  body:
    "PLACEHOLDER: a short paragraph introducing the selected work and the partners behind it.",
  cta: { label: "Made by Studio", href: "#work" },
  projects: [
    {
      title: "Project title one",
      tags: ["Category", "Commercial"],
      meta: "Film · Campaign · 2025",
      stats: [
        { label: "Reach", value: "TBC" },
        { label: "Timeline", value: "TBC" },
      ],
      media: { alt: "Project one still", tone: "#34444b" },
    },
    {
      title: "Project title two",
      tags: ["Brand", "Event"],
      meta: "Film · Brand · 2025",
      stats: [
        { label: "Reach", value: "TBC" },
        { label: "Timeline", value: "TBC" },
      ],
      media: { alt: "Project two still", tone: "#2a2a27" },
    },
    {
      title: "Project title three",
      tags: ["Artists", "Culture"],
      meta: "Photography · Culture · 2025",
      stats: [
        { label: "Reach", value: "TBC" },
        { label: "Timeline", value: "TBC" },
      ],
      media: { alt: "Project three still", tone: "#5b4a40" },
    },
  ] satisfies Project[],
  clients: [
    "Client 01",
    "Client 02",
    "Client 03",
    "Client 04",
    "Client 05",
    "Client 06",
    "Client 07",
  ],
};

export const stats = {
  label: "Beyond the Screen",
  index: "[03]",
  body:
    "PLACEHOLDER: a paragraph on how the studio builds work for each channel, from the smallest screen to the largest.",
  aside: {
    title: "Mobile content",
    body:
      "PLACEHOLDER: a short note about formats built for mobile, with clear calls to action.",
  },
  phone: {
    alt: "Placeholder phone screen",
    tone: "#8e9288",
  },
  figures: [
    { label: "Countries", value: 12, prefix: "" },
    { label: "Followers", value: 25000, prefix: "+" },
    { label: "Impressions", value: 1200000, prefix: "" },
    { label: "Engagements", value: 88000, prefix: "" },
  ],
};

export const process = {
  label: "How we roll",
  index: "[04]",
  statement:
    "PLACEHOLDER: a statement about how the team works with clients, from first conversation to delivery.",
  sub:
    "PLACEHOLDER: a short summary of method, in bold, two to three lines.",
};

export type Service = {
  index: string;
  title: string;
  body: string;
  media: Media[];
};

export const services: Service[] = [
  {
    index: "[05]",
    title: "Video that moves beyond the screen",
    body:
      "PLACEHOLDER: one or two lines describing the video service, its formats and scope.",
    media: [
      { alt: "Video still one", tone: "#4b6b72" },
      { alt: "Video still two", tone: "#8f8c7a" },
      { alt: "Video still three", tone: "#7a5560" },
      { alt: "Video still four", tone: "#64533f" },
    ],
  },
  {
    index: "[06]",
    title: "Photography that captures more than moments",
    body:
      "PLACEHOLDER: one or two lines describing the photography service and the brand outcomes it supports.",
    media: [
      { alt: "Photo one", tone: "#6e7a7f" },
      { alt: "Photo two", tone: "#2e2e2c" },
      { alt: "Photo three", tone: "#7d6d5a" },
      { alt: "Photo four", tone: "#4c5b67" },
    ],
  },
  {
    index: "[07]",
    title: "Animation that brings ideas into motion",
    body:
      "PLACEHOLDER: one or two lines describing the animation service and the kinds of ideas it visualises.",
    media: [
      { alt: "Animation frame one", tone: "#b59a72" },
      { alt: "Animation frame two", tone: "#a8905f" },
      { alt: "Animation frame three", tone: "#627a8f" },
      { alt: "Animation frame four", tone: "#5f6e8a" },
    ],
  },
];

export const contact = {
  index: "[08]",
  label: "Let's connect",
  media: { alt: "Placeholder contact frame", tone: "#2a2a27" },
  statement:
    "PLACEHOLDER: the invitation to brands looking for a creative partner that combines craftsmanship, speed and impact,",
  closing: "lead.",
  cta: { label: "Connect", href: "mailto:hello@example.com" },
};

export const footer = {
  office: ["Street address 00", "0000 AA City", "Country"],
  contact: { phone: "+00 000 000 000", email: "hello@example.com" },
  sitemap: navigation,
  join: {
    label: "Join the movement",
    body: "Let's shape the future —\nframe by frame.",
  },
  cookies: { label: "Cookies", href: "#" },
};
