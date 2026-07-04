/* ============================================================
   PBC合宿2027 運営ハブ 共通スクリプト
   ------------------------------------------------------------
   OPS_CONFIG（ops-config.js）から以下を自動生成する:
     1. グローバルナビ（.ops-nav）
     2. チーム一覧カード（#teamsGrid がある場合）
     3. カウントダウン（#countdown がある場合）
     4. 更新履歴（#updatesList がある場合・直近5件）
     5. 未確定TODO一覧（#todoList がある場合）
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
      [["リーダー", t.leader], ["人数", t.members]].forEach(function (pair) {
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
})();
