/*
 * Recent experiences: each story is a short sequence of frames shown in the
 * rail and the full-screen viewer. Covers and frames are placeholders until
 * client imagery is supplied; swap the `src` values, nothing else.
 */

export type StoryFrame = {
  id: string;
  src: string;
  alt: string;
};

export type RecentStory = {
  id: string;
  title: string;
  date?: string;
  city?: string;
  category?: string;
  cover: string;
  frames: StoryFrame[];
};

const placeholder = (n: number, alt: string): StoryFrame => ({
  id: `p${n}-${alt.replace(/\s+/g, "-").toLowerCase()}`,
  src: `/rx/placeholder-${n}.svg`,
  alt,
});

const recentExperiences: RecentStory[] = [
  {
    id: "story-01",
    title: "PLACEHOLDER: project title one",
    date: "2026",
    city: "City",
    category: "Film",
    cover: "/rx/placeholder-1.svg",
    frames: [placeholder(1, "Story one, frame one"), placeholder(2, "Story one, frame two"), placeholder(3, "Story one, frame three")],
  },
  {
    id: "story-02",
    title: "PLACEHOLDER: project title two",
    date: "2026",
    city: "City",
    category: "Campaign",
    cover: "/rx/placeholder-2.svg",
    frames: [placeholder(2, "Story two, frame one"), placeholder(3, "Story two, frame two")],
  },
  {
    id: "story-03",
    title: "PLACEHOLDER: project title three",
    date: "2025",
    city: "City",
    category: "Photography",
    cover: "/rx/placeholder-3.svg",
    frames: [placeholder(3, "Story three, frame one"), placeholder(4, "Story three, frame two"), placeholder(1, "Story three, frame three")],
  },
  {
    id: "story-04",
    title: "PLACEHOLDER: project title four",
    date: "2025",
    city: "City",
    category: "Animation",
    cover: "/rx/placeholder-4.svg",
    frames: [placeholder(4, "Story four, frame one"), placeholder(1, "Story four, frame two")],
  },
];

export default recentExperiences;
