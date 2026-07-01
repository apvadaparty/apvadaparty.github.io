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
          duePre:     [{ text: "Pre-course survey" }],
          lecture:    [{ text: "Intro & Syllabus", href: "../slides/lecture-jun29.pdf" }],
          discussion: [{ text: "Review & Assignment Help" }]
        }},
        { weekday: "Tue", date: "Jun 30", lanes: {
          materials:  [
            { text: "3b1b MLPs",             href: YT + "aircAruvnKk" },
            { text: "3b1b Gradient Descent", href: YT + "IHZwWFHWa-w" },
            { text: "StatQuest: Ch 1, 3" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "MLPs" }, { text: "Oral assessment demo" }]
        }},
        { weekday: "Wed", date: "Jul 1", lanes: {
          materials:  [
            { text: "3b1b Backpropagation, intuitively", href: YT + "Ilg3gGewQ5U" },
            { text: "3b1b Backpropagation calculus",     href: YT + "tIeHLnjs5U8" },
            { text: "StatQuest: Ch 2" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Backpropagation" }],
          discussion: [{ text: "Review & Assignment Help" }],
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
            { text: "Finish 224N PyTorch colab tutorial" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Review backprop" }, { text: "Autograd" }, { text: "CNN" }],
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
          lecture:    [{ text: "CNN" }, { text: "Optimization" }]
        }},
        { weekday: "Wed", date: "Jul 8", lanes: {
          materials:  [{ text: "Review" }],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Adam" }, { text: "Autograd" }],
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
            { text: "RNN, optimization" },
            { text: "LSTMs" }
          ],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Midterm Revision" }, { text: "RNN" }, { text: "LSTMs" }],
          discussion: [{ text: "Review & Assignment Help" }],
          assessment: [{ text: "Retake Exam 1 CBTF Day 1 option" }],
          due:        [{ text: "Project Proposal Updates/Revisions Due" }]
        }},
        { weekday: "Tue", date: "Jul 14", lanes: {
          materials:  [
            { text: "3b1b Transformers", href: YT + "wjZofJX0v4M" }
          ],
          duePre:     [{ text: "Mid quarter survey" }, { text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Transformers" }],
          assessment: [{ text: "Retake Exam 1 CBTF Day 2 option" }]
        }},
        { weekday: "Wed", date: "Jul 15", lanes: {
          materials:  [{ text: "3b1b Attention", href: YT + "eMlx5fFNoYc" }],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Attention" }],
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
          materials:  [{ text: "A reading and/or video to prepare for Jay's talk!" }],
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
          lecture:    [{ text: "Differences between previous transformers & LLMs" }]
        }},
        { weekday: "Wed", date: "Jul 22", lanes: {
          materials:  [{ text: "A reading and/or video to prepare for Gary's talk!" }],
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Guest lecture from Gary Cottrell" }],
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
      label: "Week 5", topic: "Exam and Project", range: "Jul 27 \u2013 Jul 31",
      days: [
        { weekday: "Mon", date: "Jul 27", lanes: {
          // materials: "None" dropped — lane renders em-dash
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Presentations" }, { text: "Review" }],
          discussion: [{ text: "Review & Assignment Help" }],
          assessment: [{ text: "Exam 2 CBTF Day 1 option" }]
        }},
        { weekday: "Tue", date: "Jul 28", lanes: {
          // materials: "None" dropped — lane renders em-dash
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Presentations" }, { text: "Review" }],
          assessment: [{ text: "Exam 2 CBTF Day 2 option" }]
        }},
        { weekday: "Wed", date: "Jul 29", lanes: {
          // materials: "None" dropped — lane renders em-dash
          duePre:     [{ text: "Pre-lecture HW due" }],
          lecture:    [{ text: "Presentations" }, { text: "Career & Networking" }],
          discussion: [{ text: "Review & Assignment Help" }],
          assessment: [{ text: "Retake Exam 2 CBTF Day 1 option" }],
          due:        [{ text: "Weds night: Project Writeups Due" }]
        }},
        { weekday: "Thu", date: "Jul 30", lanes: {
          materials:  [{ text: "End quarter survey" }],
          // no duePre — Week 5 Thursday exception (end-of-quarter, no pre-work)
          lecture:    [{ text: "Topics of interest" }, { text: "Career & Networking" }],
          assessment: [{ text: "Retake Exam 2 CBTF Day 2 option" }]
        }},
        { weekday: "Fri", date: "Jul 31", lanes: {
          assessment: [{ text: "Presentations: 11:30am \u2013 2:30pm" }]
        }}
      ]
    }
  ]
};

