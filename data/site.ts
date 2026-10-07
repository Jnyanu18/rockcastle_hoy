/* Global brand, navigation, contact and footer content for Rock Castle. */

export const brand = {
  name: "ROCK CASTLE",
  tagline: "Experience Unlimited.",
  shortName: "RC",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Services", href: "#work" }, // PLACEHOLDER: no Services section in the fixed order yet
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const navCta = { label: "Let's Talk", href: "#contact" };

export const contact = {
  email: "hello@rockcastle.example", // PLACEHOLDER
  phone: "+00 000 000 0000", // PLACEHOLDER
  location: "City, Country", // PLACEHOLDER
};

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/", short: "IG" }, // PLACEHOLDER handle
  { label: "LinkedIn", href: "https://www.linkedin.com/", short: "in" }, // PLACEHOLDER handle
];

export const footer = {
  copyright: "© 2026 Rock Castle. All rights reserved.",
  legal: [
    { label: "Privacy", href: "#" }, // PLACEHOLDER
    { label: "Terms", href: "#" }, // PLACEHOLDER
  ],
};
