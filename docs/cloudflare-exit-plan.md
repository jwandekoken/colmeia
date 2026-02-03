# Cloudflare Exit Plan (Docker + VPS)

This document defines a ready-to-execute plan for running the API outside Cloudflare on a VPS using Docker. It is designed to minimize code changes by keeping the existing Hono modular architecture and swapping only platform adapters and infrastructure.

Assumptions:

- Database: SQLite
- Object storage: S3-compatible provider
- Reverse proxy: Caddy

## 1) Dependency Mapping

- Runtime: Cloudflare Workers → Node.js (Hono on Node server)
- Database: Cloudflare D1 → SQLite (local file in container or mounted volume)
- Object storage: Cloudflare R2 → S3-compatible provider (AWS S3 / B2 / Wasabi / MinIO)
- Bindings: `c.env` → `process.env` + config module
- Edge services:
  - Turnstile: keep (public service, works off Cloudflare)
  - Workers AI: replace with external API if used
  - KV/Queues/Cron: replace with Redis/queue/cron only if used later

## 2) Target VPS Architecture (Docker)

Containers:

- `api`: Node.js + Hono
- `caddy`: TLS termination + reverse proxy
- Optional: `redis` (rate limiting, queues), only if needed

Volumes:

- `api-data`: persistent SQLite database file

Networking:

- Public traffic → Caddy → API container

## 3) Required Code Changes (Minimal)

1. **Node entrypoint**
   - Add `apps/api/src/server.ts` to run Hono with Node `serve`.
2. **Config adapter**
   - Replace `c.env` bindings with `process.env` via a config module.
3. **SQLite adapter**
   - Replace D1 Drizzle driver with Drizzle SQLite driver.
4. **S3-compatible storage**
   - Replace R2 adapter with S3-compatible client.

No changes required in:

- Module layout, services, handlers, or Hono RPC types.

## 4) Docker Artifacts

Create:

- `apps/api/Dockerfile`
- `docker-compose.yml`
- `.env.example` with required environment variables

Suggested environment variables:

- `PORT`
- `DATABASE_URL` (SQLite file path, e.g., `file:/data/app.db`)
- `S3_ENDPOINT`
- `S3_REGION`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_BUCKET`
- `PUBLIC_BASE_URL`

## 5) Caddy Configuration

Use Caddy to:

- Terminate TLS
- Forward requests to API container
- Optionally serve static assets if needed

## 6) Migration Runbook

1. Build and start containers (`docker compose up -d`)
2. Run DB migrations
3. Smoke test:
   - `GET /health`
   - Key API routes
4. Switch DNS to VPS
5. Monitor logs and errors

Rollback:

- Re-deploy previous image
- Restore DB from snapshot if necessary

## 7) Readiness Checklist

- [ ] Dockerfile and compose file exist
- [ ] Node entrypoint is in place
- [ ] Config adapter uses `process.env`
- [ ] SQLite driver is wired
- [ ] S3-compatible storage is wired
- [ ] Health check endpoint exists
- [ ] Caddy config is ready
