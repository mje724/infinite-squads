import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Bypass navigator.locks. The built-in LockManager-based lock is known
        // to deadlock in Chrome ("AbortError: signal is aborted without reason"),
        // which leaves getSession() hanging forever — auth never resolves, the
        // coin display stays on its loading skeleton, and daily rewards never
        // fire. We don't need cross-tab lock coordination for this app.
        lock: async <R,>(_name: string, _acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
          return await fn();
        },
      },
    }
  );
};

// Singleton for client-side
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient();
  }
  return supabaseInstance;
};

// Types for our database
export interface Profile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  coin_balance: number;
  gem_balance: number;
  daily_streak: number;
  last_daily_claim: string | null;
  pvp_rating: number;
  packs_opened: number;
  battles_won: number;
  battles_lost: number;
  created_at: string;
  updated_at: string;
}

export interface PvpSquad {
  id: string;
  user_id: string;
  scenario_id: string;
  display_name: string;
  card_names: string[];
  updated_at: string;
}

export interface SetCompletion {
  id: string;
  user_id: string;
  set_id: string;
  completed_at: string;
}

export interface UserCard {
  id: string;
  user_id: string;
  card_name: string;
  card_data: Record<string, unknown>;
  pulled_at: string;
  is_favorite: boolean;
}

export interface UserTeam {
  id: string;
  user_id: string;
  team_name: string;
  scenario_id: string;
  team_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface BattleHistory {
  id: string;
  user_id: string;
  scenario_id: string;
  opponent_type: 'cpu' | 'player';
  opponent_id: string | null;
  result: 'win' | 'loss' | 'tie';
  player_score: number;
  opponent_score: number;
  player_team: Record<string, unknown>;
  opponent_team: Record<string, unknown>;
  played_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'signup_bonus' | 'pack_purchase' | 'battle_win' | 'daily_reward';
  description: string;
  created_at: string;
}
