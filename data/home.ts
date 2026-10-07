/* Homepage section copy, in the fixed order from the brief. PLACEHOLDER text is marked. */

export const hero = {
  title: "EXPERIENCE UNLIMITED.",
  subtitle: "Ideas. Experiences. Impact.",
  cta: { label: "Play Showreel", href: "#about" },
  // Showreel source: swap for the client's film when supplied
  showreelSrc: undefined as string | undefined,
  showreelPoster: undefined as string | undefined,
};

export const about = {
  index: "01",
  label: "About Us",
  headline: ["WE TURN IDEAS", "INTO EXPERIENCES."],
  // PLACEHOLDER: ~60 words, replace with the client's approved copy
  body:
    "PLACEHOLDER: Rock Castle is a production team for events, shows and brand experiences. We take an idea from first concept to opening night, handling creative direction, staging, technology and on-site execution in one place. Our work is built for impact, held to a high standard, and delivered on time, whatever the scale.",
  cta: { label: "Discover Rock Castle", href: "#work" },
  images: [
    { alt: "PLACEHOLDER event photography", ratio: "4 / 5" },
    { alt: "PLACEHOLDER behind-the-scenes photography", ratio: "1 / 1" },
  ],
};

export const featuredWork = {
  index: "02",
  label: "Featured Work",
  cta: { label: "View All Work", href: "#work" },
};

export const social = {
  index: "03",
  headline: ["BEYOND", "THE EVENT."],
  cta: { label: "Follow Us on Instagram", href: "https://www.instagram.com/" },
  stats: [
    { label: "Followers", value: 12400 }, // PLACEHOLDER numbers
    { label: "Impressions", value: 486000 },
    { label: "Engagements", value: 31200 },
    { label: "Reach", value: 210000 },
  ],
};

export const caseStudies = {
  index: "04",
  headline: ["STORIES WE'VE", "BROUGHT TO LIFE."],
  cta: { label: "Explore Case Study", href: "#work" },
};

export const awards = {
  index: "05",
  headline: ["WORK THAT", "GETS NOTICED."],
  cta: { label: "View All Recognition", href: "#work" },
  rows: [
    { award: "PLACEHOLDER Award", category: "Category", project: "Project", year: "2026" },
    { award: "PLACEHOLDER Award", category: "Category", project: "Project", year: "2025" },
    { award: "PLACEHOLDER Award", category: "Category", project: "Project", year: "2025" },
    { award: "PLACEHOLDER Award", category: "Category", project: "Project", year: "2024" },
  ],
};

export const clients = {
  index: "06",
  headline: ["TRUSTED BY", "BRANDS THAT", "THINK BIG."],
  cta: { label: "View All Clients", href: "#work" },
  // PLACEHOLDER names until client logos are supplied
  names: ["Client 01", "Client 02", "Client 03", "Client 04", "Client 05", "Client 06", "Client 07", "Client 08"],
};

export const team = {
  index: "07",
  headline: ["THE PEOPLE", "BEHIND THE", "EXPERIENCE."],
  cta: { label: "Meet The Team", href: "#team" },
  photos: [
    { alt: "PLACEHOLDER team portrait", ratio: "3 / 4" },
    { alt: "PLACEHOLDER candid on-ground photo", ratio: "4 / 3" },
    { alt: "PLACEHOLDER candid on-ground photo", ratio: "1 / 1" },
    { alt: "PLACEHOLDER team portrait", ratio: "3 / 4" },
  ],
};

export const contactSection = {
  index: "08",
  headline: ["HAVE AN IDEA?", "LET'S MAKE IT", "HAPPEN."],
  cta: { label: "Start A Project", href: "mailto:hello@rockcastle.example" }, // PLACEHOLDER address
};
