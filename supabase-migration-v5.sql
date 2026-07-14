-- Infinite Squads v5 — durable account progression for playtests
-- Apply after v4. Progress is cosmetic; economy rewards remain in validated RPCs.

CREATE TABLE IF NOT EXISTS public.player_progress (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
  counters JSONB NOT NULL DEFAULT '{}'::jsonb,
  achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.player_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "player_progress_select" ON public.player_progress;
CREATE POLICY "player_progress_select" ON public.player_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "player_progress_insert" ON public.player_progress;
CREATE POLICY "player_progress_insert" ON public.player_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "player_progress_update" ON public.player_progress;
CREATE POLICY "player_progress_update" ON public.player_progress
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS player_progress_updated_idx ON public.player_progress(updated_at DESC);

-- Private beta feedback inbox. Testers can submit, but only project admins
-- can read the table. Inputs are bounded and rate-limited server-side.
CREATE TABLE IF NOT EXISTS public.playtest_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  page TEXT,
  screen TEXT,
  build TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.playtest_feedback ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.playtest_feedback FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.submit_playtest_feedback(
  p_category TEXT,
  p_message TEXT,
  p_page TEXT DEFAULT NULL,
  p_screen TEXT DEFAULT NULL,
  p_build TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
  v_user UUID := auth.uid();
  v_recent INTEGER;
BEGIN
  IF p_category NOT IN ('bug', 'confusing', 'balance', 'good') THEN RETURN NULL; END IF;
  IF char_length(trim(COALESCE(p_message, ''))) < 10 OR char_length(p_message) > 2000 THEN RETURN NULL; END IF;

  SELECT COUNT(*) INTO v_recent FROM public.playtest_feedback
    WHERE created_at >= NOW() - INTERVAL '1 hour'
      AND (v_user IS NULL OR user_id = v_user);
  IF (v_user IS NOT NULL AND v_recent >= 20) OR (v_user IS NULL AND v_recent >= 500) THEN RETURN NULL; END IF;

  INSERT INTO public.playtest_feedback (user_id, category, message, page, screen, build, user_agent)
  VALUES (
    v_user,
    p_category,
    trim(p_message),
    LEFT(COALESCE(p_page, ''), 300),
    LEFT(COALESCE(p_screen, ''), 40),
    LEFT(COALESCE(p_build, ''), 40),
    LEFT(COALESCE(p_user_agent, ''), 500)
  ) RETURNING id INTO v_id;
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.submit_playtest_feedback(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;
