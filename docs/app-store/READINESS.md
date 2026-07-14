# Infinite Squads — App Store Readiness

Assessment date: July 14, 2026

## Executive decision

**Not ready for App Store submission today.** The production web game is polished and feature-rich enough to justify a native release, but the submission binary and several account-owned release inputs do not yet exist. A raw web wrapper would carry a material rejection risk under Apple guideline 4.2.

## Current scorecard

| Area | Status | Release decision |
| --- | --- | --- |
| Core product and replay value | Strong | 500 collectible cards, packs, squads, battles, progression, and PvP provide lasting game value. |
| Mobile web UX | Strong | Responsive navigation, touch targets, accessibility, and mobile layouts are in place. |
| Web engineering quality | Strong | Current build, type, lint, and card-validation gates are automated. |
| Privacy/legal surfaces | Implemented, needs owner details | Privacy, terms, support, and deletion routes now exist. Add the operator legal name, jurisdiction, and public support email. |
| Account deletion | Implemented, deployment pending | In-app and web deletion UI plus an authenticated server function are implemented. Deploy and verify the function in production. |
| Sign in with Apple | Code-ready, credentials pending | The provider and UI are wired behind `NEXT_PUBLIC_APPLE_AUTH_ENABLED`. Configure Apple and Supabase before enabling it. |
| Monetization | Safe while disabled | Paid virtual currency remains disabled. Any future digital purchases must use StoreKit; disclose randomized-item odds before purchase. |
| Native iOS binary | Blocked | No native project or signed archive exists. Full Xcode is not installed/selected on this Mac. |
| Native product quality | Needs implementation | Use a bundled Capacitor 8 build, not a remote website wrapper; add haptics, native share, lifecycle handling, and device QA. |
| Store assets and metadata | Drafted | Metadata is drafted. Capture final screenshots only from the signed native build. |
| Content/IP | Legal review needed | The roster includes names and parody references to public figures and cultural properties. Confirm publicity, trademark, and content rights before commercial release. |
| Release operations | Needs owner accounts | Apple Developer enrollment, agreements, bundle ID, App Store Connect record, signing, TestFlight, and review submission require the account holder. |

## Recommended architecture

1. Convert the client experience into a static web bundle and embed it with Capacitor 8.
2. Keep authentication and game state in Supabase; route OAuth through universal links/custom schemes.
3. Use native plugins for haptics, sharing, status bar/safe areas, app lifecycle, network state, and secure credential storage where appropriate.
4. Do not use Capacitor `server.url` for the production submission. The app must ship its core UI and gameplay bundle and remain useful during temporary network loss.
5. Keep web and native releases on the same game logic, with platform adapters for auth, purchases, links, and device capabilities.

## Remaining launch blockers

1. Install Xcode 26, select it with `xcode-select`, accept the license, and install an iOS simulator runtime.
2. Enroll/verify the Apple Developer Program account and reserve the final bundle ID (proposed: `com.infinitesquads.game`).
3. Supply the operator legal name, public support email, jurisdiction, and DSA trader decision.
4. Deploy and test the `delete-account` Supabase Edge Function against a disposable account.
5. Configure Sign in with Apple in Apple Developer and Supabase, then enable the release flag.
6. Build the bundled Capacitor target and add native-quality integrations.
7. Complete on-device QA, accessibility checks, privacy manifest/SDK review, and TestFlight testing.
8. Resolve or document rights for names, references, and any third-party content in the card roster.
9. Create the App Store Connect record, complete privacy/age/content-rights declarations, upload screenshots and build, and submit.

## Recommended age-rating answers

Do not select Made for Kids. Answer the current questionnaire truthfully, including randomized packs/loot boxes and fantasy/comedic battle content. A likely result is **13+**, but App Store Connect determines the final rating from the current questionnaire and regions.
