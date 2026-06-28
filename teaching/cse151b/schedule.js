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
      theme: "Intro, MLP, backprop",
      days: {
        mon: {
          date: "Jun 29, 2026",
          items: [
            { type: "pre-lecture", text: "Pre-course survey (10 min)" },
            { type: "pre-lecture", text: "Reach out to the instructor if any accommodations are needed" },
            { type: "lecture-topic", text: "Intro & syllabus" },
            { type: "lecture-topic", text: "ML pipeline: training, testing, loss functions" },
            { type: "discussion", text: "Questions / concerns about the course" },
            { type: "discussion", text: "Tips on how to study" }
          ]
        },
        tue: {
          date: "Jun 30, 2026",
          items: [
            { type: "pre-lecture", text: "But what is a neural network? | Deep Learning Chapter 1", href: YT + "aircAruvnKk" },
            { type: "pre-lecture", text: "Gradient descent, how neural networks learn | DL Chapter 2", href: YT + "IHZwWFHWa-w" },
            { type: "pre-lecture", text: "Ch. 1, 3 of StatQuest" },
            { type: "lecture-topic", text: "XOR problem & Desmos" },
            { type: "lecture-topic", text: "Multilayer perceptron (MLP): structure, activation" },
            { type: "lecture-topic", text: "Computation graph structure" },
            { type: "lecture-topic", text: "Practice / demo of oral assessment" }
          ]
        },
        wed: {
          date: "Jul 1, 2026",
          items: [
            { type: "pre-lecture", text: "Backpropagation, intuitively | DL Chapter 3", href: YT + "Ilg3gGewQ5U" },
            { type: "pre-lecture", text: "Backpropagation calculus | DL Chapter 4", href: YT + "tIeHLnjs5U8" },
            { type: "pre-lecture", text: "Ch. 2 of StatQuest" },
            { type: "lecture-topic", text: "Backpropagation" },
            { type: "discussion", text: "Review Mon\u2013Wed content" },
            { type: "discussion", text: "Practice oral assessment" },
            { type: "deadline", text: "A0 due (calculus, probability, linear algebra, ML prereqs, PyTorch intro)" }
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
            { type: "deadline", text: "Pre-lecture homeworks submitted for correctness" },
            { type: "deadline", text: "A0 Learning Process & Resource Reflection due" }
          ]
        }
      }
    },

    {
      number: 2,
      theme: "CNN, autograd + regularization",
      days: {
        mon: {
          date: "Jul 6, 2026",
          items: [
            { type: "pre-lecture", text: "Neural Networks Part 8: Image Classification with Convolutional Neural Networks (CNNs) \u2014 StatQuest", href: YT + "HGwBXDKFk9I" },
            { type: "pre-lecture", text: "Finish 224N PyTorch colab tutorial" },
            { type: "lecture-topic", text: "Review backprop" },
            { type: "lecture-topic", text: "Autograd" },
            { type: "lecture-topic", text: "CNN" },
            { type: "discussion", text: "Review Thurs & Mon content" },
            { type: "deadline", text: "Project proposal due" }
          ]
        },
        tue: {
          date: "Jul 7, 2026",
          items: [
            { type: "pre-lecture", text: "Understanding Dropout (C2W1L07) \u2014 deeplearning.ai", href: YT + "ARq74QuavAo" },
            { type: "pre-lecture", text: "Normalizing Activations in a Network (C2W3L04) \u2014 deeplearning.ai", href: YT + "tNIpEZLv_eg" },
            { type: "pre-lecture", text: "Why Does Batch Norm Work? (C2W3L06) \u2014 deeplearning.ai", href: YT + "nUUqwaxLnWs" },
            { type: "lecture-topic", text: "CNN" },
            { type: "lecture-topic", text: "Optimization" },
            { type: "lecture-topic", text: "CNN activity (to be finalized)" }
          ]
        },
        wed: {
          date: "Jul 8, 2026",
          items: [
            { type: "pre-lecture", text: "Remaining topics for Exam 1 (to be finalized)" },
            { type: "lecture-topic", text: "Adam" },
            { type: "lecture-topic", text: "Autograd" },
            { type: "discussion", text: "Review Mon\u2013Wed content" },
            { type: "discussion", text: "Practice oral assessment" },
            { type: "deadline", text: "A1 due" }
          ]
        },
        thu: {
          date: "Jul 9, 2026",
          items: [
            { type: "assessment", text: "A1 oral assessments" },
            { type: "assessment", text: "Exam 1 \u2014 CBTF Day 1 option" }
          ]
        },
        weekend: {
          date: "Jul 10, 2026",
          items: [
            { type: "assessment", text: "Exam 1 \u2014 CBTF Day 2 option" },
            { type: "deadline", text: "Pre-lecture homeworks submitted for correctness" },
            { type: "deadline", text: "A1 Learning Process & Resource Reflection due" }
          ]
        }
      }
    },

    {
      number: 3,
      theme: "RNN, transformers, attention; revisiting regularization & tuning; importance of data",
      days: {
        mon: {
          date: "Jul 13, 2026",
          items: [
            { type: "pre-lecture", text: "Recurrent Neural Networks (RNNs), Clearly Explained!!! \u2014 StatQuest", href: YT + "AsNTP8Kwu80" },
            { type: "pre-lecture", text: "Pre-lecture homework: RNN, optimization" },
            { type: "pre-lecture", text: "LSTMs" },
            { type: "lecture-topic", text: "Review most-missed midterm questions" },
            { type: "lecture-topic", text: "RNN" },
            { type: "lecture-topic", text: "LSTMs" },
            { type: "discussion", text: "Review most-missed midterm questions" },
            { type: "assessment", text: "Retake Exam 1 \u2014 CBTF Day 1 option" },
            { type: "deadline", text: "Project proposal updates / revisions due" }
          ]
        },
        tue: {
          date: "Jul 14, 2026",
          items: [
            { type: "pre-lecture", text: "Mid-quarter survey" },
            { type: "pre-lecture", text: "But what is a GPT? Visual intro to transformers | Chapter 5, Deep Learning", href: YT + "wjZofJX0v4M" },
            { type: "pre-lecture", text: "Pre-lecture homework" },
            { type: "lecture-topic", text: "Transformers" },
            { type: "lecture-topic", text: "Mid-quarter survey (if not already completed)" },
            { type: "assessment", text: "Retake Exam 1 \u2014 CBTF Day 2 option" }
          ]
        },
        wed: {
          date: "Jul 15, 2026",
          items: [
            { type: "pre-lecture", text: "Attention in transformers, step-by-step | Deep Learning Chapter 6", href: YT + "eMlx5fFNoYc" },
            { type: "pre-lecture", text: "Pre-lecture homework" },
            { type: "lecture-topic", text: "Attention" },
            { type: "discussion", text: "Review Mon\u2013Wed content" },
            { type: "discussion", text: "Project check-in" },
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
            { type: "deadline", text: "Retakes for PA oral assessments \u2014 option" },
            { type: "deadline", text: "Pre-lecture homeworks submitted for correctness" },
            { type: "deadline", text: "A2 Learning Process & Resource Reflection due" }
          ]
        }
      }
    },

    {
      number: 4,
      theme: "Training at scale, LLMs",
      days: {
        mon: {
          date: "Jul 20, 2026",
          items: [
            { type: "pre-lecture", text: "A reading and/or video to prepare for Jay's talk (to be finalized)" },
            { type: "lecture-topic", text: "Guest lecture \u2014 Jay McClelland" },
            { type: "discussion", text: "Review" },
            { type: "deadline", text: "Project checkpoint due" }
          ]
        },
        tue: {
          date: "Jul 21, 2026",
          items: [
            { type: "pre-lecture", text: "How might LLMs store facts | Deep Learning Chapter 7", href: YT + "9-Jl0dxWQs8" },
            { type: "pre-lecture", text: "Reinforcement Learning with Human Feedback (RLHF), Clearly Explained!!! \u2014 StatQuest", href: YT + "qPN_XZcJf_s" },
            { type: "lecture-topic", text: "Coming soon" }
          ]
        },
        wed: {
          date: "Jul 22, 2026",
          items: [
            { type: "pre-lecture", text: "A reading and/or video to prepare for Gary's talk (to be finalized)" },
            { type: "lecture-topic", text: "Guest lecture \u2014 Gary Cottrell" },
            { type: "discussion", text: "Review Mon\u2013Wed content" },
            { type: "discussion", text: "Project check-in" },
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
            { type: "deadline", text: "Retakes for PA oral assessments \u2014 option" },
            { type: "deadline", text: "Pre-lecture homeworks submitted for correctness" },
            { type: "deadline", text: "A3 Learning Process & Resource Reflection due" }
          ]
        }
      }
    },

    {
      number: 5,
      theme: "Review, final exam, presentations",
      days: {
        mon: {
          date: "Jul 27, 2026",
          items: [
            { type: "pre-lecture", text: "Redo the problems you found most challenging; identify what you want to work on in class" },
            { type: "lecture-topic", text: "Coming soon" },
            { type: "discussion", text: "Review" },
            { type: "assessment", text: "Exam 2 \u2014 CBTF Day 1 option" }
          ]
        },
        tue: {
          date: "Jul 28, 2026",
          items: [
            { type: "pre-lecture", text: "None / work on project" },
            { type: "lecture-topic", text: "Coming soon" },
            { type: "assessment", text: "Exam 2 \u2014 CBTF Day 2 option" }
          ]
        },
        wed: {
          date: "Jul 29, 2026",
          items: [
            { type: "pre-lecture", text: "None / work on project" },
            { type: "lecture-topic", text: "Coming soon" },
            { type: "discussion", text: "Topics of interest / grad student & faculty panel" },
            { type: "discussion", text: "Career & networking" },
            { type: "assessment", text: "Retake Exam 2 \u2014 CBTF Day 1 option" },
            { type: "deadline", text: "Project writeups due (Wed night)" }
          ]
        },
        thu: {
          date: "Jul 30, 2026",
          items: [
            { type: "pre-lecture", text: "End-quarter survey" },
            { type: "lecture-topic", text: "Coming soon" },
            { type: "assessment", text: "Retake Exam 2 \u2014 CBTF Day 2 option" }
          ]
        },
        weekend: {
          date: "Jul 31, 2026",
          items: [
            { type: "assessment", text: "Presentations: 11:30am \u2013 2:30pm" }
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
  SCHEDULE.columns.forEach(function (c) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = c;
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
    const num = document.createElement("span");
    num.className = "wk-num";
    num.textContent = "Week " + wk.number;
    rowHead.appendChild(num);
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
}

document.addEventListener("DOMContentLoaded", renderSchedule);
