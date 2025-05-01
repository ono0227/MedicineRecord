# 無料ウェブアプリ MedicineRecord

服薬管理のモチベを維持するために作成されたウェブアプリです。

現在、仮ドメインにて運用しています。

URL:<http://medicine-record-alb-120277363.ap-northeast-1.elb.amazonaws.com/>

## 使用技術について

Frontend: React（Material UI、ESLint、Prettier）＋ Nginx（本番環境のみ）

Backend: RubyonRails（APIモード、Rspec、Rubocop）

インフラ：　Docker、CircleCI、AWS（ECS Fargate、ECR、RDS、ALB、）

## 実装機能

### ユーザ向け

・ユーザの新規登録、編集、削除

・ゲストログイン

・パスワード更新機能（実装予定、仮ドメインのため現在使用不可）

・薬の新規登録、編集、削除

・服薬記録の登録、編集、削除

・カレンダー、グラフによる視覚化（chat-js、Material UIを使用）

・継続日数の表示

・お問い合わせ機能（Slack Webhookを使用）

### 非ユーザ向け

・Dockerによる開発環境のコンテナ化

・CircleCIによる自動CI&CDパイプラインの構築

・Nginxのキャッシュ保持による効率的な配信
