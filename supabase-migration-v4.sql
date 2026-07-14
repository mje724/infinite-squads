-- Infinite Squads v4 — favorite-card protection
-- Apply after v3.1. A favorite can still be deliberately unfavorited, but it
-- cannot be liquidated through the economy RPC while protected.

CREATE OR REPLACE FUNCTION public.quicksell_card(p_user_id UUID, p_card_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_rarity TEXT;
  v_name TEXT;
  v_value INTEGER;
  v_favorite BOOLEAN;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RETURN -1;
  END IF;

  SELECT card_data->>'rarity', card_name, is_favorite
  INTO v_rarity, v_name, v_favorite
  FROM public.user_cards
  WHERE id = p_card_id AND user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND OR COALESCE(v_favorite, FALSE) THEN
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
