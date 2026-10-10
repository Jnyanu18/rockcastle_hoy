/* -------------------------------------------------------------------------- */
/*  Content config. Every string, image and link the layout renders lives    */
/*  here. Configured for Rock Castle Entertainment Pvt. Ltd.                 */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Rock Castle",
  shortName: "Rock Castle",
  tagline: "Experiences Un-Ltd.",
};

export const navigation = [
  { label: "Work", href: "#recent-experiences" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#capabilities" },
];

export const social = {
  linkedin: "https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd",
  instagram: "https://www.instagram.com/rockcastle.experiences",
  whatsapp: "https://wa.me/919717733823",
};

export const hero = {
  label: "Experiences Un-Ltd.",
  headline:
    "We turn ambitious ideas into monumental experiences. From brand activations and immersive pavilions to mega concerts and corporate spectacles.",
  aside:
    "Where visionary design meets flawless technical execution. We engineer high-octane experiential environments that leave lasting impressions across India and global stages.",
  primaryCta: { label: "Play reel", href: "#recent-experiences" },
  // Letter grid: [row, column, letter]. Cells not listed stay empty.
  letters: [
    { row: 0, col: 2, letter: "R" },
    { row: 1, col: 1, letter: "O" },
    { row: 2, col: 0, letter: "C" },
    { row: 2, col: 2, letter: "K" },
  ],
};

export const statement = {
  label: "Who are we?",
  index: "01",
  title: "WE TURN IDEAS INTO EXPERIENCES.",
  body:
    "Rock Castle is India's premier experiential powerhouse — trusted not for chasing volume, but for engineering moments that land. From monumental brand activations and immersive festivals to corporate summits and live spectacles, every detail is crafted with precision, from first concept to global-scale execution.",
  sub: "Looking for a partner that turns scale into benchmark experiences? Let’s talk.",
  ctas: [
    { label: "Connect", href: "#contact", primary: true },
    { label: "Our work", href: "#recent-experiences", primary: false },
  ],
};

export const works = {
  label: "The works",
  index: "02",
  body:
    "Every build reflects our commitment to scale, precision, and experiential immersion. A showcase of landmark events and brand worlds crafted with our visionary partners.",
  cta: "Made by Rock Castle",
  projects: [
    {
      title: "Green Wheels Bike Festival",
      tags: ["Festival IP", "Live Events"],
      views: "100k+",
      delivery: "National Touring IP",
      image: "",
      alt: "Green Wheels Bike Festival still",
    },
    {
      title: "Corporate Landmark Summit",
      tags: ["Brand Activation", "Conferences"],
      views: "15k+",
      delivery: "Turnkey Stage & Fabrication",
      image: "",
      alt: "Corporate Summit still",
    },
    {
      title: "Experiential Brand Pavilion",
      tags: ["Spatial Design", "Immersive"],
      views: "50k+",
      delivery: "Atelier Build & AV Tech",
      image: "",
      alt: "Experiential Pavilion still",
    },
  ],
};

export const clients = {
  label: "Our clients",
  logos: [
    { name: "EY", src: "/clients/ey.png" },
    { name: "Numero Uno", src: "/clients/numero-uno.png" },
    { name: "M3M", src: "/clients/m3m.png" },
    { name: "Hindustan Times", src: "/clients/hindustan-times.png" },
    { name: "Trident Group", src: "/clients/trident-group.png" },
    { name: "Ambience", src: "/clients/ambience.png" },
    { name: "Candor TechSpace", src: "/clients/candor-techspace.png" },
    { name: "The Times of India", src: "/clients/toi.png" },
    { name: "SBI Card", src: "/clients/sbi-card.png" },
    { name: "Samsung", src: "/clients/samsung.png" },
    { name: "Royal Stag", src: "/clients/royal-stag.png" },
    { name: "Quaker", src: "/clients/quaker.png" },
    { name: "Pernod Ricard", src: "/clients/pernod-ricard.png" },
    { name: "cult.fit", src: "/clients/cult-fit.png" },
    { name: "Firefox Bikes", src: "/clients/firefox-bikes.png" },
    { name: "GoPro", src: "/clients/gopro.png" },
    { name: "Jaguar", src: "/clients/jaguar.png" },
    { name: "Noise", src: "/clients/noise.png" },
    { name: "Central Park Resorts", src: "/clients/central-park-resorts.png" },
    { name: "Brookfield Properties", src: "/clients/brookfield-properties.png" },
  ],
};

export const stats = {
  index: "03",
  label: "Beyond the Stage",
  heading:
    "At Rock Castle, we believe every vision deserves a stage of uncompromised grandeur. From intimate VIP brand activations to stadium-scale live festivals and high-impact corporate summits, our passion lies in engineering moments that resonate far beyond the venue.",
  mobile: {
    label: "Brand Activations & Live Impact",
    body:
      "In an attention-deficit world, you need experiences that captivate. We architect immersive, multi-sensory brand worlds that stop people in their tracks. Live, unfiltered, unforgettable.",
  },
  figures: [
    { label: "Cities & Destinations", value: "25+" },
    { label: "Mega Experiences", value: "500+" },
    { label: "Audience Engaged", value: "2.5M+" },
    { label: "Years of Experience", value: "15+" },
  ],
};

export const process = {
  label: "How we roll",
  index: "04",
  body:
    "At Rock Castle, we listen first and create with you, not just for you. From initial spatial blueprint to live load-in and cue-to-cue execution, everything happens in-house with precision engineering and outsider firepower.",
  sub:
    "We combine strategic brand storytelling, architectural craftsmanship and rapid production execution to turn ambitious ideas into benchmark experiences.",
  cta: "Scroll how we roll",
};

export const services = [
  {
    index: "05",
    title: "Stories We’ve Brought to Life",
    body:
      "From visionary corporate mega-summits to high-octane public festivals and immersive brand pavilions — we engineer spaces that captivate thousands and create permanent brand recall.",
    images: ["", "", "", ""],
  },
  {
    index: "06",
    title: "Experiences Un-Ltd — Spatial & Production",
    body:
      "360-degree event architecture, cutting-edge stage engineering, immersive AV technology, and turnkey fabrication built to transform any venue into an extraordinary world.",
    images: ["", "", "", ""],
  },
  {
    index: "07",
    title: "Awards & Recognition — Work That Gets Noticed",
    body:
      "Industry-celebrated IPs, EEMA-recognized experiential executions, and landmark corporate spectacles trusted by top global brands and institutions across India.",
    images: ["", "", "", ""],
  },
];

export const contact = {
  index: "08",
  label: "Let's connect",
  heading:
    "If you're looking for an experiential partner that combines architectural vision, speed and unyielding scale, let's create something extraordinary.",
  subheading: "Built for brands that want to lead.",
  cta: "CONNECT",
  href: "/contact",
};

export const footer = {
  office: {
    title: "Office",
    lines: [
      "1st Floor, Plus Offices",
      "Landmark Cyber Park, Sector 67",
      "Gurugram, Haryana 122018",
    ],
  },
  contact: {
    title: "Contact",
    lines: ["+91 97177 33823", "info@rockcastle.in"],
  },
  sitemap: {
    title: "Sitemap",
    links: navigation.map((n) => ({ label: n.label, href: n.href })),
  },
  join: { label: "Join the movement", tagline: "Architects of the untold — monumental builds worldwide." },
  copyright: `© ${new Date().getFullYear()} Rock Castle Entertainment Pvt. Ltd.`,
  legal: [{ label: "Cookies", href: "#cookies" }],
};
