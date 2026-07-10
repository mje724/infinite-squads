-- ============================================
-- INFINITE SQUADS - MIGRATION V2
-- Economy update: daily streaks, quicksell,
-- collection sets (SBC), premium currency stub.
-- Safe to run on top of the nuclear-reset schema.
-- Run in Supabase SQL Editor.
-- ============================================

-- ── Profile additions ──
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gem_balance INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_streak INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_daily_claim DATE;

-- ── Collection set completions ──
CREATE TABLE IF NOT EXISTS public.set_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  set_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.set_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "set_completions_select" ON public.set_completions;
CREATE POLICY "set_completions_select" ON public.set_completions FOR SELECT USING (auth.uid() = user_id);

-- ── Daily streak claim (server-authoritative: one claim per UTC day,
--    streak continues only on consecutive days) ──
CREATE OR REPLACE FUNCTION public.claim_daily_reward(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_last DATE;
  v_streak INTEGER;
  v_reward INTEGER;
  v_today DATE := (NOW() AT TIME ZONE 'utc')::date;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'not_you');
  END IF;

  SELECT last_daily_claim, daily_streak INTO v_last, v_streak
  FROM public.profiles WHERE id = p_user_id FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'no_profile');
  END IF;

  IF v_last = v_today THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'already_claimed', 'streak', v_streak);
  END IF;

  IF v_last = v_today - 1 THEN
    v_streak := COALESCE(v_streak, 0) + 1;
  ELSE
    v_streak := 1;
  END IF;

  v_reward := CASE LEAST(v_streak, 7)
    WHEN 1 THEN 50
    WHEN 2 THEN 75
    WHEN 3 THEN 100
    WHEN 4 THEN 150
    WHEN 5 THEN 200
    WHEN 6 THEN 250
    ELSE 400
  END;

  UPDATE public.profiles
  SET daily_streak = v_streak, last_daily_claim = v_today,
      coin_balance = coin_balance + v_reward, updated_at = NOW()
  WHERE id = p_user_id;

  INSERT INTO public.transactions (user_id, amount, type, description)
  VALUES (p_user_id, v_reward, 'daily_reward', 'Day ' || v_streak || ' login streak');

  RETURN jsonb_build_object('claimed', true, 'streak', v_streak, 'reward', v_reward);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Quicksell (server derives value from the stored card's rarity —
--    the client cannot name its own price) ──
CREATE OR REPLACE FUNCTION public.quicksell_card(p_user_id UUID, p_card_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_rarity TEXT;
  v_name TEXT;
  v_value INTEGER;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RETURN -1;
  END IF;

  SELECT card_data->>'rarity', card_name INTO v_rarity, v_name
  FROM public.user_cards
  WHERE id = p_card_id AND user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN -1;
  END IF;

  v_value := CASE v_rarity
    WHEN 'bronze' THEN 20
    WHEN 'silver' THEN 40
    WHEN 'gold' THEN 75
    WHEN 'legendary' THEN 150
    WHEN 'holo' THEN 300
    WHEN 'glitch' THEN 100
    WHEN 'icon' THEN 1000
    ELSE 10
  END;

  DELETE FROM public.user_cards WHERE id = p_card_id AND user_id = p_user_id;

  UPDATE public.profiles
  SET coin_balance = coin_balance + v_value, updated_at = NOW()
  WHERE id = p_user_id;

  INSERT INTO public.transactions (user_id, amount, type, description)
  VALUES (p_user_id, v_value, 'quicksell', 'Quicksold ' || v_name);

  RETURN v_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Complete a collection set: atomically burn the submitted cards,
--    record the completion, pay the bonus. All-or-nothing. ──
CREATE OR REPLACE FUNCTION public.complete_set(
  p_user_id UUID,
  p_set_id TEXT,
  p_card_ids UUID[],
  p_bonus INTEGER,
  p_repeatable BOOLEAN
)
RETURNS BOOLEAN AS $$
DECLARE
  v_owned INTEGER;
  v_bonus INTEGER := LEAST(GREATEST(COALESCE(p_bonus, 0), 0), 500);
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RETURN FALSE;
  END IF;

  -- one-time sets stay one-time
  IF NOT p_repeatable AND EXISTS (
    SELECT 1 FROM public.set_completions WHERE user_id = p_user_id AND set_id = p_set_id
  ) THEN
    RETURN FALSE;
  END IF;

  -- every submitted card must exist and belong to the caller (dupe ids collapse)
  SELECT COUNT(DISTINCT id) INTO v_owned
  FROM public.user_cards
  WHERE id = ANY(p_card_ids) AND user_id = p_user_id;

  IF v_owned IS NULL
     OR array_length(p_card_ids, 1) IS NULL
     OR v_owned <> (SELECT COUNT(DISTINCT x) FROM unnest(p_card_ids) AS x) THEN
    RETURN FALSE;
  END IF;

  DELETE FROM public.user_cards WHERE id = ANY(p_card_ids) AND user_id = p_user_id;

  INSERT INTO public.set_completions (user_id, set_id) VALUES (p_user_id, p_set_id);

  IF v_bonus > 0 THEN
    UPDATE public.profiles
    SET coin_balance = coin_balance + v_bonus, updated_at = NOW()
    WHERE id = p_user_id;

    INSERT INTO public.transactions (user_id, amount, type, description)
    VALUES (p_user_id, v_bonus, 'set_bonus', 'Completed collection: ' || p_set_id);
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Harden the coin RPCs from v1: they were callable with arbitrary
--    user ids / amounts. Cap and self-only. ──
CREATE OR REPLACE FUNCTION public.add_coins(p_user_id UUID, p_amount INTEGER, p_type TEXT, p_description TEXT)
RETURNS VOID AS $$
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RETURN;
  END IF;
  IF p_amount < 0 OR p_amount > 500 THEN
    RETURN; -- battle wins / small grants only; big credits go through dedicated RPCs
  END IF;
  UPDATE public.profiles SET coin_balance = coin_balance + p_amount, updated_at = NOW() WHERE id = p_user_id;
  INSERT INTO public.transactions (user_id, amount, type, description) VALUES (p_user_id, p_amount, p_type, p_description);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.spend_coins(p_user_id UUID, p_amount INTEGER, p_type TEXT, p_description TEXT)
RETURNS BOOLEAN AS $$
DECLARE current_balance INTEGER;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RETURN FALSE;
  END IF;
  IF p_amount <= 0 THEN
    RETURN FALSE;
  END IF;
  SELECT coin_balance INTO current_balance FROM public.profiles WHERE id = p_user_id FOR UPDATE;
  IF current_balance < p_amount THEN RETURN FALSE; END IF;
  UPDATE public.profiles SET coin_balance = coin_balance - p_amount, updated_at = NOW() WHERE id = p_user_id;
  INSERT INTO public.transactions (user_id, amount, type, description) VALUES (p_user_id, -p_amount, p_type, p_description);
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
