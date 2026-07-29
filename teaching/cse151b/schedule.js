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
      label: "Week 1", topic: "MLPs", range: "Jun 29 \u2013 Jul 3",
      days: [
        { weekday: "Mon", date: "Jun 29", lanes: {
          duePre:     [{ text: "Pre-course survey", href: "https://docs.google.com/forms/d/e/1FAIpQLSe0fB7FNvCx_csA1Mfte1YOLdZ70Ovp38lHhc8BTh_6qe_0Kg/viewform?usp=sharing&ouid=101126374470583356575" }],
          lecture:    [{ text: "Intro & Syllabus", href: "../slides/lecture-jun29.pdf" }],
          discussion: [{ text: "Review & Assignment Help", href: "../slides/CSE 151B 6_29 Discussion.pdf" }]
        }},
        { weekday: "Tue", date: "Jun 30", lanes: {
          materials:  [
            { text: "3b1b MLPs",             href: YT + "aircAruvnKk" },
            { text: "3b1b Gradient Descent", href: YT + "IHZwWFHWa-w" },
            { text: "StatQuest Book: Ch 1, 3" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Neural Networks and Computation Graphs", href: "../slides/lecture-jun30.pdf" }],
          due:        [{ text: "Oral Assessment Sign Ups", href: "https://piazza.com/class/mq7cvtfat4t3ff/post/15" }]
        }},
        { weekday: "Wed", date: "Jul 1", lanes: {
          materials:  [
            { text: "3b1b Backpropagation, intuitively", href: YT + "Ilg3gGewQ5U" },
            { text: "3b1b Backpropagation calculus",     href: YT + "tIeHLnjs5U8" },
            { text: "StatQuest Book: Ch 2" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Backpropagation", href: "../slides/lecture-jul1.pdf" }],
          discussion: [{ text: "Review & Assignment Help", href: "../slides/CSE 151B 7_1 Discussion.pdf" }],
          due:        [{ text: "A0 due" }]
        }},
        { weekday: "Thu", date: "Jul 2", lanes: {
          assessment: [{ text: "A0 oral assessments" }]
        }},
        { weekday: "Fri", date: "Jul 3", lanes: {
          due: [{ text: "Pre-lecture HW (correctness)" }, { text: "A0 LPRR due" }]
        }}
      ]
    },

    {
      label: "Week 2", topic: "CNNs", range: "Jul 6 \u2013 Jul 10",
      days: [
        { weekday: "Mon", date: "Jul 6", lanes: {
          materials:  [
            { text: "StatQuest CNNs",                   href: YT + "HGwBXDKFk9I" },
            { text: "(and/or StatQuest Book Ch: 6)" },
            { text: "Finish 224N PyTorch colab tutorial", href: "https://colab.research.google.com/drive/1AiBuEL_V9u16jGMctpYN3Byx76_iFck_?usp=sharing#scrollTo=H6oqGiIXvrMl" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "CNN", href: "../slides/lecture-jul6.pdf" }],
          discussion: [{ text: "Review & Assignment Help" }],
          due:        [{ text: "Project Proposal Due" }]
        }},
        { weekday: "Tue", date: "Jul 7", lanes: {
          materials:  [
            { text: "DeepLearningAI Dropout",       href: YT + "ARq74QuavAo" },
            { text: "DeepLearningAI BatchNorm",     href: YT + "tNIpEZLv_eg" },
            { text: "DeepLearningAI Why BatchNorm", href: YT + "nUUqwaxLnWs" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Improving Generalization", href: "../slides/Lecture 5 Jul 7.pdf" }, { text: "More about Improving Generalization", href: "../slides/Gary_Cottrell_improving_generalization-2024.pdf" }],
          due:        [{ text: "Oral Assessment Sign Ups", href: "https://piazza.com/class/mq7cvtfat4t3ff/post/15" }]
        }},
        { weekday: "Wed", date: "Jul 8", lanes: {
          materials:  [
            { text: "StatQuest Book: Ch 5" },
            { text: "StatQuest MLE", href: "https://www.youtube.com/watch?v=XepXtl9YKwc" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Tricks of the Trade", href: "../slides/Lecture 6 Jul 8.pdf" }, { text: "More about Tricks of the Trade", href: "../slides/Gary_Cottrell_Tricks_of_the_trade.pdf" }],
          discussion: [{ text: "Review & Assignment Help" }],
          due:        [{ text: "A1 due" }]
        }},
        { weekday: "Thu", date: "Jul 9", lanes: {
          assessment: [{ text: "A1 oral assessments" }, { text: "Exam 1 CBTF Day 1 option" }]
        }},
        { weekday: "Fri", date: "Jul 10", lanes: {
          assessment: [{ text: "Exam 1 CBTF Day 2 option" }],
          due:        [{ text: "Pre-lecture HW (correctness)" }, { text: "A1 LPRR due" }]
        }}
      ]
    },

    {
      label: "Week 3", topic: "RNNs, LSTMs, Transformers", range: "Jul 13 \u2013 Jul 17",
      days: [
        { weekday: "Mon", date: "Jul 13", lanes: {
          materials:  [
            { text: "StatQuest RNNs", href: YT + "AsNTP8Kwu80" },
            { text: "(and/or StatQuest Book Ch: 7)" },
            { text: "StatQuest LSTMs", href: "https://www.youtube.com/watch?v=YCzL96nL7j0" },
            { text: "(and/or StatQuest Book Ch: 8)" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "RNNs and LSTMs", href: "../slides/Lecture 8 Jul 13 RNNs LSTMs.pdf" }],
          discussion: [{ text: "Review & Assignment Help" }],
          assessment: [{ text: "Retake Exam 1 CBTF Day 1 option" }],
          due:        [{ text: "Project Proposal Updates/Revisions Due" }]
        }},
        { weekday: "Tue", date: "Jul 14", lanes: {
          materials:  [
            { text: "StatQuest Book Ch: 9" },
            { text: "3b1b Transformers", href: YT + "wjZofJX0v4M" }
          ],
          duePre:     [{ text: "Mid quarter survey" }, { text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Language and Transformers", href: "../slides/Lecture 9 Jul 14 Transformers.pdf" }],
          assessment: [{ text: "Retake Exam 1 CBTF Day 2 option" }],
          due:        [{ text: "Oral Assessment Sign Ups", href: "https://piazza.com/class/mq7cvtfat4t3ff/post/15" }]
        }},
        { weekday: "Wed", date: "Jul 15", lanes: {
          materials:  [{ text: "3b1b Attention", href: YT + "eMlx5fFNoYc" }],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Attention", href: "../slides/Lecture 10 Jul 15 Attention.pdf" }],
          discussion: [{ text: "Review & Assignment Help" }],
          due:        [{ text: "A2 due" }]
        }},
        { weekday: "Thu", date: "Jul 16", lanes: {
          assessment: [{ text: "A2 oral assessments" }]
        }},
        { weekday: "Fri", date: "Jul 17", lanes: {
          due: [{ text: "Pre-lecture HW (correctness)" }, { text: "A2 LPRR due" }]
        }}
      ]
    },

    {
      label: "Week 4", topic: "Applications: Cognition, GenAI", range: "Jul 20 \u2013 Jul 24",
      days: [
        { weekday: "Mon", date: "Jul 20", lanes: {
          materials:  [{ text: "Reading and post to prepare for Jay's talk", href: "https://piazza.com/class/mq7cvtfat4t3ff/post/124" }],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Guest lecture from Jay McClelland" }],
          discussion: [{ text: "Review & Assignment Help" }],
          due:        [{ text: "Project Checkpoint Due" }]
        }},
        { weekday: "Tue", date: "Jul 21", lanes: {
          materials:  [
            { text: "3b1b LLMs",    href: YT + "9-Jl0dxWQs8" },
            { text: "StatQuest RLHF", href: YT + "qPN_XZcJf_s" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "RLHF", href: "../slides/CSE 151B Jul 21 Lecture.pdf" }],
          due:        [{ text: "Oral Assessment Sign Ups", href: "https://piazza.com/class/mq7cvtfat4t3ff/post/15" }]
        }},
        { weekday: "Wed", date: "Jul 22", lanes: {
          lecture:    [{ text: "Career Panel Planning and Guest Lecture from Gary Cottrell", href: "../slides/CSE 151B Jul 22 Lecture.pdf" }],
          discussion: [{ text: "Review & Assignment Help" }],
          due:        [{ text: "A3 due" }]
        }},
        { weekday: "Thu", date: "Jul 23", lanes: {
          assessment: [{ text: "A3 oral assessments" }]
        }},
        { weekday: "Fri", date: "Jul 24", lanes: {
          due: [{ text: "Pre-lecture HW (correctness)" }, { text: "A3 LPRR due" }]
        }}
      ]
    },

    {
      label: "Week 5", topic: "Project Presentations", range: "Jul 27 \u2013 Jul 31",
      days: [
        { weekday: "Mon", date: "Jul 27", lanes: {
          lecture:    [{ text: "Industry & Academia Career Panel" }],
          discussion: [{ text: "Review & Assignment Help" }],
          assessment: [{ text: "Exam 2 CBTF Day 1 option" }]
        }},
        { weekday: "Tue", date: "Jul 28", lanes: {
          duePre:     [{ text: "Work on SETs" }],
          lecture:    [{ text: "Project Presentations" }],
          assessment: [{ text: "Exam 2 CBTF Day 2 option" }]
        }},
        { weekday: "Wed", date: "Jul 29", lanes: {
          duePre:     [{ text: "Work on SETs" }],
          lecture:    [{ text: "Project Presentations" }],
          discussion: [{ text: "Review & Assignment Help" }],
          assessment: [{ text: "Retake Exam 2 CBTF Day 1 option" }],
          due:        [{ text: "Project Writeups Due" }, { text: "Project Artifacts Due" }]
        }},
        { weekday: "Thu", date: "Jul 30", lanes: {
          duePre:     [{ text: "Work on SETs" }],
          lecture:    [{ text: "Project Presentations" }],
          assessment: [{ text: "Retake Exam 2 CBTF Day 2 option" }]
        }},
        { weekday: "Fri", date: "Jul 31", lanes: {
        }}
      ]
    }
  ]
};

