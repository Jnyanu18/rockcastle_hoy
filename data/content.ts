/*
 * All site copy, navigation, media and contact details live here.
 * Configured for Rock Castle Entertainment Pvt. Ltd.
 */

export type Media = {
  alt: string;
  tone: string;
  src?: string;
};

export const brand = {
  name: "Rock Castle",
  mark: ["R", "O", "C", "K"] as const,
  descriptor: ["experiences", "un-ltd"],
  instagram: "https://www.instagram.com/rockcastle.experiences",
  linkedin: "https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd",
  chatHref: "mailto:info@rockcastle.in",
};

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#recent-experiences" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
];

export const cta = { label: "Connect", href: "#contact" };

export const hero = {
  label: "Experiences Un-Ltd.",
  headline:
    "We turn ambitious ideas into monumental experiences. From brand activations and immersive pavilions to mega concerts and corporate spectacles.",
  aside:
    "Where visionary design meets flawless technical execution. We engineer high-octane experiential environments that leave lasting impressions across India and global stages.",
  backgroundTone: "#1e2128",
  puckLabel: "Play reel",
};

export const statement = {
  label: "Who are we?",
  index: "[01]",
  title: "WE TURN IDEAS INTO EXPERIENCES.",
  body:
    "Rock Castle Entertainment is a premier 360-degree experiential marketing and event management powerhouse based in India. We conceptualize and execute monumental brand activations, corporate summits, immersive public festivals, and live entertainment spectacles. Blending visionary spatial design with meticulous production engineering, we transform ambitious brand visions into unforgettable, high-impact sensory experiences that captivate audiences and inspire industries.",
  subhead: "Looking for a partner that turns scale into benchmark experiences? Let’s talk.",
  primary: { label: "Connect", href: "#contact" },
  secondary: { label: "Our work", href: "#recent-experiences" },
};

export type Project = {
  title: string;
  tags: string[];
  meta: string;
  stats: { label: string; value: string }[];
  media: Media;
};

export const works = {
  label: "Recent experiences",
  index: "[02]",
  body:
    "Every build reflects our commitment to scale, precision, and experiential immersion. A showcase of landmark events and brand worlds crafted with our visionary partners.",
  cta: { label: "Made by Rock Castle", href: "#recent-experiences" },
  projects: [
    {
      title: "Green Wheels Bike Festival",
      tags: ["Festival IP", "Live Events"],
      meta: "Festival · Touring IP · 2024",
      stats: [
        { label: "Attendees", value: "15,000+" },
        { label: "Brand Partners", value: "24+" },
      ],
      media: { alt: "Green Wheels Bike Festival still", tone: "#34444b" },
    },
    {
      title: "Corporate Landmark Summit",
      tags: ["Brand Activation", "Conferences"],
      meta: "Corporate · Summit · 2024",
      stats: [
        { label: "Delegates", value: "3,500+" },
        { label: "LED Canvas", value: "4,000 sq ft" },
      ],
      media: { alt: "Corporate Summit still", tone: "#2a2a27" },
    },
    {
      title: "Immersive Brand Pavilion",
      tags: ["Spatial Design", "Immersive"],
      meta: "Spatial · Exhibition · 2023",
      stats: [
        { label: "Visitors", value: "50,000+" },
        { label: "Duration", value: "5 Days" },
      ],
      media: { alt: "Immersive Pavilion still", tone: "#5b4a40" },
    },
  ] satisfies Project[],
  clients: [
    "EY",
    "Samsung",
    "Jaguar",
    "M3M",
    "GoPro",
    "Times of India",
    "cult.fit",
  ],
};

export const stats = {
  label: "Beyond the Stage",
  index: "[03]",
  body:
    "At Rock Castle, we believe every vision deserves a stage of uncompromised grandeur. From intimate VIP brand activations to stadium-scale live festivals and high-impact corporate summits, our passion lies in engineering moments that resonate far beyond the venue.",
  aside: {
    title: "Brand Activations & Live Impact",
    body:
      "In an attention-deficit world, you need experiences that captivate. We architect immersive, multi-sensory brand worlds that stop people in their tracks. Live, unfiltered, unforgettable.",
  },
  phone: {
    alt: "Rock Castle live showcase",
    tone: "#8e9288",
  },
  figures: [
    { label: "Cities & Destinations", value: 25, prefix: "" },
    { label: "Mega Experiences", value: 500, prefix: "+" },
    { label: "Audience Engaged", value: 2500000, prefix: "" },
    { label: "Years of Excellence", value: 15, prefix: "+" },
  ],
};

export const process = {
  label: "How we roll",
  index: "[04]",
  statement:
    "At Rock Castle, we listen first and create with you, not just for you. From initial spatial blueprint to live load-in and cue-to-cue execution, everything happens in-house with precision engineering and outsider firepower.",
  sub:
    "We combine strategic brand storytelling, architectural craftsmanship and rapid production execution to turn ambitious ideas into benchmark experiences.",
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
    title: "STORIES WE’VE BROUGHT TO LIFE",
    body:
      "From visionary corporate mega-summits to high-octane public festivals and immersive brand pavilions — we engineer spaces that captivate thousands and create permanent brand recall.",
    media: [
      { alt: "Stories still one", tone: "#4b6b72" },
      { alt: "Stories still two", tone: "#8f8c7a" },
      { alt: "Stories still three", tone: "#7a5560" },
      { alt: "Stories still four", tone: "#64533f" },
    ],
  },
  {
    index: "[06]",
    title: "EXPERIENCES UN-LTD — SPATIAL & PRODUCTION",
    body:
      "360-degree event architecture, cutting-edge stage engineering, immersive AV technology, and turnkey fabrication built to transform any venue into an extraordinary world.",
    media: [
      { alt: "Production one", tone: "#6e7a7f" },
      { alt: "Production two", tone: "#2e2e2c" },
      { alt: "Production three", tone: "#7d6d5a" },
      { alt: "Production four", tone: "#4c5b67" },
    ],
  },
  {
    index: "[07]",
    title: "Awards & Recognition — WORK THAT GETS NOTICED",
    body:
      "Industry-celebrated IPs, EEMA-recognized experiential executions, and landmark corporate spectacles trusted by top global brands and institutions across India.",
    media: [
      { alt: "Awards one", tone: "#b59a72" },
      { alt: "Awards two", tone: "#a8905f" },
      { alt: "Awards three", tone: "#627a8f" },
      { alt: "Awards four", tone: "#5f6e8a" },
    ],
  },
];

export const contact = {
  index: "[08]",
  label: "Let's connect",
  media: { alt: "Contact Rock Castle", tone: "#2a2a27" },
  statement:
    "If you're looking for an experiential partner that combines architectural vision, speed and unyielding scale, let's create something extraordinary.",
  closing: "lead.",
  cta: { label: "CONNECT", href: "#contact" },
};

export const footer = {
  office: [
    "1st Floor, Plus Offices",
    "Landmark Cyber Park, Sector 67",
    "Gurugram, Haryana 122018",
  ],
  contact: { phone: "+91 97177 33823", email: "info@rockcastle.in" },
  sitemap: navigation,
  join: {
    label: "Join the movement",
    body: "Architects of the untold —\nmonumental builds worldwide.",
  },
  cookies: { label: "Cookies", href: "#cookies" },
};
