# Annapurna Vadaparty — academic website

A plain static site: hand-written HTML, **one** shared stylesheet (`/style.css`), and a
small amount of vanilla JavaScript. No framework, no build step, no `fetch()`. It opens
correctly from `file://` for local preview and is meant to be dropped straight into a
GitHub Pages repo.

## Quick start

1. Put the contents of this folder at the **root** of the `apvadaparty.github.io` repo
   (so `index.html` is at the repo root).
2. Commit and push. GitHub Pages serves the site at `https://apvadaparty.github.io/`.
3. `.nojekyll` is included so Pages serves the files as-is.

All internal paths are **root-relative** (e.g. `/style.css`, `/teaching/`), which is
correct for a user/organization Pages site served from the domain root. If you ever move
the site into a *project* repo served from a subpath, those root-relative paths would need
a prefix — but for `apvadaparty.github.io` they are correct as written.

## File tree

```
/
├── index.html                      Home (the prose bio)
├── style.css                       The one shared stylesheet
├── .nojekyll                       Tell Pages: serve as-is
├── research/index.html             Research: areas, lab affiliations, projects
├── cv/
│   ├── index.html                  Links to the CV PDF
│   └── vadaparty-cv.pdf
└── teaching/
    ├── index.html                  Courses I instruct (JS) + TA/staff list (static)
    ├── courses.js                  Data + renderer for the instructor-course list
    └── cse151b/                    A fully self-contained course (see "Archiving")
        ├── index.html              Course home
        ├── schedule.js             Schedule DATA + renderer
        ├── syllabus.pdf
        ├── schedule/index.html     The schedule grid (rendered from ../schedule.js)
        ├── assignments/index.html  (placeholder — "coming soon")
        ├── grading/index.html      (assessments & grading standards)
        ├── project/index.html
        ├── office-hours/index.html
        └── readings/index.html     Readings & videos (authored HTML, not JS)
```

## How the site works

**Routes are folders with an `index.html`.** Clean URLs (`/research/`, `/teaching/cse151b/schedule/`)
come for free; there is no router.

**Exactly two regions are JavaScript-rendered.** Everything else is authored HTML.

1. The **schedule grid** on `teaching/cse151b/schedule/index.html`, rendered by
   `schedule.js` into `<div id="schedule-grid">`.
2. The **instructor-course list** on `teaching/index.html`, rendered by `courses.js`
   into `<div id="course-list">`.

Both regions have a `<noscript>` fallback in the HTML, so with JavaScript off the schedule
points to the syllabus PDF and the course list still shows CSE 151B. Each data file holds
its data *and* its render function and self-registers on `DOMContentLoaded`, so the data
travels with its renderer in a single file.

**The top nav is hardcoded, identical on every page, between markers:**

```html
<!-- NAV:START ... -->   ...   <!-- NAV:END -->
```

The block is byte-identical across all pages **except** the single `aria-current="page"`
attribute that marks the current page. It uses root-relative hrefs, which is what lets the
block be identical at every folder depth. A nav change is a find-and-replace between the
markers, after which you re-apply `aria-current` on each page's current link.

**The course sub-nav is also marked**, between `<!-- COURSE-NAV:START -->` and
`<!-- COURSE-NAV:END -->`. It uses **relative** paths (not root-relative) on purpose, so a
whole course folder can be copied to an archive subfolder with nothing to rewrite (see
below). Relative paths depend on depth, so the block exists in **two forms**:

- a **course-home** form (`schedule/`, `assignments/`, …) on `cse151b/index.html`, and
- a **sub-page** form (`../schedule/`, `../assignments/`, …) on the six sub-pages.

The six sub-pages share one identical block; the home page has the other. This two-form
split is the deliberate cost of making archival copies self-contained — see the next
section. (The top nav does *not* have this problem because it is root-relative and points
at site-level pages, which is also what an archived copy should still link back to.)

## Common edits

**Add a course you instruct.** Add an object to `COURSES` in `teaching/courses.js` and
create its folder under `teaching/`. The hardcoded nav does not change. Update the
`<noscript>` list in `teaching/index.html` to match (it mirrors the rendered list).

**Add or edit a schedule week or item.** Edit `SCHEDULE.weeks` in
`teaching/cse151b/schedule.js`. Each day is `{ date, items: [...] }`; each item is
`{ type, text, href? }`. An item **with** an `href` renders as a link; **without** one it
renders as plain text — that is how we avoid dead links. `type` is one of `pre-lecture`,
`lecture-topic`, `discussion`, `assessment`, `deadline`.

**Change the nav.** Edit the block between `NAV:START`/`NAV:END` on one page, paste the
identical block onto the others, then set `aria-current="page"` on the right link per page.

**Update a reading.** `readings/index.html` is authored HTML (deliberately not generated),
grouped by week. Link videos by URL; leave chapters/tutorials/surveys as plain text.

**Archive an offering.** Copy the whole `cse151b/` folder to, e.g., `cse151b/su26/`.
Because the course sub-nav, `schedule.js`, and `syllabus.pdf` are all referenced with
relative paths, the copy works with no edits. Then edit the files at the **bare** route
(`cse151b/`) to become the new offering, and add a link to the archived one in the
"Previous offerings" list on the course home (there is a commented example there).

## Design tokens

Defined as CSS custom properties at the top of `style.css`:

- `--bg #f4efe3` parchment background
- `--ink #221c17` warm near-black body text
- `--ink-soft #4a4239` muted text (captions, dates)
- `--link #7a2024` maroon — the one accent; body links are maroon and underlined
- `--link-visited #5f1a20`
- `--olive #56592b` — **reserved for large/structural use only** (rules, focus rings,
  header-band borders, the left rules on schedule item groups). Not used for small text,
  even though it passes contrast, because the brief reserves it.
- `--rule #cabd9f` tan borders · `--band #e9e0cd` table header band

Every text/background pair meets WCAG AA for normal text (lowest is olive-on-parchment at
6.4:1). Body type is a serif stack (`ui-serif, "Iowan Old Style", "Palatino Linotype",
Palatino, Georgia, serif`). The schedule is a real `<table>` that reflows below 700px into
stacked per-day blocks; the column headers stay in the accessibility tree (visually hidden,
not `display:none`) and each cell shows its day via a `data-day` label. Skip link, visible
keyboard focus, and `prefers-reduced-motion` are all in.

## Content & privacy decisions

- **Course staff are listed by name only** — no bios, photos, or contact details — per the
  privacy direction.
- **"Recitation" is rendered as "Discussion"** everywhere, by decision.
- **Populate, don't hallucinate.** A pre-lecture item is linked only when a real URL
  exists for it; otherwise it is plain text. Items the syllabus left as TODO are shown as a
  visibly-marked "to be finalized" (`.tbd`) rather than invented. No publications list is
  included on the Research page, by request.
- **Videos come only from the supplied pre-lecture video list** (verified titles + YouTube
  IDs), to avoid inventing video references.

## Gaps log

Everything below was unfinished, unspecified, or flagged in the source material. None of it
was invented; each is surfaced on the page as "to be finalized" or left as plain text.

**Marked "to be finalized" on the pages:**

- Schedule / readings — Week 2 Tue: the in-class **CNN activity** (syllabus TODO to create it).
- Schedule / readings — Week 2 Wed: **remaining topics for Exam 1** (syllabus TODO).
- Schedule / readings — Week 4 Mon: reading/video to prepare for **Jay McClelland's** guest talk (unspecified).
- Schedule / readings — Week 4 Wed: reading/video to prepare for **Gary Cottrell's** guest talk (unspecified).
- Course home — learning outcomes: the **"additional topics"** under advanced topics.
- Assignments — standards for **oral assessments**, **Learning Process & Resource Reflections**, and **pre-lecture homeworks for correctness** (empty in the syllabus).
- Assignments — the standards-based-grading **reference link** (Prof. Joe Politz); no URL was given, so the name is mentioned without a dead link.
- Assignments — the **oral-exam signup deadline** date.
- Project — the **Communication** track description and the **Kaggle competition** track description (both syllabus TODOs); the **draft rubric**.
- Office hours — **times and locations** (not present in the syllabus).

**Plain text by design (no link, because no URL was provided):** StatQuest chapters
(Ch. 1, 3 and Ch. 2), the 224N PyTorch colab tutorial, "LSTMs" (Week 3 Mon), the
PrairieLearn pre-lecture homeworks, and the pre-course / mid-quarter / end-quarter surveys.

**Flagged in the source video list (⚠️):** two videos carried a ⚠️ marker in the supplied
pre-lecture video file —

- *But what is a GPT? Visual intro to transformers | Chapter 5, Deep Learning* (`wjZofJX0v4M`)
- *Attention in transformers, step-by-step | Deep Learning Chapter 6* (`eMlx5fFNoYc`)

Their titles are used verbatim with the ⚠️ marker removed (it is not part of the title).
Worth a human double-check that each ID maps to the intended 3Blue1Brown chapter before the
quarter starts.

**Worth confirming:** the room code **"COA B30"** is reproduced literally from the syllabus
(no building-name expansion was invented). **Alexander Radulescu's** specific staff role was
not clearly specified, so the three staff are listed together by name under "Teaching staff."
