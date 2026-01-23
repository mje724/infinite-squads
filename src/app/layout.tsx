import type { Metadata } from 'next';
import { Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Infinite Squads - Ultimate Card Generator & Team Builder',
  description: 'Create custom trading cards and build your ultimate team. Sports, Office, Party, or pure chaos - make it yours.',
  keywords: ['card generator', 'team builder', 'trading cards', 'ultimate team', 'meme cards'],
  openGraph: {
    title: 'Infinite Squads',
    description: 'The universal card generator and team builder',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} font-body antialiased bg-slate-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
