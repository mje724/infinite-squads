import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import NavHeader from '@/components/NavHeader';
import DailyRewardModal from '@/components/DailyRewardModal';

export const metadata: Metadata = {
  title: 'Infinite Squads - Build Your Dream Team',
  description: 'Open packs, collect legends, build a squad, and battle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <AuthProvider>
          <NavHeader />
          <DailyRewardModal />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
