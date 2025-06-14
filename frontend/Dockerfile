FROM node:20-alpine

WORKDIR /app

# npm を使って依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションコードをすべてコピー
COPY . .

# 必要なポートを公開（例：Next.js や NestJS）
EXPOSE 3000

# 起動コマンドを npm に変更
CMD ["npm", "run", "dev"]
