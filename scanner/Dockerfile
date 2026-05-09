FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libudev-dev \
        libusb-1.0-0-dev \
        pkg-config \
        python3 \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3003
CMD ["npm", "run", "start:server"]
