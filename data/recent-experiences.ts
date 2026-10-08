/*
 * Recent experiences: each story is a short sequence of frames shown in the
 * rail and the full-screen viewer. Covers and frames are placeholders until
 * client imagery is supplied; swap the `src`/copy values, nothing else.
 */

export type RecentFrame = {
  id: string;
  type: "image" | "video" | "text" | "metadata" | "cta";
  variant?: "cover";
  label: string;
  /** How long the frame holds before auto-advancing, in ms. */
  duration: number;
  src?: string;
  poster?: string;
  statement?: string;
  stats?: { label: string; value: string }[];
  facts?: [string, string][];
  caption?: string;
};

export type RecentStory = {
  id: string;
  title: string;
  tagline?: string;
  client?: string;
  city?: string;
  date?: string;
  category?: string;
  cover: string;
  projectUrl?: string;
  /** Two small stats shown under the card title, e.g. attendees + reach. */
  metrics?: { label: string; value: string }[];
  frames: RecentFrame[];
};

const recentExperiences: RecentStory[] = [
  {
    id: "story-01",
    title: "Green Wheels Bike Festival",
    tagline: "India's landmark eco-mobility & cycling festival IP.",
    client: "Intellectual Property",
    date: "2024",
    city: "Delhi-NCR",
    category: "Festival IP",
    cover: "/rx/cover-1.jpg",
    projectUrl: "#contact",
    metrics: [
      { label: "Attendees", value: "15,000+" },
      { label: "Reach", value: "Pan-India" },
    ],
    frames: [
      { id: "s1-f1", type: "image", variant: "cover", label: "Project", src: "/rx/cover-1.jpg", duration: 4200 },
      {
        id: "s1-f2",
        type: "text",
        label: "The vision",
        statement: "A nationwide festival celebrating sustainable mobility with 10,000+ riders, live entertainment, and brand arenas.",
        duration: 5200,
      },
      {
        id: "s1-f3",
        type: "metadata",
        label: "The impact",
        stats: [
          { label: "Attendees", value: "15,000+" },
          { label: "Brand Partners", value: "24+" },
          { label: "Track Scale", value: "50 km" },
        ],
        facts: [
          ["Role", "IP Concept & Production"],
          ["Scope", "Turnkey Live Event"],
          ["Reach", "Pan-India"],
          ["Format", "Multi-day Festival"],
        ],
        duration: 5200,
      },
      { id: "s1-f4", type: "cta", label: "View experience", src: "/rx/cover-1.jpg", duration: 4200 },
    ],
  },
  {
    id: "story-02",
    title: "Corporate Landmark Summit",
    tagline: "Transforming convention halls into high-tech brand worlds.",
    client: "Global Enterprise",
    date: "2024",
    city: "Gurugram",
    category: "Corporate Summit",
    cover: "/rx/cover-2.jpg",
    projectUrl: "#contact",
    metrics: [
      { label: "Delegates", value: "3,500+" },
      { label: "Duration", value: "3 Days" },
    ],
    frames: [
      { id: "s2-f1", type: "image", variant: "cover", label: "Project", src: "/rx/cover-2.jpg", duration: 4200 },
      {
        id: "s2-f2",
        type: "text",
        label: "The vision",
        statement: "An immersive leadership summit blending ultra-wide anamorphic LED stages with seamless hospitality.",
        duration: 5200,
      },
      {
        id: "s2-f3",
        type: "metadata",
        label: "The impact",
        stats: [
          { label: "Delegates", value: "3,500+" },
          { label: "LED Canvas", value: "4,000 sq ft" },
        ],
        facts: [
          ["Role", "Spatial & Stage Direction"],
          ["Production", "Turnkey AV + Fabrication"],
          ["Duration", "3 Days"],
        ],
        duration: 5200,
      },
      { id: "s2-f4", type: "cta", label: "View experience", src: "/rx/cover-2.jpg", duration: 4200 },
    ],
  },
  {
    id: "story-03",
    title: "Immersive Brand Pavilion",
    tagline: "Spatial architecture and multi-sensory visitor engagement.",
    client: "Automotive Partner",
    date: "2023",
    city: "Mumbai",
    category: "Spatial Design",
    cover: "/rx/cover-3.jpg",
    projectUrl: "#contact",
    metrics: [
      { label: "Role", value: "Spatial Design" },
      { label: "Build Time", value: "4 Weeks" },
    ],
    frames: [
      { id: "s3-f1", type: "image", variant: "cover", label: "Project", src: "/rx/cover-3.jpg", duration: 4200 },
      {
        id: "s3-f2",
        type: "text",
        label: "The vision",
        statement: "A bespoke architectural pavilion engineered to showcase cutting-edge electric mobility with experiential touchpoints.",
        duration: 5200,
      },
      { id: "s3-f3", type: "image", label: "On site", src: "/rx/cover-3.jpg", duration: 4200 },
      { id: "s3-f4", type: "cta", label: "View experience", src: "/rx/cover-3.jpg", duration: 4200 },
    ],
  },
  {
    id: "story-04",
    title: "Live Concerts & Arenas",
    tagline: "Arena-scale stagecraft, lighting choreography and stadium sound.",
    client: "Entertainment IP",
    date: "2023",
    city: "Delhi / Mumbai",
    category: "Concerts",
    cover: "/rx/cover-4.jpg",
    projectUrl: "#contact",
    metrics: [
      { label: "Format", value: "Arena Scale" },
      { label: "Run", value: "2 Days" },
    ],
    frames: [
      { id: "s4-f1", type: "image", variant: "cover", label: "Project", src: "/rx/cover-4.jpg", duration: 4200 },
      {
        id: "s4-f2",
        type: "text",
        label: "The vision",
        statement: "Engineering massive outdoor festival stages with precision rigging, pyrotechnics, and flawless artist logistics.",
        duration: 5200,
      },
      { id: "s4-f3", type: "cta", label: "View experience", src: "/rx/cover-4.jpg", duration: 4200 },
    ],
  },
];

export default recentExperiences;

