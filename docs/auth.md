# Auth setup

## Email + password (ready now)

1. Generate a session secret and add it to `.env`:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   ```
   AUTH_SECRET=<paste output>
   ```
2. `npm run dev` → open `/signup` → create an account → redirected to
   `/app/dashboard`. `/app/*` redirects to `/login` without a session
   (see `proxy.ts:1`); data access still verifies via `lib/auth/dal.ts:1`.

## Google OAuth (when ready)

1. [Google Cloud Console](https://console.cloud.google.com) → new or
   existing project.
2. **APIs & Services → OAuth consent screen** → External → app name
   `DossierAI`, support email, scopes `openid email profile` → add
   yourself under Test users → Save.
3. **Credentials → Create Credentials → OAuth client ID** → Web
   application → Authorized redirect URI:
   `http://localhost:3000/api/auth/google/callback` (plus your
   production URL later).
4. Copy Client ID + Secret into `.env`:
   ```
   AUTH_PROVIDER_CLIENT_ID=<id>
   AUTH_PROVIDER_CLIENT_SECRET=<secret>
   ```
5. Tell your build agent — the `/api/auth/google` start route and
   callback (code exchange → userinfo → user upsert → session) plug into
   `components/auth/google-button.tsx:1`, which already detects the
   configuration.
