FROM node:20-alpine

WORKDIR /app

# npm を使って依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションの全ファイルをコピー
COPY . .

# build スクリプトの実行（package.json に "build" が定義されている必要があります）
RUN npm run build

# ポートを公開（NestJS デバッグ用途含む）
EXPOSE 3000 9229 5555

# デバッグ起動（package.json に "start:debug" が定義されている必要あり）
CMD ["npm", "run", "start:debug"]
