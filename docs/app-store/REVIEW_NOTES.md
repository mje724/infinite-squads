# App Review Notes Draft

Infinite Squads is a free collectible card strategy game. Players open packs using earned virtual coins, collect cards, build squads using chemistry and roles, and battle through scenario-based encounters.

## Reviewer access

Provide a dedicated review account with a verified email and enough coins/cards to exercise pack opening, collection filters, squad creation, battle flow, daily rewards, and PvP. Do not reuse a personal account. Add credentials only in App Store Connect, never in source control.

## Important behavior

- Paid virtual-currency purchasing is disabled in version 1.0.
- Coins and gems have no cash value and cannot be redeemed or transferred.
- Randomized packs use only earned currency in version 1.0.
- Account deletion is available from the account menu → Account Settings and at `/delete-account`.
- Sign in with Apple is presented alongside Google login in the iOS release build.
- Core game UI is bundled in the app; network access is used for authentication, synchronization, and online features.

## Suggested review path

1. Sign in with the review account.
2. Open a pack from Packs.
3. View and filter My Cards.
4. Build and save a squad.
5. Start a battle and complete the scenario.
6. Open Account Settings to verify the deletion control (do not confirm deletion unless using a disposable account).
