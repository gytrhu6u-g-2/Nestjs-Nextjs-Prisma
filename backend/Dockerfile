FROM node:20-alpine

WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# 開発用依存も含めてインストール
RUN npm install

# Nest CLI をグローバルにインストール（開発用なので OK）
RUN npm install -g @nestjs/cli

# Prisma CLI も必要に応じて
RUN npm install -g prisma

# アプリケーションコードをコピー
COPY . .

# Prisma クライアント生成（スキーマが必要なため COPY の後）
RUN npx prisma generate

# 必要に応じてビルド（tsconfig.jsonにより異なる）
RUN npm run build

# ポート開放（NestJSデフォルトとデバッグ用）
EXPOSE 3000 9229 5555

# デバッグモードで起動（start:dev も可）
CMD ["npm", "run", "start:debug"]
