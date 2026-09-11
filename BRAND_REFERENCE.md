# Triple Egg Brand Reference

> Codex-readable summary of `TE_BRAND GUIDELINES.pdf`.
>
> **Source of truth:** The original Triple Egg Brand Guidelines PDF remains the visual authority. This Markdown file exists to make the key rules easy for coding agents to read and apply consistently.
>
> **Recommended repo location:** `docs/brand/BRAND_REFERENCE.md`

---

## 1. Brand Overview

**Brand:** Triple Egg

Triple Egg Restaurant is a **healthy lifestyle restaurant based in Bali**, located inside **OBSIDIAN Gym**, serving **nutritious and delicious dishes**.

### Brand tone-of-voice keywords

- Healthy
- Nutritious
- Fitness
- Flavorful
- Strength
- Sustaining

### Practical tone guidance for website copy

Website copy should feel:

- health-conscious without sounding clinical;
- energetic and fitness-adjacent without sounding like a supplement brand;
- food-first and appetizing;
- straightforward, warm, and confident;
- concise rather than overly corporate or generic.

Do not invent facts, claims, prices, opening hours, locations, certifications, or menu details that are not confirmed by an approved source.

---

## 2. Brand Messaging Themes

The Brand Guidelines include the following food/product principles as illustrated brand messages:

- Whole Food Ingredients
- No MSG
- Chicken Cut on the Same Day
- Homemade Sauce
- Sashimi-Grade Salmon
- Organic Vegetable
- Cooked to Order (No Pre-Made)
- Responsible Waste Management
- Grass-Fed Beef
- No Seed Oil

### Usage rule

Treat these as **existing brand claims from the Brand Guidelines**, not as copy to automatically repeat everywhere.

Before publishing them prominently on the live website:

1. confirm they are still operationally accurate;
2. use only claims relevant to the item or section being shown;
3. avoid turning the homepage into a wall of claims.

When uncertain, mark content:

`[REVIEW REQUIRED: confirm current brand claim]`

---

## 3. Logo System

### Primary logo

The primary logo is composed of:

- the **Egg icon**; and
- the **Triple Egg wordmark**.

The Brand Guidelines also show alternative wordmark-only logo treatments.

### Logo usage principles

- Keep every logo variation recognizable and legible.
- Preserve the original proportions.
- Do not stretch, squash, rotate, redraw, recolor, or recreate the logo.
- Prefer supplied original logo assets rather than extracting a logo from the PDF.
- Use the version with sufficient contrast against its background.

### Clear space

The guideline defines logo clear space using the logo cap height as **X**.

For implementation:

- maintain generous clear space around the logo;
- do not place body copy, buttons, icons, or imagery directly against it;
- do not visually crowd the logo in the navbar or footer.

### Recommended repository assets

Use original supplied files when available, for example:

```text
public/brand/
├── logo-primary.svg
├── logo-primary-white.svg
├── logo-wordmark-green.svg
├── logo-wordmark-white.svg
└── egg-icon.svg
```

Do not fabricate missing logo variants.

---

## 4. Typography

The Brand Guidelines specify:

### Header / Display

**ChunkFive**

Use for:

- hero headlines;
- major section titles;
- strong brand moments;
- selected short display labels.

Avoid overusing it for long paragraphs.

### Body

**Satoshi**

Use for:

- paragraph copy;
- navigation;
- menu descriptions;
- buttons;
- metadata;
- location and contact information;
- interface text.

### Implementation guardrail

Do not assume font files or webfont licenses exist.

Before implementation:

1. inspect the repository for licensed font files;
2. use supplied font files if they are approved for web use;
3. if the fonts are unavailable, do not download unverified font files from random sources;
4. use a temporary fallback and mark it clearly for review.

Example:

`[REVIEW REQUIRED: add licensed ChunkFive/Satoshi webfont assets]`

---

## 5. Brand Colors

The Brand Guidelines define the core brand colors as:

### Triple Egg Green

- **HEX:** `#1F4F2B`
- **RGB:** `31, 79, 43`
- **CMYK:** `84, 42, 94, 44`

### White

- **HEX:** `#FFFFFF`
- **RGB:** `255, 255, 255`
- **CMYK:** `0, 0, 0, 0`

The guideline states that both colors can be used in any context as long as they are **well contrasted**.

### Suggested CSS tokens

```css
:root {
  --brand-green: #1f4f2b;
  --brand-white: #ffffff;
}
```

### Website usage guidance

Prefer:

- green as a dominant brand background or strong accent;
- white for clear contrast and breathing room;
- strong contrast between text and background;
- restrained use of additional colors unless they come from approved brand assets or photography.

Do not invent a large secondary palette without approval.

---

## 6. Illustration Style

Triple Egg illustrations are characterized by:

- visible texture;
- wobbly lines;
- warmth;
- pencil-like texture;
- uneven lines;
- visible brush strokes;
- handwritten lettering.

### Color treatment

Illustrations tend toward:

- solid color fills;
- minimal shadows;
- no shadows when unnecessary.

### Website implementation guidance

If illustrations are used:

- prefer official supplied artwork;
- keep them tactile, imperfect, hand-made, and warm;
- avoid polished 3D icons;
- avoid glossy SaaS-style iconography;
- avoid excessive gradients;
- avoid heavy drop shadows;
- avoid generic stock illustration packs.

Do not generate replacement illustrations unless explicitly approved.

---

## 7. Photography & Visual Direction

The Brand Guidelines consistently present:

- close-up food photography;
- strong appetite appeal;
- natural food texture;
- warm dining surfaces and materials;
- bold crops;
- green brand fields paired with food photography;
- simple, high-contrast typography over or beside imagery.

### Website direction

The site should feel:

- bold;
- food-first;
- energetic;
- healthy;
- warm;
- modern;
- approachable;
- visually confident.

Avoid making the site look like:

- a SaaS startup;
- a medical/wellness clinic;
- a bodybuilding supplement store;
- a generic fine-dining template.

Let food photography, ChunkFive display typography, Triple Egg Green, white space, and brand illustrations establish the visual identity.

---

## 8. Website Design System Guidance

### Navigation

Keep navigation clean, high-contrast, and easy to scan.

Recommended top-level navigation:

- Home
- About
- Menu
- Location
- Contact

An Instagram/social CTA may be included where useful.

Do not add Login/Account functionality unless explicitly requested.

### Buttons

Buttons should:

- be easy to identify;
- have strong contrast;
- use concise labels;
- feel solid rather than overly glossy;
- use brand green/white combinations where appropriate.

Avoid excessive gradients, glassmorphism, or elaborate shadows.

### Cards and containers

Do not default to generic rounded SaaS cards everywhere.

For food/menu presentation, prefer:

- editorial image layouts;
- strong photography;
- simple type hierarchy;
- generous spacing;
- restrained borders and shadows.

### Motion

Use subtle motion only:

- gentle image hover;
- simple entrance transitions;
- button feedback;
- mobile menu transitions.

Respect `prefers-reduced-motion`.

---

## 9. Content Rules for Codex

When generating website content:

### Allowed

Codex may:

- summarize verified brand positioning;
- draft concise marketing copy consistent with the tone;
- reorganize confirmed information for web readability;
- create placeholders where facts are missing.

### Not allowed

Codex must not invent:

- menu prices;
- addresses;
- operating hours;
- testimonials;
- awards;
- certifications;
- halal status;
- nutrition claims beyond approved brand information;
- order/delivery URLs;
- store count;
- contact details.

Use:

`[REVIEW REQUIRED: ...]`

for any unresolved factual information.

---

## 10. Source Priority

When sources conflict, use this priority:

1. **Current approved Triple Egg assets and confirmed company information**
2. **Original Triple Egg Brand Guidelines PDF**
3. **Official Triple Egg Instagram / approved public channels**
4. **Draft website copy**
5. **Design inference**

Never override an approved brand rule merely because another website or template looks better.

---

## 11. Reference Website Rule

If `wokthiswaybali.com` is used as a reference:

Use it only for:

- information architecture;
- navigation simplicity;
- general page hierarchy;
- useful restaurant website patterns.

Do **not** copy:

- exact visual design;
- source code;
- colors;
- typography;
- layouts;
- imagery;
- copywriting;
- brand personality.

Triple Egg must remain visually distinct.

---

## 12. Codex Implementation Checklist

Before designing:

- [ ] Read this `BRAND_REFERENCE.md`.
- [ ] Inspect the original Brand Guidelines PDF if available.
- [ ] Inspect all logo and image assets.
- [ ] Confirm whether ChunkFive and Satoshi webfont files are available.
- [ ] Use `#1F4F2B` and `#FFFFFF` as the core brand colors.
- [ ] Preserve logo proportions and clear space.
- [ ] Avoid unapproved visual styles and invented colors.
- [ ] Keep the design food-first and brand-specific.
- [ ] Separate verified facts from draft copy.
- [ ] Mark unresolved facts with `[REVIEW REQUIRED]`.
- [ ] Test visual contrast and mobile readability.

---

## 13. Instruction for Coding Agents

When working on the Triple Egg website, treat this file as a mandatory brand implementation reference.

If the original PDF and this Markdown summary differ, follow the **original PDF** for visual details and flag the discrepancy rather than guessing.

When a decision cannot be resolved from approved assets, prefer the simplest brand-consistent implementation and document the assumption in the final handoff.
