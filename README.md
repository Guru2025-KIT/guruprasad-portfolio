# Guruprasad Shinde — Portfolio

A cinematic, premium personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. The hero section uses a full-bleed talking-avatar video as the page's environment, in the style of the reference clip provided — text overlays on a glass panel, the workspace video fills the background, and the whole thing is wrapped in deep-black/electric-blue cinematic styling.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, with a custom design-token system (colors, type scale, grid background) in `tailwind.config.ts`
- **Framer Motion** for in-view reveals, hero entrance choreography, and micro-interactions
- **Lenis** for smooth/inertial scrolling
- **Self-hosted variable fonts**: Fraunces (display/serif), Geist (body), JetBrains Mono (labels/eyebrows) — all bundled locally, no external font requests at runtime
- Custom cursor, magnetic buttons, ambient floating particles, mouse-reactive glow — all hand-built, no extra dependencies

> Note: the original brief asked for a Three.js/R3F 3D avatar. Since you provided an actual rendered avatar video (and a reference clip showing how you wanted it composited into the hero), I used your real video as the hero's full-bleed background instead — it matches your reference far more closely than a 3D model would, and it's your real likeness/brand asset rather than a generic 3D figure.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/
    layout.tsx              — fonts, metadata, global providers (smooth scroll, cursor, noise)
    page.tsx                 — assembles all homepage sections
    globals.css              — design tokens, grid background, glass/utility classes
    fonts/                   — self-hosted Fraunces, JetBrains Mono, Geist (woff2/woff)
    projects/[slug]/page.tsx — full case-study page per project (e.g. /projects/pragati)
  components/
    Hero.tsx                — full-bleed video hero, stats bar, CTAs
    About.tsx, Skills.tsx, Achievements.tsx, Experience.tsx, Contact.tsx
    Projects.tsx            — homepage "Featured Projects" grid (major/minor tiers)
    ProjectCard.tsx         — homepage card, 2 visual variants by tier
    ProjectThumb.tsx        — real screenshot OR clean placeholder if none provided yet
    ProjectGallery.tsx      — single-image hero shot + lightbox, used on detail pages
    Navbar.tsx / Footer.tsx — page-aware: scroll on the homepage, navigate-then-scroll elsewhere
    ScrollToHashOnLoad.tsx  — makes "/#section" links work correctly when arriving from another page
    Particles.tsx, Magnetic.tsx, Reveal.tsx, CustomCursor.tsx, SmoothScroll.tsx, NoiseOverlay.tsx, BrandIcons.tsx
  lib/
    data.ts                 — hero/about/skills/achievements copy
    projects.ts             — ⭐ all 8 Featured Projects: copy, links, screenshot, full case-study content
    accent.ts               — color-accent class mapping per project (also safelisted in tailwind.config.ts)
    utils.ts                — `cn()` class merge helper
public/
  images/projects/<slug>/   — exactly one screenshot per project that has one (see below)
  video/
    hero-avatar.mp4 / .webm — your processed avatar video (re-encoded, faststart, looping)
    hero-poster.jpg         — first-frame poster shown while video loads
```

## Featured Projects

All 8 projects live in **`src/lib/projects.ts`** as one array — each entry drives both its homepage card *and* its full `/projects/[slug]` case-study page automatically, so you only ever edit one place.

**Tiers** (controls card size/prominence on the homepage):
- `major` — PRAGATI, ToxiScan, MoneyNext, SHINE, SAHAYATA — all 5 shown at identical card size/prominence, no implied ranking between them
- `minor` — SkillGap, EarthPath, Pravaha AI — compact cards

**Each project has:**
- `oneLiner` / `tagline` / `highlights` — homepage card copy
- `tech` — short tech list for the card; `detail.techStackFull` — full breakdown by layer for the detail page
- `github` / `live` — `{ url, isPlaceholder }`. See "Links that still need updating" below.
- `images` — array of `{ src, alt, caption }` with **exactly one entry** for projects that have a screenshot (`hasRealScreenshots: true`), or an empty array for projects that don't yet (`hasRealScreenshots: false` — gets a clean gradient/icon placeholder instead of fake UI).
- `detail` — `simpleExplanation` (plain-words paragraphs), `problem`, `howItWorks` (numbered steps), `keyFeatures`, `techStackFull`, optional `metrics`

### Links that still need updating

A few live-demo and GitHub links weren't available yet, so they're set as placeholders that intentionally point to a URL that doesn't resolve (`isPlaceholder: true`). Search `projects.ts` for `isPlaceholder: true` to find and replace them once deployed:

| Project | Missing link | Currently |
|---|---|---|
| ToxiScan | Live demo | placeholder |
| MoneyNext | Live demo | placeholder |
| SHINE | Live demo | placeholder |
| SkillGap | Live demo | placeholder |
| EarthPath | Live demo | placeholder |

Everything else (PRAGATI live + GitHub, ToxiScan/MoneyNext/SHINE/SkillGap/EarthPath GitHub, SAHAYATA live + GitHub, Pravaha AI live + GitHub) is wired to the real URLs you provided.

### Replacing or adding screenshots

Each project shows **exactly one** screenshot — on its homepage card and as the hero image on its detail page. To swap one out or add one for the first time:

1. Export the screenshot at a decent resolution — **at least 1600px wide** is recommended. The cards and detail-page hero image can render anywhere from ~600px to ~1100px wide depending on screen size, so a small source image (anything under ~900px wide) will visibly soften/blur once it's stretched to fill the card. A clean browser screenshot at your monitor's native resolution, or a 2x/Retina capture, will look sharp at every size the site uses.
2. Save it into `public/images/projects/<slug>/` (e.g. `public/images/projects/pragati/01-home.jpg`).
3. In `projects.ts`, update that project's `images` array to point at the new file — keep it to a single entry — and set `hasRealScreenshots: true`.

SHINE, SkillGap, EarthPath, and Pravaha AI currently show a clean gradient placeholder with the project's initial (no fake UI) since no screenshots were provided yet — same steps above to add a real one once you have it.

## Editing content

Hero/about/skills/achievements copy lives in **`src/lib/data.ts`**. Project copy lives in **`src/lib/projects.ts`** (see above). Update either file and the site updates everywhere it's used — no need to touch component files for text changes.

To change your phone number, swap the placeholder in `profile.phone` in `data.ts`. To update social links, edit `githubUrl` / `linkedinUrl`.

## Hero video behavior

The hero video lives at `public/video/hero-avatar.mp4` (+ `.webm` for smaller file size, + `hero-poster.jpg` as the loading poster).

**Sound:** every browser blocks a video from playing with sound the instant a page loads — audio can only start after the user has actually interacted with the page (a click, tap, key press, or scroll). There's no way around this; it's a platform-level restriction, not a setting in this codebase. To get sound playing as early as realistically possible, the video starts **muted** on load, and the very first click/tap/keypress/scroll anywhere on the page immediately unmutes it. A small "Click anywhere for sound" hint fades in after about a second and disappears the instant that first interaction happens.

**Play / pause / restart on scroll:** an `IntersectionObserver` watches the hero section itself. Scroll the hero out of view (e.g. down to the Projects section) and the video pauses exactly where it is. Scroll back up so the hero re-enters view and it restarts from 0:00 and plays again — with sound, if it was already unlocked earlier in the session. This logic lives in `Hero.tsx`.

If you record a new version of the video:

1. Export at 1280×720 or similar 16:9, ideally under 10–15s.
2. Re-encode for the web, **keeping the audio track** (this keeps file size low and seeking instant):
   ```bash
   ffmpeg -i your-video.mp4 -c:v libx264 -crf 20 -preset slow -c:a aac -b:a 128k -movflags +faststart public/video/hero-avatar.mp4
   ffmpeg -i public/video/hero-avatar.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 96k public/video/hero-avatar.webm
   ffmpeg -i public/video/hero-avatar.mp4 -vf "select=eq(n\,0)" -frames:v 1 public/video/hero-poster.jpg
   ```
3. The hero crops/positions the video via `object-position` in `Hero.tsx` — adjust the `62% 30%` value if your new video frames the subject differently.

## Cross-page navigation links

The Navbar and Footer are shown on both the homepage and every `/projects/[slug]` page. Their links (About, Projects, Skills, etc.) are anchors like `#about` that only exist as elements on the homepage — so both components check which page they're currently on:

- **On the homepage**, clicking a link smooth-scrolls to that section directly.
- **On any other page** (e.g. a project detail page), clicking a link navigates to `/#about` and a small helper component, `ScrollToHashOnLoad.tsx`, picks up the URL hash once the homepage has mounted and scrolls to it. It retries a few times over about 1.5s to stay reliable even on sections that sit below image-heavy areas (like Skills, which is below the screenshot-laden Projects section) — if you start scrolling manually during that window, it backs off immediately rather than fighting you for control.

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Or push this repo to GitHub and import it directly at vercel.com/new — zero config needed, this is a standard Next.js App Router project.

## Fonts & licensing

Fraunces and JetBrains Mono are bundled as self-hosted variable fonts (`src/app/fonts/`) under the SIL Open Font License — the license text is included alongside each font (`OFL-Fraunces.txt`, `OFL-JetBrainsMono.txt`). They're self-hosted (rather than loaded from Google Fonts at runtime) so the build doesn't depend on external network access and loads slightly faster.

## Accessibility

- Visible keyboard focus rings on all interactive elements
- `prefers-reduced-motion` is respected — animations and smooth scroll fall back to instant/none
- Custom cursor and Lenis smooth-scroll are automatically disabled on touch devices
