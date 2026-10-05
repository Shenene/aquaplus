# --------------------------------------
# Stage 1: Build React frontend
# --------------------------------------

FROM node:22-bookworm-slim AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build


# --------------------------------------
# Stage 2: Production Express server
# --------------------------------------

FROM node:22-bookworm-slim AS production

WORKDIR /app/backend

ENV NODE_ENV=production

COPY backend/package*.json ./

RUN npm ci --omit=dev

COPY backend/ ./

COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]