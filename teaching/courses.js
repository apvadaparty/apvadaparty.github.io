/* ============================================================
   courses.js
   Single source of truth for the courses that have their own
   full course pages (i.e. courses I instruct). The Teaching
   page renders this list into <ul id="course-list">.

   To ADD a course: add an object below AND create its folder
   under /teaching/. Nothing else needs to change — the nav is
   hardcoded and does not depend on this file.

   Each entry:
     code        e.g. "CSE 151B"
     title       e.g. "Deep Learning"
     term        e.g. "Summer 2026"
     href        link to the course home (root-relative)
     evals       optional link to the student evaluations PDF
   ============================================================ */

const COURSES = [
  {
    code: "CSE 151B",
    title: "Deep Learning",
    term: "Summer 2026",
    href: "/teaching/cse151b/",
    evals: "/teaching/CSE_151_Student_Evals.pdf"
  }
];

/* ---- render ---------------------------------------------------------- */
function renderCourses() {
  const mount = document.getElementById("course-list");
  if (!mount) return;

  const ul = document.createElement("ul");
  ul.className = "plain-list";

  COURSES.forEach(function (c) {
    const li = document.createElement("li");

    const strong = document.createElement("strong");
    const a = document.createElement("a");
    a.href = c.href;
    a.textContent = c.code + " — " + c.title + " (" + c.term + ")";
    strong.appendChild(a);

    const meta = document.createElement("span");
    meta.className = "course-meta";

    if (c.evals) {
      meta.appendChild(document.createTextNode(" · "));
      const ev = document.createElement("a");
      ev.href = c.evals;
      ev.textContent = "Student Evaluations";
      meta.appendChild(ev);
    }

    li.appendChild(strong);
    li.appendChild(meta);
    ul.appendChild(li);
  });

  mount.innerHTML = "";
  mount.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", renderCourses);
