# PBC合宿2027 運営サイト

PBC合宿2027（2027年4月27日（火）・身延山・約200名規模）の情報サイト。

- **参加者向けページ**（サイトルート `index.html`）: 参加者に共有する唯一のURL
- **運営ハブ**（`ops-jx9rmblg/` 配下）: 運営チーム限定。URLは運営メンバーにだけ共有する

構築・初回デプロイ: Claude (Fable 5) 2026-07-04〜05 ／ 以後の保守・コンテンツ更新: Codex

## URLと取り扱い区分

| 区分 | パス | 公開URL | 共有してよい相手 |
|---|---|---|---|
| 参加者ページ | `/index.html` | `https://hakuto-t.github.io/pbc-camp-2027/` | 参加者・LINE配信可 |
| 運営ハブ | `/ops-jx9rmblg/` | `https://hakuto-t.github.io/pbc-camp-2027/ops-jx9rmblg/` | **運営メンバーのみ** |

リポジトリ: `https://github.com/hakuto-t/pbc-camp-2027`（**public**。2026-07-04にデプロイ）

**セキュリティモデル（秘匿URL方式・重要な変更あり）**: 当初はprivateリポジトリを想定していたが、無料プランではprivateリポジトリでGitHub Pagesが使えない制約があり、白都さんの判断で**publicリポジトリ**に変更してデプロイした。

これにより秘匿性の前提が変わっている点に注意:

- 従来の想定: 「URLを知らなければ運営ハブには辿り着けない」
- **現在の実態**: リポジトリがpublicのため、`https://github.com/hakuto-t/pbc-camp-2027/tree/main/ops-jx9rmblg` から**誰でもGitHub上でソース・フォルダ名を直接閲覧できる**。ランダムパス名も検索エンジン非表示（noindex/robots.txt）も、GitHubリポジトリの直接閲覧に対しては無力。

したがって、**運営ハブに載せてよい情報の線引き（CONTENT-GUIDE.md）を、これまで以上に厳格に守ること**。個人連絡先・全員名簿・金額原本・内部数値は引き続き一切載せない。「URLを知った第三者」だけでなく「GitHubでリポジトリ名を見つけた誰か」にも見られ得る前提で運用する。

より高い秘匿性が必要になった場合は、リポジトリをprivateに戻す（GitHub Pro等へのアップグレードが必要）か、Cloudflare Pages等の別ホスティングへの切替を検討する。

## フォルダ構成

```
index.html            参加者向けページ（完全静的）
404.html              404ページ
robots.txt            全体クロール拒否（Disallow: / のみ。個別パスを書かない）
.nojekyll             Jekyll無効化（_template.html配信に必須）
assets/               共有アセット（css/site.css・js/guest.js・img/）
ops-jx9rmblg/         運営ハブ（CSS/JSもすべてこの配下に閉じる）
  index.html          ハブトップ（カウントダウン・TODO・チーム一覧を自動生成）
  overview/venue/schedule/rules/budget/log/links.html
  teams/              チーム一覧・各チームページ・_template.html（複製用雛形）
  tools/seating.html  席割ツール置き場（準備中）
  css/ops.css         運営専用スタイル
  js/ops-config.js    ★設定集中点（ナビ・チーム・TODO・更新履歴）
  js/ops-nav.js       共通生成スクリプト（原則編集しない）
_work/                ローカル作業場（Git管理外。内部資料はここへ）
CONTENT-GUIDE.md      コンテンツ編集規約（編集前に必読）
HANDOVER.md           引き継ぎメモ（Git管理外）
```

## 禁止事項（変更前に必読）

1. `index.html`（参加者ページ）と `ops-jx9rmblg/` フォルダの**移動・改名禁止**（改名すると運営メンバーのブックマークが全滅する。どうしても必要なら白都さんに確認）
2. **参加者ページ・404から運営ハブへのリンク・言及禁止**（`ops-` という文字列を index.html / 404.html に書かない）
3. 全HTMLの `noindex` メタ、運営ページの `no-referrer` メタ、`robots.txt` の**削除・変更禁止**
4. `robots.txt` に個別パス（`Disallow: /ops-...`）を**書かない**（自己暴露になる）
5. `_work/`・`HANDOVER.md` の**コミット禁止**（.gitignore済み。**リポジトリがpublicのため、コミット＝GitHub上で誰でも閲覧可能**。ローカルのGit操作前に `git status` で混入していないか必ず確認する）
6. 個人の電話番号・メールアドレス・住所・全メンバー実名名簿・請求書等の原本・内部数値（例: 348名）を**サイトに載せない**（権限管理されたGoogle Sheetsで管理しリンクする）
7. 運営URLを短縮URLサービス・QRコード生成サービスに**通さない**（サービス側の台帳・解析画面から漏れる）
8. `sitemap.xml` を作らない

## 更新の基本フロー

1. 編集ポイントを CONTENT-GUIDE.md で確認（`<!-- CONTENT:xxx -->` ブロック内だけ編集する）
2. 編集後、ローカルで表示確認: リポジトリ直下で `py -m http.server 8792` → `http://localhost:8792/`
3. 下記チェックリストを通す
4. commit → push（GitHub Actionsが自動デプロイ）

## 更新後チェックリスト（Git Bashで実行）

```bash
# 1) 全HTMLにnoindexがあるか（出力が空ならOK）
grep -L "noindex" index.html 404.html ops-jx9rmblg/*.html ops-jx9rmblg/teams/*.html ops-jx9rmblg/tools/*.html

# 2) 参加者ページ・404に運営パスが漏れていないか（出力が空ならOK）
grep -n "ops-" index.html 404.html

# 3) 運営ページ全部にno-referrerがあるか（出力が空ならOK）
grep -L "no-referrer" ops-jx9rmblg/*.html ops-jx9rmblg/teams/*.html ops-jx9rmblg/tools/*.html

# 4) 内部数値が漏れていないか（出力が空ならOK）
grep -rn "348" --include="*.html" .

# 5) _work/ がコミット対象に入っていないか（出力に _work が無ければOK）
git status --short
```

## デプロイ手順（初回デプロイ済み・2026-07-04）

1. `git init -b main` → `.gitignore`（HANDOVER.md・_work/除外）を確認した上で `git add -A` → commit
2. `.github/workflows/static.yml` 配置（2026の `PBC合宿2026_運営資料/.github/workflows/static.yml` を流用。`branches: ["main"]` に変更、`lfs: true` は動画等がないため省略）
3. `gh repo create hakuto-t/pbc-camp-2027 --private --source=. --remote=origin --push` でリポジトリ作成
4. **private リポジトリのままでは無料プランでGitHub Pagesが有効化できない**（`422: Your current plan does not support GitHub Pages for this repository`）ことが判明。白都さんの判断で `gh repo edit hakuto-t/pbc-camp-2027 --visibility public --accept-visibility-change-consequences` によりpublicへ変更（詳しい経緯・残余リスクは上記「セキュリティモデル」参照）
5. `gh api -X POST repos/hakuto-t/pbc-camp-2027/pages -f build_type=workflow` でPages有効化
6. Actions再実行（`gh run rerun <run-id> --repo hakuto-t/pbc-camp-2027`）→ デプロイ成功
7. 実URLでの200応答を確認済み: `https://hakuto-t.github.io/pbc-camp-2027/` と `.../ops-jx9rmblg/`

**更新時のデプロイ**: `main` ブランチへの `git push` でActionsが自動デプロイする（`workflow_dispatch` でも手動実行可）。

OGP（`og:url` / `og:image`）は絶対URLで反映済み（2026-07-04）。

### 未対応（次回作業）

- リポジトリをprivateに戻すか検討する場合は、GitHub Pro等へのアップグレードが前提
- 2027運営体制（8チームのリーダー・人数）確定後、`ops-jx9rmblg/teams/*.html` と `js/ops-config.js` の更新
- 会場利用条件・開催テーマ・当日詳細タイムテーブル・受付方法・集合時間・持ち物が確定後、`ops-jx9rmblg/js/ops-config.js` の `todos` から該当項目を削除し、参加者ページ・運営ハブの該当箇所を更新（tbdバッジ・TODOコメントの解消）

## 更新履歴

- 2026-07-04: 初回構築・デプロイ（参加者ページ＋運営ハブ17ページ）
- 2026-07-05: 2026年参加者ページの内容（持ち物・食事・服装・初参加案内・FAQ等）を精査・反映。フッターに最終更新日表示を追加
- 2026-07-05: 身延山大学・久遠寺周辺の会場下見情報を運営ハブへ反映。参加費を税込26,000円で確定し参加者ページへ反映（commit `ccf82ae`、GitHub Pages反映確認済み）

## 関連資料（ローカル）

- 2026年実績: `../PBC合宿2026_運営資料/`（operations.html＝2026運営計画の正本）
- 2027企画資料: `../PBC合宿2027_企画準備/`（企画書・キャンセルポリシー・会場素材メモ）
