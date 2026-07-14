'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Uncaught app error:', error); }, [error]);
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <main className="max-w-lg rounded-3xl border border-red-500/30 bg-slate-900 p-8 text-center">
          <p className="text-sm font-black uppercase tracking-widest text-red-400">The squad hit a wall</p>
          <h1 className="mt-3 text-3xl font-black">Your collection is safe.</h1>
          <p className="mt-3 text-slate-300">Retry the screen. If it happens again, send a beta report and mention what you tapped last.</p>
          {error.digest && <p className="mt-3 font-mono text-xs text-slate-500">Error {error.digest}</p>}
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={reset} className="rounded-xl bg-white px-5 py-3 font-black text-slate-950">Try again</button>
            <a href="/playtest" className="rounded-xl border border-slate-700 px-5 py-3 font-bold text-slate-200">Report it</a>
          </div>
        </main>
      </body>
    </html>
  );
}
