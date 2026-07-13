-- ============================================
-- MIGRATION V3.1 — PvP integrity + reward pacing
--  1. Defense squads must be OWNED: set_defense_squad validates every
--     card name against the caller's user_cards. Direct table writes
--     are revoked; the RPC is the only door.
--  2. Battle reward interval 45s → 30s (honest players were colliding
--     with the cooldown; the cap that matters is the 40/day).
-- ============================================

-- Only the validated RPC may write squads now
DROP POLICY IF EXISTS "pvp_squads_insert" ON public.pvp_squads;
DROP POLICY IF EXISTS "pvp_squads_update" ON public.pvp_squads;

CREATE OR REPLACE FUNCTION public.set_defense_squad(
  p_user_id UUID,
  p_scenario_id TEXT,
  p_display_name TEXT,
  p_card_names JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
  v_owned INTEGER;
  v_name TEXT;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN RETURN FALSE; END IF;

  v_count := jsonb_array_length(p_card_names);
  IF v_count IS NULL OR v_count < 4 OR v_count > 11 THEN RETURN FALSE; END IF;

  -- every card in the squad must exist in the caller's collection
  FOR v_name IN SELECT jsonb_array_elements_text(p_card_names) LOOP
    SELECT COUNT(*) INTO v_owned FROM public.user_cards
      WHERE user_id = p_user_id AND card_name = v_name LIMIT 1;
    IF v_owned = 0 THEN RETURN FALSE; END IF;
  END LOOP;

  INSERT INTO public.pvp_squads (user_id, scenario_id, display_name, card_names, updated_at)
  VALUES (p_user_id, p_scenario_id, LEFT(COALESCE(p_display_name, 'Anonymous'), 24), p_card_names, NOW())
  ON CONFLICT (user_id, scenario_id)
  DO UPDATE SET display_name = EXCLUDED.display_name, card_names = EXCLUDED.card_names, updated_at = NOW();

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reward pacing: 30s between claims (daily cap unchanged at 40)
CREATE OR REPLACE FUNCTION public.claim_battle_reward(p_user_id UUID, p_difficulty TEXT, p_won BOOLEAN)
RETURNS INTEGER AS $$
DECLARE
  v_reward INTEGER;
  v_last TIMESTAMP WITH TIME ZONE;
  v_today_count INTEGER;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN RETURN -1; END IF;
  IF p_difficulty NOT IN ('easy','medium','hard') THEN RETURN -1; END IF;
  SELECT MAX(created_at) INTO v_last FROM public.transactions
    WHERE user_id = p_user_id AND type IN ('battle_win','battle_played');
  IF v_last IS NOT NULL AND NOW() - v_last < INTERVAL '30 seconds' THEN RETURN -2; END IF;
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
