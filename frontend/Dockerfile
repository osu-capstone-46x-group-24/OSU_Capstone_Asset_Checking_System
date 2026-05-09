FROM node:22-bookworm-slim AS build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

WORKDIR /app
COPY .d.ts ./
COPY frontend ./frontend

WORKDIR /app/frontend
ARG VITE_BASE_URL=/
ARG VITE_API_BASE_URL=/api
ARG VITE_SCANNER_BASE_URL=
ARG VITE_PUBLIC_LANDING_ONLY=false
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SCANNER_BASE_URL=$VITE_SCANNER_BASE_URL
ENV VITE_PUBLIC_LANDING_ONLY=$VITE_PUBLIC_LANDING_ONLY
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
