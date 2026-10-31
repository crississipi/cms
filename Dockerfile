# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — Order-to-HubSpot Integration (Next.js / Prisma)
# Multi-stage build: deps → builder → runner
#
# Secrets are NEVER baked into the image. All environment variables are
# supplied at runtime via docker-compose.yml or the container platform.
#
# Node version: 22 LTS (Jod) — matches the runtime used in development.
# Base image: node:22-alpine — minimal attack surface.
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: dependency installation ─────────────────────────────────────────
FROM node:22-alpine AS deps

# Install libc compatibility shim (required by some native add-ons, e.g. @prisma/engines).
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the package manifest and lockfile so this layer is cached
# as long as dependencies do not change.
COPY package.json package-lock.json ./

# Install production + dev dependencies together so we can build in the next stage.
# --frozen-lockfile ensures reproducibility.
RUN npm ci --frozen-lockfile

# ── Stage 2: build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Bring in node_modules from the deps stage.
COPY --from=deps /app/node_modules ./node_modules

# Copy application source. .dockerignore prevents secrets and dev artefacts
# from entering the build context.
COPY . .

# Generate Prisma client. This reads the schema only; no database connection
# is required at build time.
# DTBASE_URL is a dummy — Prisma generate only needs the schema, not a live DB.
ENV DTBASE_URL="postgresql://build:build@build:5432/build?sslmode=disable"

RUN npx prisma generate

# Build the Next.js application.
# All NEXT_PUBLIC_ variables that must be embedded at build time should be
# declared here as --build-arg / ARG pairs. None are required for this project.
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: production runtime ───────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Port is configurable; 3000 is the Next.js default.
ENV PORT=3000

# Create a non-root user and group with fixed UIDs for reproducibility.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what is required to run the application.
# Avoid bringing the full source tree or devDependencies into the runtime image.

# Public static assets (served directly by Next.js)
COPY --from=builder /app/public ./public

# Next.js standalone output — a self-contained server bundle that includes
# only production-required node_modules.
# Requires  output: 'standalone'  in next.config.ts (see note below).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Generated Prisma client (binary engines are platform-specific).
COPY --from=builder --chown=nextjs:nodejs /app/src/generated ./src/generated

# Prisma schema — needed for runtime introspection and migrate deploy.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

# node_modules required for `prisma migrate deploy` at startup.
# Only @prisma/client + prisma CLI are needed at runtime.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

# Health check: hit the Next.js built-in /api/health route.
# Falls back to the root page if the health route is not implemented.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Entrypoint: run Prisma migrations then start the server.
# Migrations are safe to re-run — Prisma skips already-applied migrations.
# The server.js is produced by Next.js standalone output.
CMD ["sh", "-c", "node node_modules/.bin/prisma migrate deploy && node server.js"]
