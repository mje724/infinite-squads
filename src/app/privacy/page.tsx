import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How Infinite Squads handles player data.' };

export default function PrivacyPage() {
  return (
    <article className="legal-page mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Last updated July 14, 2026</p>
      <h1>Privacy Policy</h1>
      <p>Infinite Squads uses only the information needed to create accounts, save game progress, operate multiplayer features, prevent abuse, and provide support. We do not sell personal information or use third-party advertising trackers.</p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Account information:</strong> email address, user ID, authentication provider, display name, and optional profile image.</li>
        <li><strong>Gameplay information:</strong> card collection, squads, balances, pack and reward history, battle results, streaks, and leaderboard statistics.</li>
        <li><strong>Technical information:</strong> device, browser, network, security, and diagnostic information that our hosting and authentication providers process to deliver and protect the service.</li>
        <li><strong>Support and playtest information:</strong> messages and contact details you choose to send, plus the current page, screen size, build identifier, and browser description included with beta feedback to help reproduce problems.</li>
      </ul>

      <h2>How we use information</h2>
      <p>We use information to authenticate players, save and sync progress, run game features, maintain security, diagnose problems, respond to requests, and meet legal obligations. We do not use sensitive personal information to profile players.</p>

      <h2>Service providers and sharing</h2>
      <p>We share information only as needed with infrastructure providers that process it on our behalf, including Supabase for authentication and game data and Vercel for hosting and delivery. We may also disclose information when required by law, to protect players or the service, or as part of a business transfer subject to appropriate safeguards.</p>

      <h2>Retention and deletion</h2>
      <p>Account and gameplay information is retained while your account is active. You can permanently delete your account and associated game data from <Link href="/account">Account settings</Link> or our <Link href="/delete-account">web deletion page</Link>. Limited records may remain temporarily in encrypted backups or where retention is legally required.</p>

      <h2>Security and international processing</h2>
      <p>We use access controls, encrypted transport, and managed infrastructure to protect information. No system is completely secure. Information may be processed in countries other than where you live, subject to the safeguards used by our providers and applicable law.</p>

      <h2>Children</h2>
      <p>Infinite Squads is not directed to children under 13, and we do not knowingly collect personal information from them. A parent or guardian who believes a child provided information should contact us so it can be removed.</p>

      <h2>Your choices and rights</h2>
      <p>Depending on your location, you may have rights to access, correct, delete, or receive a copy of your information, or to object to certain processing. Use the account controls above or contact us through <Link href="/support">Support</Link>. We may need to verify your identity.</p>

      <h2>Changes and contact</h2>
      <p>We may update this policy as the service changes. Material changes will be communicated in the app or on this page. Privacy questions and requests can be submitted through <Link href="/support">Support</Link>.</p>
    </article>
  );
}
