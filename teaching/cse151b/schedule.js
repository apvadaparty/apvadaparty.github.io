/* ============================================================
   schedule.js  —  CSE 151B course schedule (data + renderer)

   This file is self-contained inside the course folder so the
   whole offering can be copied to an archive subfolder with
   nothing to rewrite.

   DATA MODEL
   ----------
   SCHEDULE.columns : the five weekday column headers.
   SCHEDULE.weeks[] : one object per week:
       number, theme, and a `days` map keyed
       mon / tue / wed / thu / weekend.
   Each day has: { date, items: [ ... ] }
   Each item is { type, text, href? }
       type is one of:
         "pre-lecture"   -> shown under "Before lecture"
         "lecture-topic" -> shown under "Lecture"
         "discussion"    -> shown under "Discussion"
         "assessment"    -> shown under "Assessment"
         "deadline"      -> shown under "Due"   (admin/surveys live here too)
       href is OPTIONAL. Items WITH an href render as a link;
       items WITHOUT one render as plain text (no dead links).

   TO ADD A WEEK: append an object to SCHEDULE.weeks.
   TO ADD/EDIT AN ITEM: edit that day's items array.
   Verified video links come from the program's pre-lecture
   video list; do not invent video URLs.
   ============================================================ */

const YT = "https://www.youtube.com/watch?v=";

const SCHEDULE = {
  columns: ["Week", "Mon", "Tue", "Wed", "Thu", "Fri"],
  weeks: [
    {
      number: 1,
      theme: "MLPs",
      days: {
        mon: {
          date: "Jun 29, 2026",
          items: [
            { type: "pre-lecture", text: "Pre-course survey" },
            { type: "lecture-topic", text: "Intro & Syllabus" },
            { type: "discussion", text: "Setup" },
            { type: "discussion", text: "Study tips" }
          ]
        },
        tue: {
          date: "Jun 30, 2026",
          items: [
            { type: "pre-lecture", text: "3b1b MLPs", href: YT + "aircAruvnKk" },
            { type: "pre-lecture", text: "3b1b Gradient Descent", href: YT + "IHZwWFHWa-w" },
            { type: "pre-lecture", text: "StatQuest: Ch 1, 3" },
            { type: "lecture-topic", text: "MLPs" },
            { type: "lecture-topic", text: "Oral assessment demo" }
          ]
        },
        wed: {
          date: "Jul 1, 2026",
          items: [
            { type: "pre-lecture", text: "3b1b Backpropagation, intuitively", href: YT + "Ilg3gGewQ5U" },
            { type: "pre-lecture", text: "3b1b Backpropagation calculus", href: YT + "tIeHLnjs5U8" },
            { type: "pre-lecture", text: "Ch 2 of StatQuest" },
            { type: "lecture-topic", text: "Backpropagation" },
            { type: "discussion", text: "Review" },
            { type: "discussion", text: "Practice oral assessment" },
            { type: "deadline", text: "A0 due" }
          ]
        },
        thu: {
          date: "Jul 2, 2026",
          items: [
            { type: "assessment", text: "A0 oral assessments" }
          ]
        },
        weekend: {
          date: "Jul 3, 2026",
          items: [
            { type: "deadline", text: "Pre-lecture homeworks for correctness due" },
            { type: "deadline", text: "A0 LPRR due" }
          ]
        }
      }
    },

    {
      number: 2,
      theme: "CNNs",
      days: {
        mon: {
          date: "Jul 6, 2026",
          items: [
            { type: "pre-lecture", text: "StatQuest CNNs", href: YT + "HGwBXDKFk9I" },
            { type: "pre-lecture", text: "Finish 224N PyTorch colab tutorial" },
            { type: "lecture-topic", text: "Review backprop" },
            { type: "lecture-topic", text: "Autograd" },
            { type: "lecture-topic", text: "CNN" },
            { type: "discussion", text: "Review Thurs & Mon content" },
            { type: "deadline", text: "Project Proposal Due" }
          ]
        },
        tue: {
          date: "Jul 7, 2026",
          items: [
            { type: "pre-lecture", text: "DeepLearningAI Dropout", href: YT + "ARq74QuavAo" },
            { type: "pre-lecture", text: "DeepLearningAI BatchNorm", href: YT + "tNIpEZLv_eg" },
            { type: "pre-lecture", text: "DeepLearningAI Why BatchNorm", href: YT + "nUUqwaxLnWs" },
            { type: "lecture-topic", text: "CNN" },
            { type: "lecture-topic", text: "Optimization" }
          ]
        },
        wed: {
          date: "Jul 8, 2026",
          items: [
            { type: "pre-lecture", text: "Review" },
            { type: "lecture-topic", text: "Adam" },
            { type: "lecture-topic", text: "Autograd" },
            { type: "discussion", text: "Review" },
            { type: "discussion", text: "Practice oral assessment" },
            { type: "deadline", text: "A1 due" }
          ]
        },
        thu: {
          date: "Jul 9, 2026",
          items: [
            { type: "assessment", text: "A1 oral assessments" },
            { type: "assessment", text: "Exam 1 CBTF Day 1 option" }
          ]
        },
        weekend: {
          date: "Jul 10, 2026",
          items: [
            { type: "assessment", text: "Exam 1 CBTF Day 2 option" },
            { type: "deadline", text: "Pre-lecture homeworks for correctness due" },
            { type: "deadline", text: "A1 LPRR due" }
          ]
        }
      }
    },

    {
      number: 3,
      theme: "RNNs, LSTMs, Transformers",
      days: {
        mon: {
          date: "Jul 13, 2026",
          items: [
            { type: "pre-lecture", text: "StatQuest RNNs", href: YT + "AsNTP8Kwu80" },
            { type: "pre-lecture", text: "RNN, optimization" },
            { type: "pre-lecture", text: "LSTMs" },
            { type: "lecture-topic", text: "Review most missed questions in midterm" },
            { type: "lecture-topic", text: "RNN" },
            { type: "lecture-topic", text: "LSTMs" },
            { type: "discussion", text: "Review Exam 1" },
            { type: "assessment", text: "Retake Exam 1 CBTF Day 1 option" },
            { type: "deadline", text: "Project Proposal Updates/Revisions Due" }
          ]
        },
        tue: {
          date: "Jul 14, 2026",
          items: [
            { type: "pre-lecture", text: "Mid quarter survey" },
            { type: "pre-lecture", text: "3b1b Transformers", href: YT + "wjZofJX0v4M" },
            { type: "lecture-topic", text: "Transformers" },
            { type: "lecture-topic", text: "Mid-quarter survey if you haven't already completed" },
            { type: "assessment", text: "Retake Exam 1 CBTF Day 2 option" }
          ]
        },
        wed: {
          date: "Jul 15, 2026",
          items: [
            { type: "pre-lecture", text: "3b1b Attention", href: YT + "eMlx5fFNoYc" },
            { type: "lecture-topic", text: "Attention" },
            { type: "discussion", text: "Review" },
            { type: "discussion", text: "Project check in" },
            { type: "discussion", text: "Practice oral assessment" },
            { type: "deadline", text: "A2 due" }
          ]
        },
        thu: {
          date: "Jul 16, 2026",
          items: [
            { type: "assessment", text: "A2 oral assessments" }
          ]
        },
        weekend: {
          date: "Jul 17, 2026",
          items: [
            { type: "deadline", text: "Pre-lecture homeworks for correctness due" },
            { type: "deadline", text: "A2 LPRR due" }
          ]
        }
      }
    },

    {
      number: 4,
      theme: "Applications:\nCognition, GenAI",
      days: {
        mon: {
          date: "Jul 20, 2026",
          items: [
            { type: "pre-lecture", text: "A reading and/or video to prepare for Jay's talk!" },
            { type: "lecture-topic", text: "Guest lecture from Jay McClelland" },
            { type: "discussion", text: "Review" },
            { type: "deadline", text: "Project Checkpoint Due" }
          ]
        },
        tue: {
          date: "Jul 21, 2026",
          items: [
            { type: "pre-lecture", text: "3b1b LLMs", href: YT + "9-Jl0dxWQs8" },
            { type: "pre-lecture", text: "StatQuest RLHF", href: YT + "qPN_XZcJf_s" },
            { type: "lecture-topic", text: "Differences between previous transformers & LLMs" }
          ]
        },
        wed: {
          date: "Jul 22, 2026",
          items: [
            { type: "pre-lecture", text: "A reading and/or video to prepare for Gary's talk!" },
            { type: "lecture-topic", text: "Guest lecture from Gary Cottrell" },
            { type: "discussion", text: "Review" },
            { type: "discussion", text: "Project check in" },
            { type: "discussion", text: "Practice oral assessment" },
            { type: "deadline", text: "A3 due" }
          ]
        },
        thu: {
          date: "Jul 23, 2026",
          items: [
            { type: "assessment", text: "A3 oral assessments" }
          ]
        },
        weekend: {
          date: "Jul 24, 2026",
          items: [
            { type: "deadline", text: "Pre-lecture homeworks for correctness due" },
            { type: "deadline", text: "A3 LPRR due" }
          ]
        }
      }
    },

    {
      number: 5,
      theme: "Exam and\nProject",
      days: {
        mon: {
          date: "Jul 27, 2026",
          items: [
            { type: "pre-lecture", text: "None" },
            { type: "lecture-topic", text: "Presentations" },
            { type: "lecture-topic", text: "Review" },
            { type: "discussion", text: "Review" },
            { type: "assessment", text: "Exam 2 CBTF Day 1 option" }
          ]
        },
        tue: {
          date: "Jul 28, 2026",
          items: [
            { type: "pre-lecture", text: "None" },
            { type: "lecture-topic", text: "Presentations" },
            { type: "lecture-topic", text: "Review" },
            { type: "assessment", text: "Exam 2 CBTF Day 2 option" }
          ]
        },
        wed: {
          date: "Jul 29, 2026",
          items: [
            { type: "pre-lecture", text: "None" },
            { type: "lecture-topic", text: "Presentations" },
            { type: "lecture-topic", text: "Career & Networking" },
            { type: "discussion", text: "Topics of interest" },
            { type: "discussion", text: "Career & networking" },
            { type: "assessment", text: "Retake Exam 2 CBTF Day 1 option" },
            { type: "deadline", text: "Weds night: Project Writeups Due" }
          ]
        },
        thu: {
          date: "Jul 30, 2026",
          items: [
            { type: "pre-lecture", text: "End quarter survey" },
            { type: "lecture-topic", text: "Topics of interest" },
            { type: "lecture-topic", text: "Career & Networking" },
            { type: "assessment", text: "Retake Exam 2 CBTF Day 2 option" }
          ]
        },
        weekend: {
          date: "Jul 31, 2026",
          items: [
            { type: "assessment", text: "Presentations: 11:30am – 2:30pm" }
          ]
        }
      }
    }
  ]
};

/* ---- rendering ------------------------------------------------------- */

/* order in which typed groups appear within a day cell, with labels */
const ITEM_ORDER = [
  ["pre-lecture",   "Before lecture"],
  ["lecture-topic", "Lecture"],
  ["discussion",    "Discussion"],
  ["assessment",    "Assessment"],
  ["deadline",      "Due"]
];

/* maps day key -> full label used for the column + the mobile cell heading */
const DAY_KEYS = [
  ["mon",     "Monday"],
  ["tue",     "Tuesday"],
  ["wed",     "Wednesday"],
  ["thu",     "Thursday"],
  ["weekend", "Fri"]
];

function buildCell(day) {
  const td = document.createElement("td");
  if (!day || !day.items || day.items.length === 0) return td; // empty cell
  if (day.date) {
    const d = document.createElement("span");
    d.className = "date";
    d.textContent = day.date;
    td.appendChild(d);
  }
  // Builds one .grp block: a label + a <ul> of the given items.
  function makeGroup(type, label, items) {
    const grp = document.createElement("div");
    grp.className = "grp grp-" + type;
    const lab = document.createElement("span");
    lab.className = "label";
    lab.textContent = label;
    grp.appendChild(lab);
    const ul = document.createElement("ul");
    items.forEach(function (it) {
      const li = document.createElement("li");
      if (it.href) {
        const a = document.createElement("a");
        a.href = it.href;
        a.textContent = it.text;
        a.rel = "noopener";
        li.appendChild(a);
      } else {
        li.textContent = it.text;
      }
      ul.appendChild(li);
    });
    grp.appendChild(ul);
    return grp;
  }
  // Assessments and deadlines split into one labeled block PER ITEM
  // (so two assessments => two "Assessment" blocks, two deadlines =>
  // two "Due" blocks). All other types stay grouped: one labeled block
  // for the whole type, with its items as a list.
  const SPLIT_PER_ITEM = ["assessment", "deadline"];
  ITEM_ORDER.forEach(function (pair) {
    const type = pair[0], label = pair[1];
    const matches = day.items.filter(function (it) { return it.type === type; });
    if (matches.length === 0) return;
    if (SPLIT_PER_ITEM.indexOf(type) !== -1) {
      matches.forEach(function (it) {
        td.appendChild(makeGroup(type, label, [it]));
      });
    } else {
      td.appendChild(makeGroup(type, label, matches));
    }
  });
  return td;
}

function renderSchedule() {
  const mount = document.getElementById("schedule-grid");
  if (!mount) return;

  const table = document.createElement("table");
  table.className = "schedule";

  const caption = document.createElement("caption");
  caption.textContent =
    "CSE 151B schedule. Rows are weeks; columns are Mon, Tue, Wed, Thu, and Fri. Subject to change.";
  table.appendChild(caption);

  /* header row */
  const thead = document.createElement("thead");
  const htr = document.createElement("tr");
  SCHEDULE.columns.forEach(function (c, i) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = c;
    if (i === 0) th.style.width = "11%";   // narrower Week column
    htr.appendChild(th);
  });
  thead.appendChild(htr);
  table.appendChild(thead);

  /* body */
  const tbody = document.createElement("tbody");
  SCHEDULE.weeks.forEach(function (wk) {
    const tr = document.createElement("tr");

    const rowHead = document.createElement("th");
    rowHead.scope = "row";
    rowHead.style.width = "11%";            // narrower Week column
    const num = document.createElement("span");
    num.className = "wk-num";
    num.textContent = "Week " + wk.number;
    rowHead.appendChild(num);
    if (wk.theme) {
      const th = document.createElement("span");
      th.className = "wk-theme";
      // theme may contain "\n" to force a line break (keeps the column narrow)
      wk.theme.split("\n").forEach(function (line, i) {
        if (i) th.appendChild(document.createElement("br"));
        th.appendChild(document.createTextNode(line));
      });
      rowHead.appendChild(th);
    }
    tr.appendChild(rowHead);

    DAY_KEYS.forEach(function (pair) {
      const key = pair[0], dayLabel = pair[1];
      const td = buildCell(wk.days[key]);
      td.setAttribute("data-day", dayLabel);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  mount.innerHTML = "";
  mount.appendChild(table);

  // Give the grid a touch more room than the default page measure.
  const main = mount.closest("main");
  if (main) main.style.maxWidth = "68rem";

  equalizeRows();
}

/* Align the section labels (Lecture, Discussion, Assessment, Due) to the same
   vertical height across all five day columns within each week row. table-layout
   is fixed and content varies per day, so for each section we push its first
   block down with a top margin until the label lines up with the same section in
   every other day column. Sections are processed top-to-bottom so each pass
   measures the layout left by the previous one. This also lines up a section in a
   day that is missing the sections above it (e.g. a Due with no Assessment).
   Re-runs on resize/load; no-ops in the stacked mobile view. */
function equalizeRows() {
  const table = document.querySelector(".schedule");
  if (!table) return;

  // Section blocks in the vertical order they appear within a day cell.
  // "Before lecture" is first, so it needs no alignment and is omitted.
  const SECTIONS = [
    "grp-lecture-topic",
    "grp-discussion",
    "grp-assessment",
    "grp-deadline"
  ];

  // reset margins from a previous pass
  table.querySelectorAll("tbody td > .grp").forEach(function (el) {
    el.style.marginTop = "";
  });

  // stacked single-column layout: nothing to align
  if (window.matchMedia("(max-width: 700px)").matches) return;

  table.querySelectorAll("tbody tr").forEach(function (tr) {
    const cells = tr.querySelectorAll("td[data-day]");
    SECTIONS.forEach(function (cls) {
      let max = 0;
      const firsts = [];
      cells.forEach(function (td) {
        const b = td.querySelector(":scope > ." + cls);
        if (!b) return;
        const top = b.getBoundingClientRect().top - td.getBoundingClientRect().top;
        const base = parseFloat(getComputedStyle(b).marginTop) || 0;
        firsts.push({ el: b, top: top, base: base });
        if (top > max) max = top;
      });
      firsts.forEach(function (item) {
        item.el.style.marginTop = (item.base + (max - item.top)) + "px";
      });
    });
  });
}

let _eqRAF;
function scheduleEqualize() {
  cancelAnimationFrame(_eqRAF);
  _eqRAF = requestAnimationFrame(equalizeRows);
}

document.addEventListener("DOMContentLoaded", renderSchedule);
window.addEventListener("load", scheduleEqualize);
window.addEventListener("resize", scheduleEqualize);
