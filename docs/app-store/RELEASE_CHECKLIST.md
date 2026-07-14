# Release Checklist

## Owner and legal

- [ ] Confirm operator legal name, postal address, public support email, and governing jurisdiction.
- [ ] Confirm Apple Developer Program enrollment and App Store Connect agreements.
- [ ] Decide individual vs organization enrollment and EU DSA trader status.
- [ ] Complete content-rights review for the full card roster and retain evidence.
- [ ] Finalize Terms and Privacy Policy with qualified legal review.

## Backend and identity

- [ ] Deploy `supabase/functions/delete-account`.
- [ ] Delete a disposable account and verify auth plus every dependent row is removed.
- [ ] Configure Apple App ID, Services ID, key, redirect URLs, and Supabase Apple provider.
- [ ] Set `NEXT_PUBLIC_APPLE_AUTH_ENABLED=true` only after end-to-end verification.
- [ ] Create and preserve an App Review demo account.

## Native build

- [ ] Install and select Xcode 26; install current iOS simulators.
- [ ] Add Capacitor 8 and generate iOS/Android projects from a bundled web build.
- [ ] Implement universal links/deep links for OAuth callbacks.
- [ ] Add native haptics, share, status bar, splash, network and lifecycle behavior.
- [ ] Configure bundle ID, version/build numbers, signing, icons, launch screen, orientations, and minimum OS.
- [ ] Audit required-reason APIs and SDK privacy manifests.
- [ ] Confirm no production `server.url` or remote thin-client behavior.

## QA

- [ ] Pass lint, typecheck, production build, card validation, and automated tests.
- [ ] Test clean install, upgrade, offline/poor network, auth expiry, background/restore, and account deletion.
- [ ] Test small/large iPhones, current iPad layouts or opt out of iPad support for 1.0.
- [ ] Run VoiceOver, Dynamic Type, reduced motion, contrast, keyboard, and touch-target checks.
- [ ] Run at least one external TestFlight cycle and resolve crashes/feedback.

## App Store Connect

- [ ] Reserve bundle ID and create app record before uploading.
- [ ] Add name, subtitle, categories, description, keywords, URLs, copyright, and version notes.
- [ ] Complete age rating, content rights, encryption/export compliance, DSA, and App Privacy.
- [ ] Upload 1–10 final screenshots for required device classes.
- [ ] Upload archive, attach build, add review credentials/notes, and submit.
