'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

function AuthCallback() {
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setError('The sign-in link is missing or expired.');
      return;
    }

    getSupabase().auth.exchangeCodeForSession(code).then(({ error }: { error: { message: string } | null }) => {
      if (error) {
        setError(error.message);
        return;
      }
      window.location.replace('/');
    });
  }, [searchParams]);

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-black text-white">Sign-in couldn&apos;t finish</h1>
        <p role="alert" className="mt-3 text-red-300">{error}</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Return home</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-slate-200" aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      Finishing secure sign-in…
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <Suspense fallback={<p className="text-slate-300">Finishing secure sign-in…</p>}>
        <AuthCallback />
      </Suspense>
    </section>
  );
}
