import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import NavHeader from '@/components/NavHeader';
import DailyRewardModal from '@/components/DailyRewardModal';
import SiteFooter from '@/components/SiteFooter';
import NativeBridge from '@/components/NativeBridge';

export const metadata: Metadata = {
  metadataBase: new URL('https://infinite-squads.vercel.app'),
  title: {
    default: 'Infinite Squads — Pull Legends. Build Chaos.',
    template: '%s | Infinite Squads',
  },
  description: 'Open card packs, collect 500 legends and internet icons, build chemistry-powered squads, and battle through absurd scenarios.',
  applicationName: 'Infinite Squads',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Infinite Squads',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Infinite Squads — Pull Legends. Build Chaos.',
    description: 'Collect 500 legends and internet icons, build your squad, and battle through absurd scenarios.',
    type: 'website',
    siteName: 'Infinite Squads',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Squads — Pull Legends. Build Chaos.',
    description: 'Collect 500 legends and internet icons, build your squad, and battle through absurd scenarios.',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#020617',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <NativeBridge />
          <NavHeader />
          <DailyRewardModal />
          <main id="main-content" className="pt-16" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
