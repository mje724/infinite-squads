'use client';

import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';

export default function PlaytestWidget() {
  return (
    <Link
      href="/playtest"
      className="fixed bottom-[calc(.75rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/90 p-0 text-xs font-black text-cyan-200 shadow-xl shadow-black/30 backdrop-blur hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:bottom-4 sm:right-4 sm:h-auto sm:w-auto sm:px-3 sm:py-2"
      aria-label="Send playtest feedback"
    >
      <MessageSquareText className="h-4 w-4" />
      <span className="hidden sm:inline">Beta feedback</span>
    </Link>
  );
}
