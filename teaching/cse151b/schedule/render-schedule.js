// render-schedule.js — builds the schedule from SCHEDULE. Vanilla, no framework.
(function () {
  var ICONS = {
    materials:  '<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
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

  function itemNode(item, laneKey) {
    var node = item.href ? elem("a", "sch-i") : elem("span", "sch-i");
    if (item.href) node.href = item.href;
    node.appendChild(iconSpan(laneKey));
    node.appendChild(document.createTextNode(item.text)); // user content as text, never HTML
    return node;
  }

  function cellNode(items, laneKey) {
    if (!items || !items.length) {
      var td = elem("td", "sch-em");
      var dash = elem("span");
      dash.setAttribute("aria-hidden", "true");
      dash.textContent = "\u2014";
      td.appendChild(dash);
      return td;
    }
    var cell = elem("td");
    items.forEach(function (it) { cell.appendChild(itemNode(it, laneKey)); });
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
        tr.appendChild(cellNode((d.lanes || {})[laneKey], laneKey));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  function render(root, data) {
    data.weeks.forEach(function (week) {
      var h = elem("p", "sch-wk");
      h.textContent = week.label + " \u00b7 " + week.topic + " ";
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
