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
  frames: RecentFrame[];
};

const recentExperiences: RecentStory[] = [
  {
    id: "story-01",
    title: "PLACEHOLDER: project title one",
    tagline: "A partner that shows up ready to build.",
    client: "Client one",
    date: "2026",
    city: "City",
    category: "Film",
    cover: "/rx/placeholder-1.svg",
    projectUrl: "#works",
    frames: [
      { id: "s1-f1", type: "image", variant: "cover", label: "Project", src: "/rx/placeholder-1.svg", duration: 4200 },
      {
        id: "s1-f2",
        type: "text",
        label: "The brief",
        statement: "A launch film that had to work cold, with no context and no sound, in the first three seconds of a feed.",
        duration: 5200,
      },
      {
        id: "s1-f3",
        type: "metadata",
        label: "The numbers",
        stats: [
          { label: "Shoot days", value: "3" },
          { label: "Deliverables", value: "12" },
          { label: "Turnaround", value: "2 wks" },
        ],
        facts: [
          ["Role", "Direction + edit"],
          ["Format", "16:9 + 9:16"],
          ["Crew", "6"],
          ["Location", "On location"],
        ],
        duration: 5200,
      },
      { id: "s1-f4", type: "cta", label: "View project", src: "/rx/placeholder-1.svg", duration: 4200 },
    ],
  },
  {
    id: "story-02",
    title: "PLACEHOLDER: project title two",
    tagline: "Built for a feed that moves fast.",
    client: "Client two",
    date: "2026",
    city: "City",
    category: "Campaign",
    cover: "/rx/placeholder-2.svg",
    projectUrl: "#works",
    frames: [
      { id: "s2-f1", type: "image", variant: "cover", label: "Project", src: "/rx/placeholder-2.svg", duration: 4200 },
      {
        id: "s2-f2",
        type: "text",
        label: "The brief",
        statement: "Twelve formats from one shoot day, each one built to stop a specific scroll.",
        duration: 5200,
      },
      {
        id: "s2-f3",
        type: "metadata",
        label: "The numbers",
        stats: [
          { label: "Followers", value: "+7.000" },
          { label: "Impressions", value: "700.000" },
        ],
        facts: [
          ["Role", "Production"],
          ["Format", "9:16"],
          ["Crew", "4"],
        ],
        duration: 5200,
      },
      { id: "s2-f4", type: "cta", label: "View project", src: "/rx/placeholder-2.svg", duration: 4200 },
    ],
  },
  {
    id: "story-03",
    title: "PLACEHOLDER: project title three",
    tagline: "A still frame that did the work of a brief.",
    client: "Client three",
    date: "2025",
    city: "City",
    category: "Photography",
    cover: "/rx/placeholder-3.svg",
    projectUrl: "#works",
    frames: [
      { id: "s3-f1", type: "image", variant: "cover", label: "Project", src: "/rx/placeholder-3.svg", duration: 4200 },
      {
        id: "s3-f2",
        type: "text",
        label: "The brief",
        statement: "A single day on location, shot to carry a full campaign across print and social.",
        duration: 5200,
      },
      { id: "s3-f3", type: "image", label: "On location", src: "/rx/placeholder-4.svg", duration: 4200 },
      { id: "s3-f4", type: "cta", label: "View project", src: "/rx/placeholder-3.svg", duration: 4200 },
    ],
  },
  {
    id: "story-04",
    title: "PLACEHOLDER: project title four",
    tagline: "Motion that made the abstract concrete.",
    client: "Client four",
    date: "2025",
    city: "City",
    category: "Animation",
    cover: "/rx/placeholder-4.svg",
    projectUrl: "#works",
    frames: [
      { id: "s4-f1", type: "image", variant: "cover", label: "Project", src: "/rx/placeholder-4.svg", duration: 4200 },
      {
        id: "s4-f2",
        type: "text",
        label: "The brief",
        statement: "A product with nothing to photograph, so we built the world around it instead.",
        duration: 5200,
      },
      {
        id: "s4-f3",
        type: "metadata",
        label: "The numbers",
        stats: [
          { label: "Render hours", value: "+200" },
          { label: "Revisions", value: "3" },
        ],
        facts: [
          ["Role", "3D + motion"],
          ["Format", "16:9"],
        ],
        duration: 5200,
      },
      { id: "s4-f4", type: "cta", label: "View project", src: "/rx/placeholder-4.svg", duration: 4200 },
    ],
  },
];

export default recentExperiences;
