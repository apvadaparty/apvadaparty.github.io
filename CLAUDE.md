# CLAUDE.md — apvadaparty.github.io

Operating guide for this site. Read this before making changes. The goal is a site
the owner can understand and maintain by hand — **do not regenerate large portions
for a small change.** Make the smallest edit that does the job, and match what is
already there.

See `README.md` for the file tree and step-by-step edit recipes; this file is the
"rules of the road."

---

## What this site is

- A **plain static site** on **GitHub Pages**, served at the domain root
  `https://apvadaparty.github.io/`.
- **Hand-written HTML + one shared stylesheet (`/style.css`) + a little vanilla JS.**
- **No framework, no bundler, no npm, no build step, no `fetch()`.** "Client-side JS"
  means a few small, hand-readable `.js` files — never React or similar.
- **Root-relative paths** (`/style.css`, `/teaching/`). Correct because this is a
  user/organization Pages site at the root. Do not switch to relative-path hacks.
- **Routes are folders with an `index.html`** (`/research/`, `/teaching/cse151b/schedule/`).
  Clean URLs, no router.
- Opens correctly from `file://` — keep it that way (no `fetch`, no build).

---

## Style requirements (the look and feel)

**Do not make it look or feel AI-generated.** The style is academic, intentional,
and minimalist — not shiny. No emojis-as-decoration, no fancy buttons.

**Forbidden:**
- gradient hero sections
- rounded-corner card grids
- drop shadows
- emoji bullets
- oversized centered headings
- pill / badge components
- "Get Started"–style CTA language

**Required:**
- left-aligned body text
- a restrained palette: near-black text on off-white, **one** accent color
- a real typographic hierarchy from a deliberate type choice (a serif, or a clean
  system/sans stack — chosen on purpose, not default)
- genuine `<table>` elements for tabular data
- links that visibly read as links

**Current realization of the palette/type (keep consistent unless asked to change):**
- Background: **soft off-white `#fafaf7`**; header/table band `#f5f5f5`.
- Main accent: **maroon `#5f1a20`** (with `#4a1418` for stronger/visited). Minimal number of accent colors. 
- Type: **Montserrat** for body, **Lato** for headings/nav/footer (deliberate pairing,
  loaded from Google Fonts).
- Greys for secondary text are contrast-checked: `--muted #595959` (7:1, AAA),
  `--faint #6a6a6a` (5.4:1, AA). Do not lighten these past AA.

---

## Accessibility (required, not optional)

- **Semantic HTML** and landmarks (`<header>`, `<main id="main">`, `<nav>`, `<footer>`).
- A **skip link** to `#main` on every page; `<html lang="en">`; a single `<h1>` per page.
- **Tables:** real `<table>` with `<th scope="col|row">`.
- **Images:** meaningful `alt` text.
- **Contrast:** meet **WCAG AA** minimum (4.5:1 normal text, 3:1 large). When picking
  any new color, verify the ratio before using it.
- **Links must not rely on color alone** (the maroon sits near body-text luminance):
  links in prose/lists carry an underline; grouped nav bars may stay underline-free
  because they read as navigation.
- **Keyboard:** everything reachable and operable; **visible focus states**
  (`:focus-visible` outline) — do not remove them.
- Each `<nav>` has an `aria-label`; the current page's link has `aria-current="page"`,
  styled visibly.

---

## Maintainability & compatibility

- Keep it **understandable, modular, and small** so the owner can edit it directly.
- **Mobile-friendly** across device sizes (the layout already reflows; test narrow
  widths — the schedule grid stacks below 700px).
- **Browser-friendly** across common browsers; stick to widely-supported CSS/JS.
- All styling lives in the **one** `style.css`. Do not add per-page `<style>` blocks
  or inline styles for theming.

---

## Navigation — hardcoded, NOT data-driven

The top nav and the course sub-nav are **plain HTML written directly in each page**,
not injected by JS — so they work with JS off and appear in view-source (no `<noscript>`
needed).

- **Top nav** (personal site pages): `Home · Research · Teaching · CV`, wrapped in
  `<!-- NAV:START — keep identical across all pages --> … <!-- NAV:END -->`.
- **Course sub-nav** (CSE 151B pages): `Home · Schedule · Assignments · Grading ·
  Project · Office Hours · Readings & Videos`, wrapped in
  `<!-- COURSE-NAV:START … --> … <!-- COURSE-NAV:END -->`.
- The block between markers must be **identical** across the pages that use it
  (only `aria-current="page"` differs per page). Changing the nav is a mechanical
  **find-and-replace between the markers** — not a hunt.
- Mark the current page with `aria-current="page"` and keep its visible styling.

**Intentional exception:** the CSE 151B course pages **omit the personal top nav**
entirely, so the course site stays about the course, not the owner. They carry only
the course sub-nav (which starts with `Home`, the course home). Do not re-add the
personal nav to course pages.

---

## Data-driven (JS-rendered) parts — schedule and course list ONLY

Exactly **two** regions are rendered from data at load time; everything else is
authored HTML.

1. **Schedule grid** — `teaching/cse151b/schedule/index.html`, rendered by
   `teaching/cse151b/schedule.js` (`const SCHEDULE = …`) into `<div id="schedule-grid">`.
2. **Instructor course list** — `teaching/index.html`, rendered by `teaching/courses.js`
   (`const COURSES = …`) into its placeholder.

Rules:
- Each data set lives in **one `.js` file**, loaded via `<script src>`, holding its data
  *and* a small vanilla render function that self-registers on `DOMContentLoaded`.
- **No `fetch()`** — so `file://` preview works by just opening the file.
- `courses.js` is the **single source of truth** for which courses exist; the Teaching
  list renders from it. Adding a course does **not** touch the hardcoded nav.
- **Both regions keep a `<noscript>` fallback:** the schedule's points to the syllabus
  PDF; the course list's is a plain static `<ul>` of course names + links — so neither
  page is ever blank without JS.

---

## Common edit operations

(Keep `README.md` in sync with these.)

- **Add a course:** add an entry to `teaching/courses.js`; create its folder/pages if
  it's a full course. The Teaching list updates itself; the nav does not change.
- **Add a schedule week:** append an object to `SCHEDULE.weeks` in `schedule.js`.
- **Add/edit a schedule item:** edit that day's `items` array (type + text, optional `href`).
- **Change the nav:** find-and-replace the block between `NAV:START/END`
  (or `COURSE-NAV:START/END`) across the relevant pages.
- **Update a reading:** edit `teaching/cse151b/readings/index.html` (authored HTML), or
  the relevant pre-lecture item in `schedule.js`.

---

## Workflow

- **Preview locally:** `python3 -m http.server 8000` from the repo root → `localhost:8000`.
  (The Python server sends no-cache, so edits show on plain refresh.)
- **Commit/push only when the owner asks.** Pushing to `main` auto-triggers the Pages
  build; the live site updates in ~1 min.
- **GitHub Pages caches** `style.css` (`max-age=600`), so after a push the owner may
  need a hard refresh (Cmd+Shift+R) to see CSS changes.
- Keep diffs small and readable; preserve the existing comment style and CSS variables.
