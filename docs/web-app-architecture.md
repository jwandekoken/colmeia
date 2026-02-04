# Web App Architecture (React Router v7 Framework Mode + Modular)

This document defines the frontend web application architecture for Colmeia. It aligns with `docs/stack.md`, `docs/monorepo.md`, and `docs/api-architecture.md` and focuses on a modular, role-based SPA that runs as a PWA.

## Goals

- Single SPA with role-based routes for Generals (dashboard) and Captains (missions).
- Modular feature boundaries aligned with backend modules and shared schemas.
- Keep framework-specific details (React Router v7 framework mode) at the edges.
- End-to-end type safety via Hono RPC and shared Zod schemas.
- Progressive Web App with installability and push notifications.

## Runtime Context

- React + Vite app in `apps/web`.
- React Router v7 in framework mode with built-in data loading/mutations.
- SPA rendering mode (Client Side Rendering) with server rendering disabled in `react-router.config.ts`.
- Hono RPC client for API calls and shared types from `packages/shared`.
- Tailwind + shadcn/ui for UI and design system.
- PWA via Vite plugin and a single Service Worker.

## App Structure (React Router Conventions)

Follow React Router framework mode conventions. Routes are defined in the `app/routes/` directory and drive file-based routing.
High-level layout under `apps/web`:

```
apps/
  web/
    app/                  # React Router app directory (entry, root, routes)
      routes/             # file-based route modules (React Router conventions)
      modules/            # feature modules (mirrors API modules)
      shared/             # reusable UI + utilities
      styles/
    public/
```

### Modules (Feature-First)

Each module owns its UI and feature components. Route files live in `routes/` per framework conventions and render a module `page`. Loaders/actions live in the route file by default; if they grow, they can be extracted into the module.

```
apps/web/app/modules/<module-name>/
  pages/              # route-level pages (rendered by routes)
  components/         # module-local UI
  api.ts              # typed API client wrappers
  schemas.ts          # module-local schemas (optional)
```

Suggested initial modules:

- `auth`
- `missions`
- `media`
- `links`
- `ranking`
- `metrics`
- `forms` (public, unauthenticated)

`modules/forms` is the only public area and must not assume auth context.

## Routing Model (Framework Mode)

- Single SPA with role-based route groups:
  - `/app/*` for authenticated users (General or Captain).
  - `/forms/*` for unauthenticated public pages.
- Role guards at the route level (e.g., `general` vs `captain`).
- Route definitions live in `routes/` and map to module exports.

Example route groups:

- `/app/general/*` (dashboard, mission management, media, metrics)
- `/app/captain/*` (missions feed, share flow, ranking)
- `/forms/:slug` (public data capture forms)

## Data Fetching and Mutations

Use React Router v7 framework mode:

- `loader` functions for data fetching.
- `action` functions for mutations.
- Use `defer` for streaming large payloads (e.g., media lists).
- Prefer `fetcher` for non-navigation mutations.
- Default: `loader` and `action` live in the route file.
- Extract to `modules/<module>/loaders.ts` or `modules/<module>/actions.ts` only when needed.

SPA rendering config (React Router framework mode):

```ts
// apps/web/react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
} satisfies Config;
```

Avoid client-global state unless necessary. If we need shared state later, prefer minimal context or a small store (e.g., Zustand) for UI-only state.

## API Client and Types

- API calls use Hono RPC client generated from `AppType`.
- Shared types and schemas live in `packages/shared`.
- Module `api.ts` files should expose typed functions used by loaders/actions.

## Auth and Session

- Cookie-based auth with email/password initially.
- Session read in loaders; redirect to login if missing.
- Planned extension: OAuth providers (Google, etc).
- Auth boundaries enforced via route loaders and role guards.

## UI and Design System

- Tailwind CSS for styling.
- shadcn/ui components as the base system.
- `shared/ui` for project-level wrappers (buttons, cards, layouts).
- Consistent layout shells:
  - `GeneralShell` for dashboard.
  - `CaptainShell` for PWA experience.

## PWA Architecture

- Installable PWA (manifest + service worker).
- Push notifications enabled (details to be finalized later).
- Offline support focused on app shell and cached routes:
  - Cache static assets and core routes.
  - Avoid caching auth tokens in SW.

## Error Handling

- Global error boundary per route group.
- Module-specific error boundaries for critical flows.
- Standard API error payloads mapped to UI messages.

## File Map (Target)

```
apps/
  web/
    app/
      root.tsx
      routes.ts
      routes/
        _index.tsx
        app.layout.tsx
        app.general.tsx
        app.captain.tsx
        forms.$slug.tsx
      modules/
        auth/
        missions/
        media/
        links/
        ranking/
        metrics/
        forms/
      shared/
        ui/
        lib/
      styles/
        tailwind.css
    react-router.config.ts
    vite.config.ts
packages/
  shared/
    src/
      schemas/
```

## Open Questions (For Later)

- Push notification provider and delivery strategy.
- Offline mission sharing UX constraints.
- Analytics pipeline for front-end events.
