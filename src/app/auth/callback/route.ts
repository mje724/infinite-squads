import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  // Create response early so we can set cookies on it
  const response = NextResponse.redirect(`${origin}/`);

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            // Parse cookies from request
            const cookieHeader = request.headers.get('cookie') || '';
            const cookies: { name: string; value: string }[] = [];
            cookieHeader.split(';').forEach(cookie => {
              const [name, ...rest] = cookie.trim().split('=');
              if (name) {
                cookies.push({ name, value: rest.join('=') });
              }
            });
            return cookies;
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set({
                name,
                value,
                ...options,
              });
            });
          },
        },
      }
    );

    await supabase.auth.exchangeCodeForSession(code);
  }

  return response;
}
