/* -------------------------------------------------------------------------- */
/*  Content config. Every string, image and link the layout renders lives    */
/*  here. Swap the placeholder values for client content; no component       */
/*  should need editing to do so.                                            */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "LUM",
  shortName: "LUM",
  tagline: "Placeholder tagline — replace with client copy.",
};

export const navigation = [
  { label: "Work", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
];

export const social = {
  linkedin: "https://www.linkedin.com",
  instagram: "https://www.instagram.com",
  whatsapp: "https://wa.me/",
};

export const hero = {
  label: "Welcome!",
  headline:
    "We’re a creative content agency that moves at the speed of your ambition. From idea to production and beyond. Where speed meets craftsmanship.",
  aside:
    "We craft formats that stick and stories that move. From an 8-second viral to a full brand documentary, we translate your message into content that creates real momentum.",
  primaryCta: { label: "Play reel", href: "#works" },
  // Letter grid: [row, column, letter]. Cells not listed stay empty.
  letters: [
    { row: 0, col: 1, letter: "H" },
    { row: 1, col: 0, letter: "H" },
    { row: 1, col: 1, letter: "O" },
    { row: 1, col: 2, letter: "Y" },
    { row: 2, col: 1, letter: "Y" },
  ],
};

export const statement = {
  label: "Who are we?",
  index: "01",
  body:
    "Trusted by industry leaders, not because we chase volume, but because we craft stories with intention. From cinematic video and photography to high-end 3D animation, every detail is carefully crafted to create impact, from the first concept to global rollout.",
  sub: "Looking for a partner that’s agile and thinks big? Let’s talk.",
  ctas: [
    { label: "Connect", href: "#contact", primary: true },
    { label: "Our culture", href: "#about", primary: false },
  ],
};

export const works = {
  label: "The works",
  index: "02",
  body:
    "Every frame tells our story too, of passion, agility, and the pursuit of brilliance. A showcase of the work we proudly shaped together with our partners.",
  cta: "See all work",
  projects: [
    {
      title: "Project title one",
      tags: ["Category", "Commercials"],
      views: "0",
      delivery: "2 wks production + 2 wks post",
      image: "",
      alt: "Placeholder project still",
    },
    {
      title: "Project title two",
      tags: ["Artists", "Commercials"],
      views: "0",
      delivery: "1 week pre-production + 2 shoot days",
      image: "",
      alt: "Placeholder project still",
    },
    {
      title: "Project title three",
      tags: ["Artists", "Events"],
      views: "0",
      delivery: "8 days",
      image: "",
      alt: "Placeholder project still",
    },
  ],
};

export const clients = {
  label: "Selected partners",
  names: ["Client one", "Client two", "Client three", "Client four", "Client five", "Client six", "Client seven"],
};

export const stats = {
  index: "03",
  label: "Beyond the screen",
  heading:
    "At our studio, we believe every story deserves its perfect stage. From the intimate tap-and-scroll of a smartphone to the immersive grandeur of the silver screen, our passion lies in bringing your vision to life, no matter the medium.",
  mobile: {
    label: "Mobile content",
    body:
      "In a scroll-stop world, you need content that pops. We craft dynamic, thumb-stopping videos designed purely for mobile. Get ready to scroll, tap, and share.",
  },
  // Each frame of the phone block shows one set of figures.
  figures: [
    [
      { label: "Countries", value: "2" },
      { label: "Followers", value: "+4.000" },
      { label: "Impressions", value: "400.000" },
    ],
    [
      { label: "Countries", value: "3" },
      { label: "Followers", value: "+7.000" },
      { label: "Impressions", value: "700.000" },
    ],
    [
      { label: "Followers", value: "+21.000" },
      { label: "Impressions", value: "2.600.000" },
      { label: "Engagements", value: "210.000" },
    ],
  ],
};

export const process = {
  label: "How we roll",
  index: "04",
  body:
    "We listen first and create with you, not just for you. Everything happens in-house, fast and focused, like having your own team, with outsider firepower.",
  sub:
    "We combine strategic thinking, creative craftsmanship and rapid execution to keep ideas moving and momentum growing.",
  cta: "Scroll how we roll",
};

export const services = [
  {
    index: "05",
    title: "Video that moves beyond the screen",
    body:
      "From cinematic brand films to fast-paced social content, we create visuals designed to capture attention, build emotion, and leave a lasting impact.",
    images: ["", "", "", ""],
  },
  {
    index: "06",
    title: "Photography that captures more than moments",
    body:
      "From campaign shoots to brand imagery, we create photography that feels authentic, refined, and built to strengthen the visual identity behind every brand.",
    images: ["", "", "", ""],
  },
  {
    index: "07",
    title: "Animation that brings ideas into motion",
    body:
      "From 3D worlds to motion graphics, we bring concepts to life with visuals that feel tangible, playful and precise.",
    images: ["", "", "", ""],
  },
];

export const contact = {
  index: "08",
  label: "Let’s connect",
  heading:
    "If you’re looking for a creative partner that combines craftsmanship, speed and innovation, let’s shape the future together. Get in touch and let’s lead.",
  cta: "Connect",
  href: "mailto:hello@example.com",
};

export const footer = {
  office: {
    title: "Office",
    lines: ["Street address 00", "0000 AA, City", "Country"],
  },
  contact: {
    title: "Contact",
    lines: ["+00 0 0000 0000", "hello@example.com"],
  },
  sitemap: {
    title: "Sitemap",
    links: navigation.map((n) => ({ label: n.label, href: n.href })),
  },
  join: { label: "Join the movement", tagline: "Let’s shape the future — frame by frame." },
  copyright: `© ${new Date().getFullYear()} ${brand.name}`,
  legal: [{ label: "Cookies", href: "#" }],
};
