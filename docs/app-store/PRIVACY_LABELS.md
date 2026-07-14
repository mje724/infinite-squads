# App Privacy Label Working Sheet

Final answers must be verified against the production build and every included SDK.

## Data linked to the user

| App Store category | Infinite Squads examples | Purpose |
| --- | --- | --- |
| Contact Info — Email Address | Login email | App functionality, account management, support |
| User Content — Other User Content | Display name; support messages if support collection is added | App functionality, support, safety |
| Identifiers — User ID | Supabase account identifier | App functionality, authentication, security |
| Purchases | Virtual-currency transaction history; future App Store purchases if enabled | App functionality, analytics, fraud prevention |
| Usage Data — Product Interaction | Cards, squads, packs, rewards, battles, streaks, PvP stats | App functionality, analytics |
| Diagnostics | Crash or performance records collected by hosting/native tooling | App functionality, analytics |

## Tracking

- Current assessment: **No data used to track users across apps or websites owned by other companies.**
- Current assessment: **No third-party advertising SDK.**
- Reassess if analytics, attribution, ads, or marketing SDKs are added.

## Data handling claims to verify before submission

- TLS is used in transit.
- Row-level access controls and server-only administrative credentials are correctly configured.
- Account deletion removes the auth user and cascades all associated game rows.
- Backup retention and regional processing language matches Supabase and Vercel configuration.
- The production app contains no undeclared analytics or crash-reporting SDK.
