FROM node:20-alpine

WORKDIR /app

# 依存ファイルだけ先にコピーしてキャッシュ効率アップ
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

# 残りのコードをコピー
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
