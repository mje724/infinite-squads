import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Terms of Use' };

export default function TermsPage() {
  return (
    <article className="legal-page mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">Last updated July 14, 2026</p>
      <h1>Terms of Use</h1>
      <p>These terms govern your use of Infinite Squads. By creating an account or using the service, you agree to them and to our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use the service.</p>

      <h2>Eligibility and accounts</h2>
      <p>You must be at least 13 years old and legally able to accept these terms. Keep your credentials secure and provide accurate information. You are responsible for activity on your account.</p>

      <h2>License and acceptable use</h2>
      <p>We grant you a personal, limited, revocable, non-transferable license to use Infinite Squads for entertainment. Do not cheat, exploit bugs, automate gameplay, interfere with the service, access another player&apos;s account, harass others, submit unlawful or infringing content, or attempt to reverse engineer protected portions of the service.</p>

      <h2>Virtual items</h2>
      <p>Coins, gems, cards, packs, rewards, and other virtual items are licensed game features. They have no cash value, are not property, cannot be redeemed for money, and may be changed or discontinued as the game evolves. Any future purchase of digital items in a mobile app will use the applicable app store&apos;s purchase system and terms.</p>

      <h2>Content and intellectual property</h2>
      <p>The service, software, artwork, text, designs, and trademarks are owned by or licensed to the operator. References to public figures, history, culture, or internet phenomena are presented as stylized entertainment and do not imply endorsement. If you believe content infringes your rights, contact <Link href="/support">Support</Link>.</p>

      <h2>Availability and changes</h2>
      <p>The service may change, experience interruptions, or be discontinued. We may reset or rebalance game content when reasonably necessary for security, fairness, maintenance, or product development.</p>

      <h2>Suspension and termination</h2>
      <p>We may suspend or terminate access for material violations, fraud, abuse, security threats, or legal requirements. You may stop using the service or delete your account at any time.</p>

      <h2>Disclaimers and liability</h2>
      <p>To the fullest extent permitted by law, the service is provided “as is” and “as available” without warranties. We are not liable for indirect, incidental, special, consequential, or punitive damages. Nothing in these terms limits rights or liabilities that cannot legally be limited.</p>

      <h2>Changes and contact</h2>
      <p>We may update these terms, with notice of material changes in the app or on this page. Questions can be submitted through <Link href="/support">Support</Link>. The operator&apos;s legal name, address, and governing-law jurisdiction must be added before commercial release.</p>
    </article>
  );
}
