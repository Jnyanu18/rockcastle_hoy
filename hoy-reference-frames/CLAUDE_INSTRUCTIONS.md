# HOY REFERENCE — CLAUDE CODE VISUAL REBUILD

IMPORTANT: The original MP4 is NOT the primary input for visual inspection.
Use the numbered JPG frames in this directory as the visual source of truth.
Open and inspect ALL frames before coding.

## Workflow
1. Read MASTER_PROMPT.md from the project root.
2. Open contact-sheet.jpg first to understand the full sequence.
3. Then inspect the individual frame-XX.jpg files at full resolution.
4. Reconstruct the page section-by-section from the frames.
5. Use the frame sequence to infer scroll/transition behavior.
6. Do not invent sections, colors, typography, spacing, or effects that aren't supported by the frames.
7. After implementation, compare your browser screenshot against the frames and correct visual mismatches.

## Critical rule
This is a visual reproduction task, not a redesign task.
If your implementation looks more conventional, more modern, or more polished but differs from the reference, the implementation is wrong.

## What to inspect
- header dimensions and alignment
- logo placement
- exact section order
- background color transitions
- typography scale and line wrapping
- horizontal/vertical spacing
- image aspect ratios and crops
- rounded corners
- metadata labels
- CTA geometry
- section heights
- scroll transitions
- horizontal movement/parallax
- footer structure
- mobile behavior if visible

Use the screenshots themselves to make measurements whenever possible.
