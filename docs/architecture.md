# DossierAI integration architecture

Authoritative external services and what each does in the product.

| # | Service | Role in DossierAI | Code |
| - | ------- | ----------------- | ---- |
| 1 | **OpenAI API** | Document analysis, summarization, information extraction, intelligent responses. Vendor path behind the `AIProvider` abstraction; heuristic fallback when unconfigured or on failure. | `lib/ai/provider.ts:1`, `lib/ai/openai-provider.ts:1` |
| 2 | **Neon** | Hosted PostgreSQL for users, documents, portfolios, versions, publications, credits, transactions, subscriptions, AI jobs. Prisma ORM, pooled runtime URL + direct migration URL. | `prisma/schema.prisma:1`, `docs/database.md:1` |
| 3 | **Google Cloud** | OAuth 2.0 sign-in (ID + secret in `.env`). Future: application cloud operations as needed. | `lib/auth/google.ts:1`, `docs/auth.md:1` |
| 4 | **Paystack + Kora** | Payments. **Paystack**: fiat subscriptions (PRO/PREMIUM plans) + recurring + one-time packs. **Kora**: crypto payments for additional credits. Both behind the `PaymentProvider` interface; verified webhooks grant credits/plan. | `lib/payments/provider.ts:1`, `lib/payments/paystack.ts:1`, `lib/payments/kora.ts:1` |
| 5 | **Vercel** | Production hosting, HTTPS, delivery. File-backed dev stores do not persist serverless — Neon is the store. | `docs/deploy.md:1` |

## Money flow

```text
Checkout (/api/payments/checkout)
  Paystack → fiat → webhook charge.success → plan upgrade + monthly credits
  Kora     → crypto → webhook charge.success → credit_pack grant
Ledger (immutable) → balance → AI actions spend (402 when short)
```

## AI flow

```text
Upload → heuristic or OpenAI extract → zod schema → confidence review
→ portfolio JSON → schema + quality gates → template renderer → publish
```
