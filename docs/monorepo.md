# Monorepo Setup

This repository is a pnpm workspace monorepo that organizes applications and shared packages under a single root.

## What We Use

- **Package manager:** pnpm workspaces (`pnpm-workspace.yaml`)
- **Language:** TypeScript (strict)
- **Runtime:** Node.js (LTS implied)
- **Backend app tooling:** Cloudflare Wrangler + Hono (see `apps/api/package.json`)

This is aligned with `docs/stack.md` and `docs/api-architecture.md`. The stack document captures intended tech choices (React/Vite, D1, Drizzle, etc.), while this document focuses on the monorepo structure and what is currently initialized.

## Workspace Layout

The workspace is defined in `pnpm-workspace.yaml`:

- `apps/*` for runnable applications
- `packages/*` for shared libraries/config

Current structure (actual on disk as of today):

```text
/
├── apps/
│   ├── api/                 # Cloudflare Worker (Hono)
│   └── web/                 # placeholder (empty, planned React/Vite app)
├── packages/
│   ├── config/              # placeholder (empty, planned shared config)
│   └── shared/              # placeholder (empty, planned shared types/schemas)
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Root Scripts

Root `package.json` proxies common tasks across all workspaces:

- `pnpm dev` → `pnpm -r run dev`
- `pnpm dev:api` → `pnpm --filter @colmeia/api dev`
- `pnpm dev:web` → `pnpm --filter @colmeia/web dev` (will be usable once `apps/web` is initialized)
- `pnpm dev:all` → `pnpm -r --parallel run dev`
- `pnpm lint` → `pnpm -r run lint`
- `pnpm typecheck` → `pnpm -r run typecheck`

## TypeScript Baseline

Shared TS defaults live in `tsconfig.base.json` and include:

- `target: ES2022`
- `module: ESNext` with `moduleResolution: Bundler`
- `strict: true`
- `noEmit: true`

Apps/packages should extend this file to stay consistent.

## Adding a New App or Package

1. Create a folder under `apps/` or `packages/`.
2. Add a `package.json` with a unique `name` (scope is `@colmeia/*`).
3. Add scripts for `dev`, `lint`, and `typecheck` so root commands work.
4. If it’s TypeScript, add a `tsconfig.json` that extends `tsconfig.base.json`.

## Notes

- `apps/web`, `packages/shared`, and `packages/config` are currently empty placeholders. This matches `docs/stack.md` and `docs/api-architecture.md`, which describe the intended contents:
- `apps/web` is planned to be React + Vite.
- `packages/shared` is planned to hold Zod schemas and shared types consumed by the API and frontend.
- The API app (`apps/api`) runs as a Cloudflare Worker via Wrangler, consistent with the API architecture doc.
