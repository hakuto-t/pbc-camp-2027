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
    { slug: "tokatsu",   name: "統括チーム",     leader: "未定", members: "未定", mission: "全体統括・リーダー先行決定・意思決定の集約", status: "doing" },
    { slug: "kaijo",     name: "会場調整チーム", leader: "未定", members: "未定", mission: "会場交渉・現地実測・CADレイアウト計画", status: "doing" },
    { slug: "yudo",      name: "誘導チーム",     leader: "未定", members: "未定", mission: "最寄駅・エントランスからの案内誘導", status: "todo" },
    { slug: "setsuei",   name: "設営チーム",     leader: "未定", members: "未定", mission: "現地実測・什器・機材・音響・映像・会場設営", status: "doing" },
    { slug: "uketsuke",  name: "受付チーム",     leader: "未定", members: "未定", mission: "受付・クローク・席案内", status: "todo" },
    { slug: "moshikomi", name: "申込管理チーム", leader: "未定", members: "未定", mission: "申込・入金管理・参加者名簿", status: "todo" },
    { slug: "ts",        name: "TSチーム",       leader: "未定", members: "未定", mission: "TS対応・サポート", status: "todo" },
    { slug: "bihin",     name: "備品チーム",     leader: "未定", members: "未定", mission: "備品・消耗品の準備と管理", status: "todo" }
  ],

  /* 更新履歴（新しいものを配列の先頭に追加。ハブトップに直近5件表示） */
  updates: [
    { date: "2026-08-18", text: "身延山大学の仮押さえ・丸茂さんとの直接交渉・会場視察/CAD計画を反映" },
    { date: "2026-08-18", text: "各チームリーダーを先行決定し、会場調整・設営系リーダーを視察前に決める方針を追加" },
    { date: "2026-07-08", text: "リンク集に拡大リスト（Google Sheets）を追加" },
    { date: "2026-07-08", text: "リンク集に案内図・開催企画書・LP/申込ページを追加" },
    { date: "2026-07-08", text: "リンク集に合宿会場写真（Google Photos）を追加" },
    { date: "2026-07-05", text: "身延山大学・久遠寺周辺の下見内容を反映し、参加費を税込26,000円で確定" },
    { date: "2026-07-04", text: "運営ハブサイトを開設（初期構築）" }
  ],

  /* 未確定事項TODO（確定したらこの配列から削除し、該当ページを更新する） */
  todos: [
    { page: "合宿概要",     text: "丸茂さんを主窓口に、学長・久遠寺側を含む会場正式承認と50万円の税込・税抜、支払条件を確定" },
    { page: "合宿概要",     text: "開催テーマ・コンセプト文の確定" },
    { page: "スケジュール", text: "当日タイムテーブルの詳細確定（11:00開始案・実動5.5時間案をもとに受付/閉会/撤収時刻を確定）" },
    { page: "チーム",       text: "各チームのリーダーを先行決定。特に会場調整・設営系リーダーは奈津美さんの現地視察前に確定" },
    { page: "会場",         text: "奈津美さんと会場調整・設営系リーダーが現地実測し、CAD図面・島数・実収容人数・不足机数を確定" },
    { page: "会場",         text: "会場正式確保後、机リース・ケータリング・前泊後泊・複数宿坊・送迎・駐車場・入退場動線を確定" },
    { page: "参加者ページ", text: "受付方法・集合時間・持ち物の確定と参加者ページへの反映" }
  ]
};
