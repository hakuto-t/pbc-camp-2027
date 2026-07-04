/* PBC合宿2027 参加者ページ用スクリプト
   役割: 1) ヘッダーのスクロール状態  2) スクロールリビール
   これ以外の機能は追加しない（保守はCodex担当。詳細は CONTENT-GUIDE.md） */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* 1) ヘッダー: 40pxスクロールで和紙背景を付与 */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 2) スクロールリビール（一度きり・reduced-motion時はCSS側で無効化済み） */
  var targets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
