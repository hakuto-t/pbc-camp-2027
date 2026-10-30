/* ============================================================
   PBC合宿2027 運営ハブ 共通スクリプト
   ------------------------------------------------------------
   OPS_CONFIG（ops-config.js）から以下を自動生成する:
     1. グローバルナビ（.ops-nav）
     2. チーム一覧カード（#teamsGrid がある場合）
     3. カウントダウン（#countdown がある場合）
     4. 更新履歴（#updatesList がある場合・直近5件）
     5. 未確定TODO一覧（#todoList がある場合）
     6. 決まったこと（#decisionList）／7. 次の日程（#upcomingList）
     8. 今やること（#actionBoard。data-team でチーム別に絞る）
   相対パスの深さは <body data-depth="0|1"> で指定する
   （ops-XXXX/ 直下 = 0、teams/ や tools/ 配下 = 1）。
   このファイルは原則編集しない。内容の変更は ops-config.js で行う。
   ============================================================ */
(function () {
  "use strict";
  if (typeof OPS_CONFIG === "undefined") { return; }

  var depth = parseInt(document.body.getAttribute("data-depth") || "0", 10);
  var prefix = depth === 1 ? "../" : "";

  var STATUS_LABEL = { todo: "準備中", doing: "進行中", done: "完了" };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text) { e.textContent = text; }
    return e;
  }

  /* 1) グローバルナビ（現在地判定: teams/配下→チーム、tools/配下→なし、それ以外はファイル名一致） */
  var navBox = document.querySelector(".ops-nav");
  if (navBox) {
    var file = location.pathname.split("/").pop() || "index.html";
    var inTeams = location.pathname.indexOf("/teams/") !== -1;
    var inTools = location.pathname.indexOf("/tools/") !== -1;
    OPS_CONFIG.nav.forEach(function (item) {
      var a = el("a", null, item.label);
      a.href = prefix + item.href;
      var isCurrent = inTeams ? item.href.indexOf("teams/") === 0
                    : inTools ? false
                    : item.href === file;
      if (isCurrent) { a.classList.add("is-current"); }
      navBox.appendChild(a);
    });
  }

  /* 2) チーム一覧カード */
  var grid = document.getElementById("teamsGrid");
  if (grid) {
    OPS_CONFIG.teams.forEach(function (t) {
      var a = el("a", "card card--team");
      a.href = prefix + "teams/" + t.slug + ".html";

      var head = el("div", "card__head");
      head.appendChild(el("h3", "card__title", t.name));
      var badge = el("span", "badge badge--" + (t.status || "todo"));
      badge.appendChild(el("span", "badge__dot"));
      badge.appendChild(document.createTextNode(STATUS_LABEL[t.status] || "準備中"));
      head.appendChild(badge);
      a.appendChild(head);

      var meta = el("dl", "card__meta");
      [["リーダー", t.leader], ["メンバー", t.members]].forEach(function (pair) {
        var row = el("div");
        row.appendChild(el("dt", null, pair[0]));
        row.appendChild(el("dd", null, pair[1]));
        meta.appendChild(row);
      });
      a.appendChild(meta);

      a.appendChild(el("p", "card__desc", t.mission));
      grid.appendChild(a);
    });
  }

  /* 3) カウントダウン */
  var cd = document.getElementById("countdown");
  if (cd) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var ev = new Date(OPS_CONFIG.eventDate + "T00:00:00");
    var days = Math.round((ev - today) / 86400000);
    cd.textContent = days >= 0 ? String(days) : "済";
  }

  /* 4) 更新履歴（直近5件） */
  var ul = document.getElementById("updatesList");
  if (ul) {
    OPS_CONFIG.updates.slice(0, 5).forEach(function (u) {
      var li = el("li");
      var t = el("time", null, u.date);
      t.setAttribute("datetime", u.date);
      li.appendChild(t);
      li.appendChild(el("span", null, u.text));
      ul.appendChild(li);
    });
  }

  /* 5) 未確定TODO一覧 */
  var todo = document.getElementById("todoList");
  if (todo) {
    if (OPS_CONFIG.todos.length === 0) {
      var empty = el("li");
      empty.appendChild(el("span", null, "未確定事項はありません。"));
      todo.appendChild(empty);
    }
    OPS_CONFIG.todos.forEach(function (t) {
      var li = el("li");
      li.appendChild(el("span", "todo-page", "［" + t.page + "］"));
      li.appendChild(el("span", null, t.text));
      todo.appendChild(li);
    });
  }

  /* TODO件数（#todoCount がある場合） */
  var tc = document.getElementById("todoCount");
  if (tc) { tc.textContent = String(OPS_CONFIG.todos.length); }

  /* チーム数（#teamCount がある場合） */
  var tmc = document.getElementById("teamCount");
  if (tmc) { tmc.textContent = String(OPS_CONFIG.teams.length); }
  /* ------------------------------------------------------------
     2026-10-30 追加: 決まったこと／次の日程／今やること
     （ops-config.js の decisions / upcoming / actions から生成）
     ------------------------------------------------------------ */
  var ACTION_LABEL = { todo: "未着手", doing: "進行中", done: "済み" };
  var LEVEL_LABEL = { done: "決定", doing: "方向・検討中" };

  function badge(kind, text) {
    var b = el("span", "badge badge--" + kind);
    b.appendChild(el("span", "badge__dot"));
    b.appendChild(document.createTextNode(text));
    return b;
  }
  function teamName(slug) {
    if (slug === "all") { return "全チームのリーダー"; }
    for (var i = 0; i < OPS_CONFIG.teams.length; i++) {
      if (OPS_CONFIG.teams[i].slug === slug) { return OPS_CONFIG.teams[i].name; }
    }
    return slug;
  }

  /* 6) 決まったこと（#decisionList。data-limit で件数を絞れる） */
  var dl = document.getElementById("decisionList");
  if (dl && OPS_CONFIG.decisions) {
    var dlimit = parseInt(dl.getAttribute("data-limit") || "0", 10);
    var dItems = dlimit > 0 ? OPS_CONFIG.decisions.slice(0, dlimit) : OPS_CONFIG.decisions;
    dItems.forEach(function (d) {
      var li = el("li", "decision decision--" + d.level);
      var head = el("div", "decision__head");
      head.appendChild(badge(d.level === "done" ? "done" : "doing", LEVEL_LABEL[d.level] || "決定"));
      head.appendChild(el("h3", "decision__title", d.title));
      li.appendChild(head);
      li.appendChild(el("p", "decision__text", d.text));
      var t = el("time", "decision__date", d.date + " 決定");
      if (d.level !== "done") { t.textContent = d.date + " 時点"; }
      t.setAttribute("datetime", d.date);
      li.appendChild(t);
      dl.appendChild(li);
    });
  }

  /* 7) 次の日程（#upcomingList） */
  var ul2 = document.getElementById("upcomingList");
  if (ul2 && OPS_CONFIG.upcoming) {
    OPS_CONFIG.upcoming.forEach(function (u) {
      var li = el("li", "date-item date-item--" + u.state);
      li.appendChild(el("p", "date-item__when", u.when));
      var body = el("div", "date-item__body");
      var h = el("p", "date-item__title", u.title);
      if (u.state === "done") { h.appendChild(badge("done", "済み")); }
      if (u.state === "next") { h.appendChild(badge("warn", "直近")); }
      body.appendChild(h);
      if (u.note) { body.appendChild(el("p", "date-item__note", u.note)); }
      li.appendChild(body);
      ul2.appendChild(li);
    });
  }

  /* 8) 今やること（#actionBoard）
     data-team なし: チームごとに分けて全件（ハブトップ）
     data-team="slug": そのチームの分と全チーム共通の分だけ（チームページ） */
  function actionItem(a, showTeam) {
    var li = el("li", "action action--" + a.status);
    var top = el("div", "action__top");
    top.appendChild(badge(a.status === "done" ? "done" : a.status === "doing" ? "doing" : "todo", ACTION_LABEL[a.status] || "未着手"));
    if (a.due) { top.appendChild(el("span", "action__due", "期限: " + a.due)); }
    li.appendChild(top);
    li.appendChild(el("p", "action__what", a.what));
    var who = "担当: " + a.who;
    if (showTeam) { who += "（" + teamName(a.team) + "）"; }
    li.appendChild(el("p", "action__who", who));
    return li;
  }
  var ab = document.getElementById("actionBoard");
  if (ab && OPS_CONFIG.actions) {
    var only = ab.getAttribute("data-team");
    if (only) {
      var list = el("ul", "action-list");
      OPS_CONFIG.actions.forEach(function (a) {
        if (a.team === only || a.team === "all") { list.appendChild(actionItem(a, a.team === "all")); }
      });
      ab.appendChild(list);
    } else {
      var order = ["all"].concat(OPS_CONFIG.teams.map(function (t) { return t.slug; }));
      order.forEach(function (slug) {
        var items = OPS_CONFIG.actions.filter(function (a) { return a.team === slug; });
        if (items.length === 0) { return; }
        var box = el("section", "action-group");
        var head = el("div", "action-group__head");
        if (slug === "all") {
          head.appendChild(el("h3", "action-group__title", teamName(slug)));
        } else {
          var h3 = el("h3", "action-group__title");
          var link = el("a", null, teamName(slug));
          link.href = prefix + "teams/" + slug + ".html";
          h3.appendChild(link);
          head.appendChild(h3);
        }
        var open = items.filter(function (a) { return a.status !== "done"; }).length;
        head.appendChild(el("span", "action-group__count", "残り " + open + " 件"));
        box.appendChild(head);
        var list2 = el("ul", "action-list");
        items.forEach(function (a) { list2.appendChild(actionItem(a, false)); });
        box.appendChild(list2);
        ab.appendChild(box);
      });
    }
  }

  /* 未完了の「今やること」件数（#actionCount がある場合） */
  var ac = document.getElementById("actionCount");
  if (ac && OPS_CONFIG.actions) {
    ac.textContent = String(OPS_CONFIG.actions.filter(function (a) { return a.status !== "done"; }).length);
  }
})();
