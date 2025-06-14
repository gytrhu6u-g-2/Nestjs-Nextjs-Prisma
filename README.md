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
