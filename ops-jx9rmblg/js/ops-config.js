/* ============================================================
   PBC合宿2027 運営ハブ 設定ファイル（唯一の編集集中点）
   ------------------------------------------------------------
   ここを編集すると全ページのナビ・チーム一覧・ハブトップの
   カウントダウン／更新履歴／未確定TODOに自動反映される。
   編集ルールは CONTENT-GUIDE.md を参照。
   ============================================================ */
var OPS_CONFIG = {

  /* 開催日（カウントダウン用。YYYY-MM-DD） */
  eventDate: "2027-04-27",

  /* グローバルナビ（表示順のまま描画される） */
  nav: [
    { href: "index.html",         label: "ハブトップ" },
    { href: "overview.html",      label: "合宿概要" },
    { href: "venue.html",         label: "会場" },
    { href: "schedule.html",      label: "スケジュール" },
    { href: "teams/index.html",   label: "チーム" },
    { href: "rules.html",         label: "運営ルール" },
    { href: "budget.html",        label: "制作物・収支" },
    { href: "log.html",           label: "決定事項ログ" },
    { href: "links.html",         label: "リンク集" }
  ],

  /* 運営チーム定義
     - チーム追加: この配列に1行追加し、teams/_template.html を複製して
       teams/<slug>.html を作成する（CONTENT-GUIDE.md「チーム追加4ステップ」）
     - status: "todo"（準備中）| "doing"（進行中）| "done"（完了） */
  teams: [
    { slug: "tokatsu",   name: "統括チーム",     leader: "未定", members: "未定", mission: "全体統括・進行管理・意思決定の集約", status: "todo" },
    { slug: "kaijo",     name: "会場調整チーム", leader: "未定", members: "未定", mission: "会場との調整・レイアウト計画", status: "todo" },
    { slug: "yudo",      name: "誘導チーム",     leader: "未定", members: "未定", mission: "最寄駅・エントランスからの案内誘導", status: "todo" },
    { slug: "setsuei",   name: "設営チーム",     leader: "未定", members: "未定", mission: "機材・音響・映像・会場設営", status: "todo" },
    { slug: "uketsuke",  name: "受付チーム",     leader: "未定", members: "未定", mission: "受付・クローク・席案内", status: "todo" },
    { slug: "moshikomi", name: "申込管理チーム", leader: "未定", members: "未定", mission: "申込・入金管理・参加者名簿", status: "todo" },
    { slug: "ts",        name: "TSチーム",       leader: "未定", members: "未定", mission: "TS対応・サポート", status: "todo" },
    { slug: "bihin",     name: "備品チーム",     leader: "未定", members: "未定", mission: "備品・消耗品の準備と管理", status: "todo" }
  ],

  /* 更新履歴（新しいものを配列の先頭に追加。ハブトップに直近5件表示） */
  updates: [
    { date: "2026-07-08", text: "リンク集に拡大リスト（Google Sheets）を追加" },
    { date: "2026-07-08", text: "リンク集に案内図・開催企画書・LP/申込ページを追加" },
    { date: "2026-07-08", text: "リンク集に合宿会場写真（Google Photos）を追加" },
    { date: "2026-07-05", text: "身延山大学・久遠寺周辺の下見内容を反映し、参加費を税込26,000円で確定" },
    { date: "2026-07-04", text: "運営ハブサイトを開設（初期構築）" }
  ],

  /* 未確定事項TODO（確定したらこの配列から削除し、該当ページを更新する） */
  todos: [
    { page: "合宿概要",     text: "下見結果を踏まえた会場利用条件の最終確定（身延山大学 本館5F講堂が主会場候補）" },
    { page: "合宿概要",     text: "開催テーマ・コンセプト文の確定" },
    { page: "スケジュール", text: "当日タイムテーブルの詳細確定（11:00開始案・実動5.5時間案をもとに受付/閉会/撤収時刻を確定）" },
    { page: "チーム",       text: "2027運営体制の確定（各チームのリーダー・人数）" },
    { page: "会場",         text: "会場図面・設備情報の正式確認（案内図PDFはリンク集に反映済み、講堂レイアウト/設備一覧は確認待ち）" },
    { page: "参加者ページ", text: "受付方法・集合時間・持ち物の確定と参加者ページへの反映" }
  ]
};
