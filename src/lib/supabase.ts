import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Types for our database
export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  coins: number;
  created_at: string;
  updated_at: string;
}

export interface UserCard {
  id: string;
  user_id: string;
  card_data: any;
  pulled_at: string;
}

export interface PackHistory {
  id: string;
  user_id: string;
  cards_pulled: any[];
  opened_at: string;
}
