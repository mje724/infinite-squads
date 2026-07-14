import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} Infinite Squads</p>
        <nav aria-label="Legal and support" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/support" className="hover:text-white">Support</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/delete-account" className="hover:text-white">Delete account</Link>
        </nav>
      </div>
    </footer>
  );
}
