# DossierAI

AI-powered portfolio creation from CVs, resumes, project documents, links, images, and captured work.

> Upload your story. DossierAI builds the stage.

## Status

Milestone 0 — Foundation (in progress). See `DOSSIERAI_PRD_OPENCODE_GITHUB.md`.

## Stack

- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS v4
- PostgreSQL + Prisma (managed: **Neon** — see `docs/database.md`; local fallback: `docker-compose.yml`)
- Stateless session (jose) — Google OAuth planned per PRD §30

## Getting started

1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Fill `DATABASE_URL`, `AUTH_SECRET`, provider keys.
3. Install + run:
   ```bash
   npm install
   npm run dev
   ```
4. Health check: `GET /api/health`

## Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run typecheck` — tsc --noEmit
- `npm run test` — vitest

## Docs

- PRD: `DOSSIERAI_PRD_OPENCODE_GITHUB.md`
- Next.js breaking-change guides: `node_modules/next/dist/docs/`
