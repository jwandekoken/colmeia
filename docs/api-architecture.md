# API Architecture (Hono + Modular)

This document defines the backend API architecture for Colmeia using Hono.js, with modular design, dependency inversion, and Hono RPC for type-safe integration with the React frontend.

## Goals

- Modularize by feature so each module owns its routes, services, repositories, and schemas.
- Use dependency inversion so services depend on interfaces, not infrastructure.
- Keep Hono/Workers specifics at the edges (adapters).
- Enable end-to-end types via Hono RPC for the React app.

## Runtime Context

- Hono running on Cloudflare Workers.
- Cloudflare bindings provided via `c.env`.
- Per-request dependencies stored in `c.var`.

## Module Layout

Each module lives in `apps/api/src/modules/<module-name>/` and should include:

- `routes.ts` (Hono routes for the module)
- `handlers.ts` (request/response glue)
- `services.ts` (business logic)
- `repositories.ts` (interfaces + infrastructure adapters)
- `schemas.ts` (Zod schemas; shared types go in `packages/shared`)

## Dependency Inversion Pattern

Services depend on interfaces declared in `repositories.ts`. Concrete implementations are created in a container layer and injected into request context.

- `apps/api/src/container/` builds dependencies for each request.
- A `createContainer()` function adapts `c.env` to repo implementations.
- A middleware sets `c.set("deps", container)` and handlers read `c.var.deps`.

This keeps services pure and testable while allowing Hono/Workers specifics to live only in adapters.

## App Composition

The main app composes modules using `app.route()` and attaches shared middleware above them.

- `apps/api/src/app.ts` creates the Hono app, applies middleware, and mounts modules.
- Each module exports a `moduleApp` Hono instance or `register(app)` function.

## Hono RPC Integration

The API exports its type for the React frontend:

- `export type AppType = typeof app`
- React uses `hc<AppType>()` to create a typed client.

This enables end-to-end type safety for requests and responses.

## Memory & Lifecycle

Dependencies stored in `c.var` are per-request and short-lived. Once the request completes, the context and its dependencies are eligible for garbage collection. This is safe and idiomatic in Hono/Workers as long as:

- `deps` only contains lightweight objects (service/repo instances, config, adapters).
- Large payloads (files/media) are streamed and not stored in `c.var`.
- Long-lived caches or heavy resources are not stored in module-level globals unless explicitly bounded.

## Suggested Module Set (MVP)

- `missions`
- `captains`
- `links`
- `ranking`
- `media`

## File Map (Target)

```
apps/
  api/
    src/
      app.ts
      container/
        index.ts
      modules/
        missions/
        captains/
        links/
        ranking/
        media/
packages/
  shared/
    src/
      schemas/
```
