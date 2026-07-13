-- ============================================
-- INFINITE SQUADS - MIGRATION V3
-- Economy hardening + Ranked PvP + Daily objectives.
-- Additive; safe on top of v2. Run in Supabase SQL Editor.
--
-- Threat model note: the battle SIM still runs client-side, so a
-- technical user can claim a win they didn't earn — but rewards are
-- now fixed server-side, rate-limited, and daily-capped. Forgery is
-- bounded to what an honest heavy player could earn anyway.
-- ============================================

-- ── Profile additions ──
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pvp_rating INTEGER DEFAULT 1000;

-- ── PvP defense squads (ghost battles) ──
CREATE TABLE IF NOT EXISTS public.pvp_squads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scenario_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  card_names JSONB NOT NULL, -- array of card names; client rebuilds cards from roster
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, scenario_id)
);

ALTER TABLE public.pvp_squads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pvp_squads_select" ON public.pvp_squads;
CREATE POLICY "pvp_squads_select" ON public.pvp_squads FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "pvp_squads_insert" ON public.pvp_squads;
CREATE POLICY "pvp_squads_insert" ON public.pvp_squads FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "pvp_squads_update" ON public.pvp_squads;
CREATE POLICY "pvp_squads_update" ON public.pvp_squads FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "pvp_squads_delete" ON public.pvp_squads;
CREATE POLICY "pvp_squads_delete" ON public.pvp_squads FOR DELETE USING (auth.uid() = user_id);

-- ── Daily objective claims ──
CREATE TABLE IF NOT EXISTS public.objective_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  objective_id TEXT NOT NULL,
  claim_date DATE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')::date,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, objective_id, claim_date)
);

ALTER TABLE public.objective_claims ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "objective_claims_select" ON public.objective_claims;
CREATE POLICY "objective_claims_select" ON public.objective_claims FOR SELECT USING (auth.uid() = user_id);

-- ── CPU battle reward: fixed payouts, min interval, daily cap ──
CREATE OR REPLACE FUNCTION public.claim_battle_reward(p_user_id UUID, p_difficulty TEXT, p_won BOOLEAN)
RETURNS INTEGER AS $$
DECLARE
  v_reward INTEGER;
  v_last TIMESTAMP WITH TIME ZONE;
  v_today_count INTEGER;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN RETURN -1; END IF;
  IF p_difficulty NOT IN ('easy','medium','hard') THEN RETURN -1; END IF;

  -- rate limit: 45s between battle claims, 40 per UTC day
  SELECT MAX(created_at) INTO v_last FROM public.transactions
    WHERE user_id = p_user_id AND type IN ('battle_win','battle_played');
  IF v_last IS NOT NULL AND NOW() - v_last < INTERVAL '45 seconds' THEN RETURN -2; END IF;

  SELECT COUNT(*) INTO v_today_count FROM public.transactions
    WHERE user_id = p_user_id AND type IN ('battle_win','battle_played')
      AND created_at >= date_trunc('day', NOW() AT TIME ZONE 'utc') AT TIME ZONE 'utc';
  IF v_today_count >= 40 THEN RETURN -3; END IF;

  IF p_won THEN
    v_reward := CASE p_difficulty WHEN 'easy' THEN 25 WHEN 'medium' THEN 50 ELSE 100 END;
    UPDATE public.profiles SET coin_balance = coin_balance + v_reward,
      battles_won = battles_won + 1, updated_at = NOW() WHERE id = p_user_id;
    INSERT INTO public.transactions (user_id, amount, type, description)
      VALUES (p_user_id, v_reward, 'battle_win', 'Won a ' || p_difficulty || ' battle');
  ELSE
    v_reward := 0;
    UPDATE public.profiles SET battles_lost = battles_lost + 1, updated_at = NOW() WHERE id = p_user_id;
    INSERT INTO public.transactions (user_id, amount, type, description)
      VALUES (p_user_id, 0, 'battle_played', 'Lost a ' || p_difficulty || ' battle');
  END IF;

  RETURN v_reward;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Ranked PvP result: rating swing + coins, same rate limits ──
CREATE OR REPLACE FUNCTION public.record_pvp_result(p_user_id UUID, p_opponent_id UUID, p_won BOOLEAN)
RETURNS JSONB AS $$
DECLARE
  v_last TIMESTAMP WITH TIME ZONE;
  v_today_count INTEGER;
  v_reward INTEGER;
  v_delta INTEGER;
  v_new_rating INTEGER;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN RETURN jsonb_build_object('ok', false, 'reason', 'not_you'); END IF;
  IF p_opponent_id = p_user_id THEN RETURN jsonb_build_object('ok', false, 'reason', 'self'); END IF;

  SELECT MAX(created_at) INTO v_last FROM public.transactions
    WHERE user_id = p_user_id AND type = 'pvp';
  IF v_last IS NOT NULL AND NOW() - v_last < INTERVAL '45 seconds' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'too_fast');
  END IF;

  SELECT COUNT(*) INTO v_today_count FROM public.transactions
    WHERE user_id = p_user_id AND type = 'pvp'
      AND created_at >= date_trunc('day', NOW() AT TIME ZONE 'utc') AT TIME ZONE 'utc';
  IF v_today_count >= 40 THEN RETURN jsonb_build_object('ok', false, 'reason', 'daily_cap'); END IF;

  IF p_won THEN
    v_reward := 75; v_delta := 20;
    UPDATE public.profiles SET pvp_rating = pvp_rating + 20, coin_balance = coin_balance + 75,
      battles_won = battles_won + 1, updated_at = NOW() WHERE id = p_user_id
      RETURNING pvp_rating INTO v_new_rating;
    UPDATE public.profiles SET pvp_rating = GREATEST(100, pvp_rating - 15), updated_at = NOW()
      WHERE id = p_opponent_id;
  ELSE
    v_reward := 15; v_delta := -15;
    UPDATE public.profiles SET pvp_rating = GREATEST(100, pvp_rating - 15), coin_balance = coin_balance + 15,
      battles_lost = battles_lost + 1, updated_at = NOW() WHERE id = p_user_id
      RETURNING pvp_rating INTO v_new_rating;
    UPDATE public.profiles SET pvp_rating = pvp_rating + 10, updated_at = NOW()
      WHERE id = p_opponent_id;
  END IF;

  INSERT INTO public.transactions (user_id, amount, type, description)
    VALUES (p_user_id, v_reward, 'pvp', CASE WHEN p_won THEN 'Ranked win' ELSE 'Ranked loss' END);

  RETURN jsonb_build_object('ok', true, 'reward', v_reward, 'delta', v_delta, 'rating', v_new_rating);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Daily objective claim: rewards fixed server-side, once per day each ──
CREATE OR REPLACE FUNCTION public.claim_objective(p_user_id UUID, p_objective_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  v_reward INTEGER;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN RETURN -1; END IF;

  v_reward := CASE p_objective_id
    WHEN 'daily_play_3'   THEN 50
    WHEN 'daily_win_2'    THEN 75
    WHEN 'daily_hard_win' THEN 100
    WHEN 'daily_pack'     THEN 40
    WHEN 'daily_sell'     THEN 30
    ELSE NULL
  END;
  IF v_reward IS NULL THEN RETURN -1; END IF;

  BEGIN
    INSERT INTO public.objective_claims (user_id, objective_id) VALUES (p_user_id, p_objective_id);
  EXCEPTION WHEN unique_violation THEN
    RETURN -2; -- already claimed today
  END;

  UPDATE public.profiles SET coin_balance = coin_balance + v_reward, updated_at = NOW() WHERE id = p_user_id;
  INSERT INTO public.transactions (user_id, amount, type, description)
    VALUES (p_user_id, v_reward, 'objective', 'Daily objective: ' || p_objective_id);

  RETURN v_reward;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Leaderboard (safe public read without opening profiles RLS) ──
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (display_name TEXT, pvp_rating INTEGER, battles_won INTEGER) AS $$
BEGIN
  RETURN QUERY SELECT p.display_name, p.pvp_rating, p.battles_won
    FROM public.profiles p
    ORDER BY p.pvp_rating DESC, p.battles_won DESC
    LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── add_coins retired: every legitimate credit now has a dedicated,
--    validated RPC. This closes the last open faucet. ──
CREATE OR REPLACE FUNCTION public.add_coins(p_user_id UUID, p_amount INTEGER, p_type TEXT, p_description TEXT)
RETURNS VOID AS $$
BEGIN
  RETURN; -- disabled by migration v3
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
