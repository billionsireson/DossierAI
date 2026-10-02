# Database — Neon (managed PostgreSQL)

## Decision

**Neon** is the recommended Postgres for DossierAI.

Why Neon fits this build:

- Serverless Postgres designed for Next.js / Vercel-style deployments.
- Database branching per Git branch (`main` / `develop` / `feature/*`) matches
  the PRD GitHub workflow (§68).
- Scale-to-zero + connection pooling keeps free-tier AI-generation spikes cheap
  (credits system, PRD §26, must survive bursty usage).
- Standard Postgres wire protocol — no Prisma Platform lock-in, works with
  Prisma ORM 6, `prisma db push`, and any S3-compatible storage alongside it.
- Pooled + direct URLs map cleanly onto Prisma `url` / `directUrl`.

Alternatives considered:

- Supabase: adds auth/storage we don't need (we own session + S3 abstraction).
- Prisma Postgres: ties us to the Prisma 8 Platform CLI (we pinned ORM 6 to
  avoid exactly that churn).
- Local-only Postgres: fine for offline dev, kept as fallback via
  `docker-compose.yml`, but no branching/preview.

## Setup

1. Create a Neon project + database.
2. Copy the **pooled** connection string → `DATABASE_URL`.
3. Copy the **direct** connection string → `DIRECT_URL`.
4. Local dev:
   ```bash
   cp .env.example .env
   # fill DATABASE_URL + DIRECT_URL
   npm run db:push
   ```
5. Branching: create a Neon branch per `feature/*` branch and point its
   `DATABASE_URL` at the branch endpoint.

## Env

- `DATABASE_URL` — pooled (runtime queries, Prisma Client).
- `DIRECT_URL` — direct (migrations / `db push`). Add
  `directUrl = env("DIRECT_URL")` to `prisma/schema.prisma` when wiring Neon.

See `.env.example`.
