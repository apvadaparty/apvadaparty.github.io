# Course schedule — implementation spec

**For:** Claude Code, working in the static site (plain HTML + one shared CSS file +
vanilla JS, GitHub Pages, no build step).
**Scope:** the schedule is **one of your two JS-rendered regions**. This spec covers only
that region. Everything else on the page (nav, headings, prose) stays authored HTML.

---

## How this meets the site constraints

| Constraint | How this spec satisfies it |
|---|---|
| One accent color (site-wide) | The rest of the site uses a single accent. The **schedule** keeps a deliberate two-hue stakes encoding (plum = deadline, amber = assessment) — a contained exception, scoped to `.schedule` via `--sch-*` tokens so it can't leak into the rest of the site. |
| Keep existing reading/video links | Readings render as underlined `<a>`; the agent must carry over the real hrefs already in the GitHub repo (see "What you're doing"). |
| Genuine `<table>` for tabular data | The schedule renders a real `<table>` with `<thead>`/`<tbody>`/`<th>`. |
| Table headers with `scope` | Day headers `scope="col"`, lane labels `scope="row"`. |
| Links read as links | Reading items render as underlined `<a>` in the accent. |
| Vanilla JS, no framework/build/fetch | `schedule.js` (`const SCHEDULE`) + one small render file; data via `<script src>`. Works on `file://`. |
| `<noscript>` fallback | Schedule placeholder includes a `<noscript>` link to the syllabus. |
| Minimalist / not AI-looking | No gradients, shadows, pills, rounded cards, emoji, or CTAs. Hairline rules, left-aligned. |
| Mobile + cross-browser | One table in a keyboard-focusable horizontal-scroll region; no modern-only CSS. |
| Maintainable / modular | All content lives in `schedule.js`; the renderer is "dumb" (renders exactly what's in the data). |

---

## What you're doing

The existing page already contains the full quarter's schedule. Move that content into
`schedule.js` as data, and render it into a placeholder with the small function below.
Do **not** invent content — transcribe the real weeks exactly.

**Keep every existing link.** Your current GitHub site already has the correct hyperlinks
on the readings and videos (3b1b, StatQuest, DeepLearning.AI, the PyTorch colab, and so
on). Carry each of those exact URLs into `schedule.js` as the item's `href`. The URLs in
the example data below are **placeholders** — replace them with the real ones from the
repo. A reading or video that links today must still link after the change; never demote
a linked item to plain text. (My reference shows some items as plain text only because I
don't have your URLs — that's the gap you're filling, not the intended end state.)

---

## Design intent — preserve these

The redesign exists to prevent two specific student failures: *"I didn't know I was
supposed to do that"* and *"I didn't realize that was due."* Keep these invariants:

1. **Stable category position.** Activity types are horizontal lanes with one left-hand
   label, not labels repeated inside each cell. One lane answers one question.
2. **Deadlines have a fixed, prominent home.** Submittable work lives in a `Due` lane.
   There are **two** Due lanes per week (pre-lecture homework above the lecture;
   assignment deadlines at the bottom); both share one treatment so the color reads as a
   single "you submit something" code.
3. **Weight tracks stakes — two contained hues.** Deadlines get one hue (plum),
   assessments a second (amber), everything else uncolored. This two-color encoding is
   the schedule's one sanctioned exception to the site's single-accent rule; it lives only
   here, defined in `--sch-*` tokens. Color only reinforces — the lane label and icon
   carry the meaning on their own, so the distinction survives for color-blind readers and
   in grayscale.
4. **Empty cells are intentional.** Render a muted em-dash (hidden from screen readers),
   never a blank cell.

---

## Structure

Per week: a week heading (label · topic · date range), then a table whose **columns are
weekdays** with a date subhead and whose **rows are lanes** in this fixed order:

| Lane key | Label | Notes |
|---|---|---|
| `materials` | Pre-lecture materials | Renamed from old "Before lecture". Readings/videos (often links). |
| `duePre` | Due | Pre-lecture homework. Slim row, sits **above** Lecture. |
| `lecture` | Lecture | |
| `discussion` | Discussion | |
| `assessment` | Assessment | Oral assessments, exam (CBTF) windows. |
| `due` | Due | Assignment deadlines (proposal, AN due, LPRR, correctness HW). |

Mapping from the old categories: `BEFORE LECTURE → materials`, `LECTURE → lecture`,
`DISCUSSION → discussion`, `ASSESSMENT → assessment`, `DUE → due`. The `duePre` lane is
new.

**Pre-lecture HW convention** (author it explicitly in the data, so the file is the
single source of truth): every day that has a lecture gets `duePre: [{ text:
"Pre-lecture HW" }]`, **except** the term's first session (intro/syllabus). The renderer
stays dumb — what's in `schedule.js` is exactly what shows.

> Confirm: the old table also had a Friday *"Pre-lecture HW (correctness)"* in the bottom
> `due` lane. I'm treating per-session completion (`duePre`) and weekly correctness
> (`due`) as two distinct deadlines. If they're the same artifact, keep only one.

---

## Icons

Decorative inline SVG (the label carries the meaning, so each icon is `aria-hidden`).
Substitute your site's icon set if you have one; otherwise the renderer inlines these.

- `materials` → book · `lecture` → people · `discussion` → people *(intentionally the
  same as Lecture — class is discussion-heavy)* · `assessment` → clipboard-check ·
  `due` / `duePre` → **circle-check** *(a checkmark, deliberately not an alert icon)*.

---

## Data — `schedule.js`

Single source of truth. Loaded with a plain `<script src>`. To **add a week**, copy a
week object. To **update a reading**, edit its `text`/`href`.

```js
// schedule.js — the course schedule, as data. No framework, no fetch.
// Each item is { text } or { text, href }. Lanes are optional per day.
const SCHEDULE = {
  laneOrder:  ["materials", "duePre", "lecture", "discussion", "assessment", "due"],
  laneLabels: {
    materials:  "Pre-lecture materials",
    duePre:     "Due",
    lecture:    "Lecture",
    discussion: "Discussion",
    assessment: "Assessment",
    due:        "Due"
  },
  weeks: [
    {
      label: "Week 1", topic: "MLPs", range: "Jun 29 – Jul 3",
      days: [
        { weekday: "Mon", date: "Jun 29", lanes: {
          materials:  [{ text: "Pre-course survey", href: "survey.html" }],
          lecture:    [{ text: "Intro & syllabus" }],
          discussion: [{ text: "Setup" }, { text: "Study tips" }]
        }},
        { weekday: "Tue", date: "Jun 30", lanes: {
          materials:  [
            { text: "3b1b: MLPs",             href: "https://www.youtube.com/watch?v=aircAruvnKk" },
            { text: "3b1b: Gradient descent", href: "https://www.youtube.com/watch?v=IHZwWFHWa-w" },
            { text: "StatQuest Ch 1, 3",      href: "https://example.edu/statquest" }
          ],
          duePre:     [{ text: "Pre-lecture HW" }],
          lecture:    [{ text: "MLPs" }],
          discussion: [{ text: "Oral assessment demo" }]
        }},
        { weekday: "Wed", date: "Jul 1", lanes: {
          materials:  [
            { text: "3b1b: Backprop (intuition)", href: "https://www.youtube.com/watch?v=Ilg3gGewQ5U" },
            { text: "3b1b: Backprop (calculus)",  href: "https://www.youtube.com/watch?v=tIeHLnjs5U8" },
            { text: "StatQuest Ch 2",             href: "https://example.edu/statquest" }
          ],
          duePre:     [{ text: "Pre-lecture HW" }],
          lecture:    [{ text: "Backpropagation" }],
          discussion: [{ text: "Review" }, { text: "Practice oral assessment" }],
          due:        [{ text: "A0 due", href: "a0.html" }]
        }},
        { weekday: "Thu", date: "Jul 2", lanes: {
          assessment: [{ text: "A0 oral assessments" }]
        }},
        { weekday: "Fri", date: "Jul 3", lanes: {
          due: [{ text: "Pre-lecture HW (correctness)" }, { text: "A0 LPRR" }]
        }}
      ]
    }
    // … Week 2 (CNNs) and the rest follow the same shape; fill from the existing table.
  ]
};
```

---

## Markup — the placeholder

Authored HTML on the Schedule page. The page itself carries the hardcoded top nav and
course sub-nav (between their `NAV:`/`COURSE-NAV:` markers) — the schedule is the only
JS-rendered part of this page.

```html
<section aria-labelledby="schedule-heading">
  <h2 id="schedule-heading">Schedule</h2>

  <p class="sch-legend" aria-hidden="false">
    <span><span class="sch-key sch-key--due"></span>graded deadline — submit</span>
    <span><span class="sch-key sch-key--assess"></span>assessment — be there</span>
  </p>

  <!-- The renderer fills this. It is empty (not blank-looking) only if JS is off. -->
  <div id="schedule"></div>

  <noscript>
    <p>The interactive schedule needs JavaScript. The full schedule and all deadlines are
       in the <a href="syllabus.html">course syllabus</a>.</p>
  </noscript>
</section>

<!-- order matters: data first, then renderer -->
<script src="schedule.js"></script>
<script src="render-schedule.js"></script>
```

---

## Renderer — `render-schedule.js`

Small, dependency-free, no `fetch`, **no TypeScript and no modules** — plain ES5-style
`var`/`function`, so it runs as-is in any browser and over `file://` with no build. Builds
the table with `createElement` (so reading
links and text are inserted safely as text, not interpolated HTML).

```js
// render-schedule.js — builds the schedule from SCHEDULE. Vanilla, no framework.
(function () {
  var ICONS = {
    materials:  '<svg viewBox="0 0 24 24"><path d="M5 4h10a2 2 0 0 1 2 2v13a1 1 0 0 0-1-1H6a1 1 0 0 1-1-1z"/><path d="M5 4a1 1 0 0 0-1 1v13"/></svg>',
    people:     '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 6.5a3 3 0 0 1 0 6"/><path d="M19.5 19c0-2-1-3.6-2.8-4.4"/></svg>',
    assessment: '<svg viewBox="0 0 24 24"><rect x="6" y="4.5" width="12" height="15.5" rx="2"/><path d="M9 4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6H9z"/><path d="M9 13l2 2 4-4.5"/></svg>',
    check:      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>'
  };
  var LANE_ICON = {
    materials: "materials", lecture: "people", discussion: "people",
    assessment: "assessment", due: "check", duePre: "check"
  };
  var LANE_ROWCLASS = { assessment: "sch-assess", due: "sch-due", duePre: "sch-due sch-prehw" };

  function elem(tag, className) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    return n;
  }

  function iconSpan(laneKey) {
    var s = elem("span", "sch-ic-wrap");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[LANE_ICON[laneKey]] || "";   // static, trusted strings only
    return s;
  }

  function itemNode(item) {
    var node = item.href ? elem("a", "sch-i") : elem("span", "sch-i");
    if (item.href) node.href = item.href;
    node.textContent = item.text;                    // user content as text, never HTML
    return node;
  }

  function cellNode(items) {
    if (!items || !items.length) {
      var td = elem("td", "sch-em");
      var dash = elem("span");
      dash.setAttribute("aria-hidden", "true");
      dash.textContent = "—";
      td.appendChild(dash);
      return td;
    }
    var cell = elem("td");
    items.forEach(function (it) { cell.appendChild(itemNode(it)); });
    return cell;
  }

  function weekTable(week, data) {
    var table = elem("table", "sch");

    var thead = elem("thead");
    var hr = elem("tr");
    var corner = elem("th", "sch-lane");
    corner.scope = "col";
    var srOnly = elem("span", "sch-sr-only");
    srOnly.textContent = "Activity";
    corner.appendChild(srOnly);
    hr.appendChild(corner);
    week.days.forEach(function (d) {
      var th = elem("th");
      th.scope = "col";
      th.appendChild(document.createTextNode(d.weekday));
      var dt = elem("span");
      dt.textContent = d.date;
      th.appendChild(dt);
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    table.appendChild(thead);

    var tbody = elem("tbody");
    data.laneOrder.forEach(function (laneKey) {
      var tr = elem("tr", LANE_ROWCLASS[laneKey] || "");
      var lane = elem("th", "sch-lane");
      lane.scope = "row";
      lane.appendChild(iconSpan(laneKey));
      lane.appendChild(document.createTextNode(data.laneLabels[laneKey]));
      tr.appendChild(lane);
      week.days.forEach(function (d) {
        tr.appendChild(cellNode((d.lanes || {})[laneKey]));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  function render(root, data) {
    data.weeks.forEach(function (week) {
      var h = elem("p", "sch-wk");
      h.textContent = week.label + " · " + week.topic + " ";
      var rng = elem("span", "sch-rng");
      rng.textContent = week.range;
      h.appendChild(rng);
      root.appendChild(h);

      // keyboard-focusable horizontal scroll keeps the genuine table on small screens
      var scroll = elem("div", "sch-scroll");
      scroll.tabIndex = 0;
      scroll.setAttribute("role", "region");
      scroll.setAttribute("aria-label", week.label + " schedule");
      scroll.appendChild(weekTable(week, data));
      root.appendChild(scroll);
    });
  }

  var root = document.getElementById("schedule");
  if (root && typeof SCHEDULE !== "undefined") render(root, SCHEDULE);
})();
```

---

## Styles — add to the one shared CSS file

Scope everything under `.schedule` so it can't leak. Reading links use your site's single
`--accent` (consistent with the rest of the site). The schedule's **two** stakes colors
are its own scoped tokens on `.schedule` — the deliberate, contained exception. Each is
hand-authored (no `color-mix`) and must pass **AA** against its text.

```css
/* Site accent — defined once in :root for the WHOLE site (links, current-nav, etc.).
   Example only; substitute yours. Not plum, to keep it visibly separate from the
   schedule's deadline color. */
:root { --accent: #355070; }

/* The schedule's two stakes colors — scoped so they don't leak site-wide.
   Plum = deadline, amber = assessment. Verify each fg passes AA on its bg. */
.schedule {
  --sch-due-bg:    #ece1ee;   /* deadline row fill (plum) */
  --sch-due-fg:    #5f2c6b;   /* deadline text + label */
  --sch-assess-bg: #faeeda;   /* assessment row fill (amber) */
  --sch-assess-fg: #6b3d08;   /* assessment text + label */
}
/* If you'd rather not add a third hue site-wide, set --sch-due-bg/-fg to tints of
   --accent — but you chose the distinct two-color schedule, so plum + amber is default. */

/* ---------- Course schedule ---------- */
.sch-sr-only { position:absolute; width:1px; height:1px; margin:-1px; padding:0;
  overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }

.sch-wk  { margin:1.5rem 0 .35rem; font-size:1rem; font-weight:600; }
.sch-rng { font-weight:400; color:var(--muted, #5a5650); }

.sch-legend { display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center;
  margin:.25rem 0 .5rem; font-size:.8rem; color:var(--muted, #5a5650); }
.sch-legend > span { display:inline-flex; align-items:center; gap:.4rem; }
.sch-key { width:.85rem; height:.85rem; display:inline-block; border:1px solid var(--border, #cfc9bd); }
.sch-key--due    { background:var(--sch-due-bg); }
.sch-key--assess { background:var(--sch-assess-bg); }

.sch-scroll { overflow-x:auto; }
.sch-scroll:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }

.sch { width:100%; min-width:38rem; border-collapse:collapse; table-layout:fixed;
  margin:.25rem 0 .75rem; font-size:.8rem; }
.sch th, .sch td { border:1px solid var(--border, #cfc9bd); vertical-align:top;
  padding:.4rem .5rem; text-align:left; font-weight:400; }
.sch thead th { font-weight:600; background:var(--surface, #efe9dd); }
.sch thead th span { display:block; font-weight:400; font-size:.72rem; color:var(--muted, #5a5650); }

.sch-lane { width:7.5rem; background:var(--surface, #efe9dd); font-weight:600; }
.sch-ic-wrap { display:inline-block; vertical-align:-2px; margin-right:.35rem; line-height:0; }
.sch-ic-wrap svg { width:.85rem; height:.85rem; fill:none; stroke:currentColor;
  stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }

.sch-i { display:block; }
a.sch-i { color:var(--accent); text-decoration:underline; }
a.sch-i:hover { text-decoration:none; }
a.sch-i:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }

.sch-em { color:var(--muted, #5a5650); }

/* two scoped hues: plum = deadline, amber = assessment */
.sch-due    td:not(.sch-lane) { background:var(--sch-due-bg);    color:var(--sch-due-fg); }
.sch-due    .sch-lane         { color:var(--sch-due-fg); }
.sch-assess td:not(.sch-lane) { background:var(--sch-assess-bg); color:var(--sch-assess-fg); }
.sch-assess .sch-lane         { color:var(--sch-assess-fg); }
/* keep empty cells quiet even inside a tinted row */
.sch-due td.sch-em, .sch-assess td.sch-em { color:var(--muted, #5a5650); }
.sch-prehw  td                { padding-top:.25rem; padding-bottom:.25rem; }
```

Specificity note: `.sch-due`/`.sch-assess` deliberately target `td:not(.sch-lane)` to
sit above the base `.sch td` rule; keep that pattern and don't add element-only
selectors that would cancel it.

---

## Accessibility checklist (all required)

- Real `<table>`; day headers `scope="col"`, lane headers `scope="row"`.
- Decorative icons `aria-hidden`; the lane label is the accessible name.
- Empty-cell dash is `aria-hidden` so screen readers hear an empty cell, not "dash".
- Reading links are real `<a>`, underlined, with a visible `:focus-visible` ring.
- Horizontal-scroll region is `tabindex="0"` + `role="region"` + `aria-label`, so it's
  keyboard-scrollable.
- `<noscript>` routes no-JS users to the syllabus.
- Verify AA (≥4.5:1) for: `--sch-due-fg` on `--sch-due-bg`, `--sch-assess-fg` on
  `--sch-assess-bg`, link `--accent` on the page background, and lane/header text on
  `--surface`.
- If any reading ever uses an image, give it real `alt`.

---

## Responsive / browser notes

- Baseline: the genuine table stays intact and scrolls horizontally inside `.sch-scroll`
  on narrow screens (`min-width` on `.sch` triggers it). Works everywhere, no modern-only
  CSS, keeps table semantics.
- Optional enhancement (more code, only if you want day-major reading on phones): have the
  renderer additionally emit one small per-day `<table>` per week, shown only under a
  width breakpoint, hidden above it — still hairline-ruled, no cards. Flagged, not built;
  decide before adding.

---

## Put these in the site README

The README should list the schedule's two routine edits alongside the others (add a
course, change the nav):

- **Add a week:** copy a `weeks[]` object in `schedule.js`, edit `label`/`topic`/`range`
  and each day's `lanes`. Add `duePre: [{ text: "Pre-lecture HW" }]` to lecture days
  (skip the term's first session). No HTML or CSS changes.
- **Update a reading:** edit the item's `text` (and `href`) in `schedule.js`. Nothing else.
