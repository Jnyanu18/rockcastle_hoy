# CLAUDE CODE MASTER PROMPT — REBUILD THE REFERENCE WEBSITE

You are rebuilding the website shown in the attached reference screen recording. Treat the recording as the visual source of truth. Do NOT invent a different aesthetic, generic agency template, dashboard, SaaS layout, or portfolio grid.

## Goal
Create a production-quality React/Vite website that reproduces the reference as closely as possible at desktop width first, then responsively at tablet/mobile widths.

## Stack
- React + Vite
- JavaScript/JSX
- GSAP + ScrollTrigger for choreography
- Lenis for smooth scrolling
- CSS (do not let Tailwind introduce a different visual language)
- Use semantic HTML
- No unnecessary UI libraries

## Visual DNA — NON-NEGOTIABLE
1. Overall art direction: premium experimental creative studio / production company.
2. Two dominant surfaces:
   - pale acid/yellow canvas approximately #EEF3A6
   - near-black canvas approximately #171717
3. Typography is large, rounded/geometric, tightly tracked, editorial and minimal.
4. Header is a thin fixed horizontal bar with a pale off-white background, small uppercase navigation, centered compact black logo, and a rounded CONNECT + control on the right.
5. There is extreme negative space. Do not fill empty areas just because they are available.
6. Images are large but restrained, with rounded corners and editorial cropping.
7. No gradients.
8. No glassmorphism.
9. No cards with shadows.
10. No neon.
11. No blue/purple SaaS colors.
12. No generic hero illustration.
13. No giant hamburger menu on desktop.
14. No excessive border radii. Rounded corners are used mainly on media and pill controls.
15. The site must feel like a real creative studio, not a template.

## Page structure from the recording
Implement these sections in exactly this order:

### 1. Fixed Header
- Full-width ~58px bar.
- Left: small navigation links: Work, About, Services.
- Center: compact stacked studio wordmark.
- Right: LinkedIn-style "in" link and pale-yellow CONNECT + pill.
- Header stays visible while scrolling.
- Border is subtle.

### 2. Hero / Intro — PALE YELLOW
- Full viewport-height feeling.
- Small section marker at upper-left.
- Main copy sits around the center-left and occupies roughly 40–50% of the viewport width.
- Headline is very large, approximately 55–70px on desktop, with tight line-height around .94 and negative letter-spacing.
- Supporting paragraph is much smaller.
- Two compact pill buttons.
- To the right is a large rounded-square outlined frame containing a tiny plus/cross mark. This is intentionally sparse.
- Small editorial microcopy sits toward the lower-left.
- On first load, headline and supporting copy animate upward/fade in.

### 3. Selected Work — PALE YELLOW
- Small metadata row: section number, title, counter.
- Three equal project cards in one horizontal row.
- Large rectangular images with minimal rounded corners.
- Tiny metadata below each image.
- A horizontal client/brand logo strip beneath the projects.
- Keep this section visually quiet; the images do the work.
- Images should reveal/scale subtly as they enter the viewport.

### 4. About — BLACK
- Full dark section.
- Small pale metadata row.
- Asymmetric two-column composition.
- Tall portrait/product image on the left.
- Very large paragraph on the right, pale yellow/cream text.
- Text must NOT be centered like a SaaS landing page; it should feel editorial and left aligned.
- Below it, compact numeric facts: countries/locations, creators/community etc.
- Preserve large empty areas.

### 5. Stats / Proof — BLACK
- Dark background continues.
- Large cropped image toward left.
- On the right/top: three large numbers with tiny labels.
- Supporting paragraph is small and understated.
- A small circular/outlined plus interaction marker is visible near the lower-right.

### 6. Services — BLACK
This is the most important motion section.
- Keep black background.
- Three major service statements stacked vertically:
  1. Video that moves beyond the screen
  2. Photography that captures more than moments
  3. Animation that brings ideas into motion
- Typography is enormous and pale yellow.
- Each statement should occupy substantial vertical space.
- Small section indexes are positioned at the edges.
- A few tiny image thumbnails sit below/around each statement.
- Add subtle GSAP scroll-driven horizontal displacement to the service headings.
- The animation must be controlled and slow, never gimmicky.
- The typography should feel like it is moving through the viewport rather than simply fading.

### 7. Lead / Contact — BLACK
- Huge centered word: "lead." in pale yellow.
- Small white/pale pill beneath it.
- Then a lower editorial contact block with a rounded outlined plus-frame on the left and large pale-yellow copy on the right.
- Copy communicates that the studio is for brands looking for craftsmanship, speed and impact.
- Add a small CTA.

### 8. Footer — PALE YELLOW
- Pale yellow full-width footer.
- Large centered stacked logo.
- Four compact information columns.
- Contact details, menu, social links.
- Thin horizontal divider and small copyright line at bottom.

## Motion rules
Use motion to reproduce the reference, not to show off.
- Smooth scrolling with Lenis.
- GSAP ScrollTrigger.
- Hero: staggered upward reveal.
- Images: clip-path/scale reveal on entry.
- Service headings: subtle x-axis scrub movement tied to scroll.
- Contact title: upward reveal.
- Header remains stable; do not make it constantly morph.
- Use transform/opacity/clip-path only where possible.
- Respect prefers-reduced-motion.
- Never add bouncy springs, random floating elements, particle systems, cursor trails, or excessive parallax.

## Responsive behavior
Desktop is the primary target at 1440–1920px.
At <=900px:
- Collapse multi-column layouts intelligently.
- Preserve the large typography and yellow/black rhythm.
- Keep the header compact.
- Project cards become a single column.
At <=560px:
- Reduce type sizes but keep the editorial hierarchy.
- Keep rounded media.
- Avoid horizontal overflow.

## Engineering requirements
- Components: Header, Hero, Work, About, Stats, Services, Contact, Footer.
- Keep content arrays separate from JSX where practical.
- Use accessible alt text.
- Use CSS variables for colors, spacing, radii.
- No inline style explosion.
- Clean React hooks.
- Clean up GSAP contexts and Lenis on unmount.
- Lazy-load below-the-fold images.
- Avoid layout shift by reserving media aspect ratios.
- Run `npm run build` before considering the task complete.

## Critical instruction
The reference recording is the authority. Before coding, inspect it carefully frame-by-frame. Compare your implementation against the reference at the same scroll positions. If your implementation looks "nicer" but differs from the reference, the reference wins.

Do not stop after creating the skeleton. Implement all sections, responsive behavior, image treatment, spacing, typography, and motion.

## Final QA checklist
- [ ] Header proportions match reference.
- [ ] Yellow/black section rhythm matches reference.
- [ ] Hero copy width and typography match.
- [ ] Project row and logo strip match.
- [ ] About asymmetric composition matches.
- [ ] Stats composition matches.
- [ ] Service typography scale is large enough.
- [ ] Service scroll motion works.
- [ ] Contact "lead." composition matches.
- [ ] Footer composition matches.
- [ ] No accidental gradients or SaaS styling.
- [ ] No horizontal scrollbar at any breakpoint.
- [ ] `npm run build` passes.
