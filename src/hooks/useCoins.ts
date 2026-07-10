import { useAuth } from '@/components/AuthProvider';
import { getSupabase } from '@/lib/supabase';

export function useCoins() {
  const { user, profile, refreshProfile } = useAuth();
  const supabase = getSupabase();

  const balance = profile?.coin_balance ?? 0;

  const spendCoins = async (amount: number, type: string, description: string): Promise<boolean> => {
    if (!user) {
      console.error('No user logged in');
      return false;
    }

    if (balance < amount) {
      console.error('Insufficient coins');
      return false;
    }

    const { data, error } = await supabase.rpc('spend_coins', {
      p_user_id: user.id,
      p_amount: amount,
      p_type: type,
      p_description: description,
    });

    if (error) {
      console.error('Error spending coins:', error);
      return false;
    }

    await refreshProfile();
    return data === true;
  };

  const addCoins = async (amount: number, type: string, description: string): Promise<boolean> => {
    if (!user) {
      console.error('No user logged in');
      return false;
    }

    const { error } = await supabase.rpc('add_coins', {
      p_user_id: user.id,
      p_amount: amount,
      p_type: type,
      p_description: description,
    });

    if (error) {
      console.error('Error adding coins:', error);
      return false;
    }

    await refreshProfile();
    return true;
  };

  const canAfford = (amount: number): boolean => {
    return balance >= amount;
  };

  return {
    balance,
    spendCoins,
    addCoins,
    canAfford,
    isLoggedIn: !!user,
  };
}

// Cost constants (pack tier costs live in src/data/gameEconomy.ts)
export const COSTS = {
  PACK_OPEN: 100,
} as const;

// Reward constants (daily streak values live in src/data/gameEconomy.ts)
export const REWARDS = {
  BATTLE_WIN_EASY: 25,
  BATTLE_WIN_MEDIUM: 50,
  BATTLE_WIN_HARD: 100,
  SIGNUP_BONUS: 1000,
} as const;
