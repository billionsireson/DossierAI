# Production deployment

## Target

Vercel (Next.js) + Neon (Postgres) + S3-compatible storage. One provider per
concern; no lock-in beyond minimal glue.

## Checklist

1. **Neon** — create project, copy pooled URL → `DATABASE_URL`,
   direct URL → `DIRECT_URL` (see `docs/database.md`).
2. **Migrate** — `npm run db:push` (or `prisma migrate deploy` once
   migrations are adopted).
3. **Auth** — set `AUTH_SECRET` (32+ random bytes), add Google OAuth
   client id/secret when login lands.
4. **AI** — set `AI_PROVIDER_API_KEY` to enable the vendor extraction
   path; heuristic remains the fallback.
5. **Storage** — set `STORAGE_*` for the S3-compatible bucket; local
   `.uploads/` driver is dev-only and untracked.
6. **Vercel** — import repo, add env vars, deploy. File-backed dev stores
   (`data/*.json`) do NOT persist on serverless — they are placeholders
   until Neon is wired.
7. **Verify** — `/api/health` 200, signup → upload → review → generate →
   preview → publish → public URL in incognito.

## Notes

- Security headers ship in `next.config.ts:1` (frame, content-type,
  referrer, permissions).
- Rate limits are in-process (`lib/security/rate-limit.ts:1`); move to
  Redis/Upstash when traffic grows.
- Analytics events (`lib/analytics/events.ts:1`) log only workflow
  markers — never document content.
