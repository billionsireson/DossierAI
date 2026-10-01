# GREGREY — Furniture Discovery & Connection Platform

> Find it. Match with the right business. Get it. — DISCOVER → MATCH → CONNECT

GREGREY connects furniture demand with supply in Lagos, Nigeria. Customers upload a photo or describe what they want; GREGREY matches exact listings, similar products, and capable makers.

## UI/UX MVP — PRD §§44–46 (local state, no DB/auth)

Brand per identity deck (dark futuristic mark, Deep Black `#111111` field):
- Sky Blue `#B7CCE3`, Burgundy `#721010`, Mist `#E0E4DE`, Pebble `#BCBDB8`, Steel `#8DA1B9`
- Voice per PRD: "Find it. Match with the right business. Get it."

Pages:
- `/` landing (words / upload / camera)
- `/search` 3-level matching + AI vs Verified + no-exact-match panel + filters
- `/product/[id]` detail + structured enquiry (Ask Business) + local thread
- `/business/[id]` profile + capabilities + catalogue
- `/request/new` furniture request form (DRAFT→CLOSED, local)
- `/saved` saved + shortlist, `/compare` compare, `/messages` threads

## Run

```bash
cd gregrey
npm install
npm run dev
```

Open http://localhost:3000

## Next (per rundown §45)
1. GitHub repo + `/docs` (product-requirements, architecture, api…)
2. Next.js foundation hardening + DB + auth
3. Business dashboard, admin, AI abstraction layer
