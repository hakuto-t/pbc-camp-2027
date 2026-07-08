# CONTENT-GUIDE — コンテンツ編集規約

このサイトを更新する前に必ず読む。禁止事項は README.md を参照。

## 大原則

- 編集してよいのは `<!-- CONTENT:xxx -->` 〜 `<!-- /CONTENT:xxx -->` ブロックの**内側だけ**。
- ブロックの外（`<head>`・ヘッダー・ナビ・フッター・`<script>`参照）は**編集禁止**。構造変更が必要なときは白都さんに相談する。
- ナビ・チーム一覧・カウントダウン・TODO・更新履歴は `ops-jx9rmblg/js/ops-config.js` から自動生成される。**表示内容の変更はconfigを編集する**（HTMLを直接触らない）。

## 記法規約

| 記法 | 用途 | 例 |
|---|---|---|
| `<!-- CONTENT:id -->`〜`<!-- /CONTENT:id -->` | 編集可能ブロックの境界 | — |
| `<span class="tbd">未定</span>` | 画面上の未確定バッジ | `参加費 <span class="tbd">後日ご案内</span>` |
| `<!-- TODO(項目名): 説明 -->` | 未確定箇所のソース内マーカー | `<!-- TODO(参加費): 確定後に記載 -->` |
| `<!-- APPEND:ここに新しい行を上から追加 -->` | 追記式テーブルの挿入位置（`<tbody>`先頭） | 直下に`<tr>`を挿入 |

- 未確定が確定したら: ①本文を書き換え ②`tbd`バッジ削除 ③`TODO(...)`コメント削除 ④`ops-config.js` の `todos` から該当行を削除。
- 未確定箇所の全件把握: `grep -rn "TODO(" --include="*.html" .`

## ops-config.js の編集（設定集中点）

| キー | 内容 | 反映先 |
|---|---|---|
| `eventDate` | 開催日 | ハブトップのカウントダウン |
| `nav` | グローバルナビ | 全運営ページのナビ |
| `teams` | チーム定義（slug/name/leader/members/mission/status） | ナビ・チーム一覧・ハブトップ |
| `updates` | 更新履歴（新しい順・先頭に追加） | ハブトップ（直近5件） |
| `todos` | 未確定事項 | ハブトップの未確定一覧・件数 |

`status` は `"todo"`（準備中）/`"doing"`（進行中）/`"done"`（完了）。

## チーム追加の4ステップ

1. `ops-jx9rmblg/teams/_template.html` を複製し `teams/<slug>.html` を作成（slugは小文字英字ローマ字）
2. 複製ファイルの `<title>`・page-heroの`<h1>`・パンくず末尾のチーム名を書き換える
3. `ops-jx9rmblg/js/ops-config.js` の `teams` 配列に1行追加
4. push（ナビ・チーム一覧カード・ハブトップは自動反映。他ファイルの編集不要）

チーム削除は逆順（configから行削除→HTMLを削除）。改名はconfigの`name`変更＋該当HTML内の表記変更（slugとファイル名は変えない方が安全）。

## ページ別の編集ポイント一覧

| ファイル | CONTENT ID | 内容 |
|---|---|---|
| `index.html`（参加者） | purpose / theme / overview / program / guide / access / first / faq / cancel / contact / updated | 参加者向け全セクション。faqにAPPENDあり。**updated=フッターの最終更新日（参加者ページを編集したら必ず当日日付に書き換える）** |
| `ops-…/index.html` | pages | ページ一覧カード（他は自動生成） |
| `ops-…/overview.html` | basic / venue-status / policy / results2026 / notation | 概要・会場ステータス・方針 |
| `ops-…/venue.html` | kodo / kakurinbo / kuonji / access / visits | 会場3件＋下見記録（APPEND） |
| `ops-…/schedule.html` | milestones / daybefore / dayof / ref2026 | 工程・前日・当日 |
| `ops-…/rules.html` | seminar / info-handling | 運営ルール |
| `ops-…/budget.html` | items / cost2026 / sheets | 制作物（APPEND）・収支 |
| `ops-…/log.html` | howto / log | 決定事項ログ（APPEND） |
| `ops-…/links.html` | links | リンク集カード |
| `ops-…/teams/<slug>.html` | basic / mission / tasks / timeline / items / handover / log / links | チーム個別（logにAPPEND） |

## 決定事項ログの行フォーマット

```html
<tr><td class="num">2027-01-15</td><td>会場を身延山大学 本館5F講堂に確定</td><td>白都／運営MTG議事録</td></tr>
```

- 新しい行を**一番上**（APPENDマーカー直下）に追加。日付は `YYYY-MM-DD`。
- 議事録原本はGoogle Docs等に置き、ここには要点＋出典だけ。

## リンク集の追加ルール

- `ops-…/links.html` に載せるカードは、閲覧者が開ける公開URLまたは権限設定済みのGoogle Drive共有リンクにする。
- ローカル参照（PC内パス、Dropbox内パス、`_work/` 参照、社内フォルダ名だけの案内）は載せない。リンク先が未準備ならURL未設定カードに留める。
- Google Drive資料を載せる場合は、共有範囲を確認し、必要なら「リンクを知っている全員が閲覧可」にしてからURLを入れる。

## 命名規則

- HTMLファイル名: 小文字英字ローマ字slug（例: `uketsuke.html`）
- 画像: WebP形式（PIL: quality=85, method=6）、`assets/img/` 配下、内容がわかる名前
- 日付表記: 本文は「2027年4月27日（火）」、属性・テーブルは `2027-04-27`
- 人数表記: 2027は「約200名」、2026実績は「約350名規模」（公開LP文脈では「280名予定」基準。**内部数値は書かない**）

## 載せてよい情報／ダメな情報

| 載せてよい（このサイト） | ダメ（Sheets・_work/で管理） |
|---|---|
| 役割・段取り・タイムライン | 個人の電話番号・メールアドレス・住所 |
| チームリーダーの氏名（姓程度） | 全メンバーの実名名簿 |
| 制作物のステータス | 見積書・請求書の原本・金額の生データ |
| 決定事項の要点＋出典名 | 議事録の原本・録音・動画 |
| 公開済み実績数字（280名基準・約350名規模） | 内部数値（348名等）・売上関連 |

判断に迷ったら「URLを知った第三者に見られても事故にならないか」で判断。ならないと言い切れなければSheets側へ。

## デザインシステム簡易リファレンス

- CSS変数・共通コンポーネントは `assets/css/site.css` 冒頭、運営専用は `ops-jx9rmblg/css/ops.css` を参照
- 主要コンポーネント: `.sec-head`（セクション見出し）／`.card`+`.card-grid`／`.table`+`.table-wrap--scroll`／`.timeline`+`.tl-item`／`.badge--todo|doing|done|warn|danger`／`.handover-box`（2026引き継ぎ）／`.info-box`・`.warn-box`／`.tbd`
- 新しい色・フォント・角丸を**勝手に追加しない**（和紙×濃紺×金×朱の4系統で完結させる）
- 朱色（`--shu`）は1画面3箇所まで。金は面塗り禁止（罫線・ラベルのみ）
