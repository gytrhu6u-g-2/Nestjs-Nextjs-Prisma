FROM node:20-alpine

WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# Prisma CLI をグローバルにインストール
RUN npm install -g prisma

# アプリケーションファイルをコピー
COPY . .

# Prisma クライアントを生成
RUN npx prisma generate

# TypeScript をビルド
RUN npm run build

# ポートを公開
EXPOSE 3000 9229 5555

# 起動コマンド
CMD ["npm", "run", "start:debug"]