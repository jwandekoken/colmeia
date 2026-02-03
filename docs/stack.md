# Tech Stack - Project "Militância 2.0"

This document outlines the architectural and technological choices for the platform.

## 1. Core Runtime & Package Management

- **Runtime:** Node.js (LTS)
- **Package Manager:** pnpm with **Workspaces** (Monorepo)
- **Language:** TypeScript (Strict Mode)

## 2. Backend (The "General")

- **Framework:** [Hono](https://hono.dev/)
- **Platform:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQL-based/SQLite)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (Best-in-class for D1/Edge runtimes)
- **Authentication:** [Lucia Auth](https://lucia-auth.com/) or Cloudflare Turnstile/JWT (TBD)

## 3. Frontend (Shared for "Generals" and "Captains")

- **Library:** React
- **Build Tool:** Vite
- **Architecture:** SPA (Single Page Application)
- **Type Safety:** **Hono RPC** (End-to-end type safety between Backend and Frontend)
- **UI/Styling:** Tailwind CSS + [Shadcn/ui](https://ui.shadcn.com/) (Recommended for rapid development)
  - **Audience:** Same frontend serves both the General dashboard and the Captain PWA.

## 4. Storage & Media

- **Provider:** [Cloudflare R2](https://developers.cloudflare.com/r2/) (S3-compatible object storage for videos and audios)
- **Content Delivery:** Cloudflare CDN

## 5. Communication Channels (The "Infantry")

- **WhatsApp:** Official WhatsApp Business API (via Cloudflare Workers)
- **AI/LLM:** Cloudflare Workers AI (Llama 3 / Mistral) for the bot logic

## 6. Monorepo Structure

```text
/
├── apps/
│   ├── api/          # Hono + D1 + Drizzle (Cloudflare Workers)
│   └── web/          # React + Vite (Frontend)
├── packages/
│   ├── shared/       # Zod schemas and shared TypeScript types
│   └── config/       # Shared TS/ESLint/Prettier configs (optional)
├── package.json      # Workspace configuration
└── README.md
```

## 7. Local Development Workflow

- **Wrangler:** Used for local simulation of Workers and D1.
- **Commands:**
  - `pnpm install` - To install dependencies for all packages.
  - `pnpm run dev --workspace=api` - Start the backend local server.
  - `pnpm run dev --workspace=web` - Start the frontend local server.
