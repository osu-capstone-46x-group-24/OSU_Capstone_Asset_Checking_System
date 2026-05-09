FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY drizzle ./drizzle
COPY src ./src

EXPOSE 3000
CMD ["node", "--import=tsx", "src/index.ts"]
