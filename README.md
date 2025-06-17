# 概要

NestJS、Next.js、Prisma、PostgreSQL を使用したフルスタック Web アプリケーション

# 接続先

Next.js : [http://localhost:3000](http://localhost:3000/)
NestJS : [http://localhost:3001](http://localhost:3001/)
Prisma Studio : [http://localhost:5555](http://localhost:5555/)

# 構築手順

backend/prisma 直下に.env を置く
DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb

# Docker コマンド

・Docker 起動
docker compose up --build

・Prisma 初期化
npx prisma generate
npx prisma migrate dev --name init

・Docker 全てのコンテナを再ビルドして起動する
docker compose down
docker compose build
docker compose up --build

・コンテナの中に入り込む
docker ps ※コンテナの確認
docker exec -it nest-backend sh
docker exec -it next-frontend sh

・Docker が使っているディスク領域がいっぱいの場合

# 停止中のコンテナを削除

docker container prune

# 未使用のボリュームを削除

docker volume prune

# 未使用のネットワークを削除

docker network prune

# 使用されていないイメージを削除

docker image prune

# すべて一括削除（安全確認あり）

docker system prune -a

# すべての未使用リソースを一括削除

docker system prune -af --volumes
