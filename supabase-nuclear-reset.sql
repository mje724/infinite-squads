-- NUCLEAR RESET: Force drops everything and recreates
-- Run this in Supabase SQL Editor

-- Drop trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.spend_coins(UUID, INTEGER, TEXT, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.add_coins(UUID, INTEGER, TEXT, TEXT) CASCADE;

-- Force drop ALL tables with CASCADE (this removes foreign key constraints too)
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.battle_history CASCADE;
DROP TABLE IF EXISTS public.user_teams CASCADE;
DROP TABLE IF EXISTS public.user_cards CASCADE;
DROP TABLE IF EXISTS public.pack_history CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Now recreate everything fresh
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  coin_balance INTEGER DEFAULT 1000,
  packs_opened INTEGER DEFAULT 0,
  battles_won INTEGER DEFAULT 0,
  battles_lost INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  card_name TEXT NOT NULL,
  card_data JSONB NOT NULL,
  pulled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_favorite BOOLEAN DEFAULT FALSE
);

CREATE TABLE public.user_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  team_name TEXT NOT NULL,
  scenario_id TEXT NOT NULL,
  team_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.battle_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scenario_id TEXT NOT NULL,
  opponent_type TEXT NOT NULL,
  opponent_id UUID,
  result TEXT NOT NULL,
  player_score INTEGER NOT NULL,
  opponent_score INTEGER NOT NULL,
  player_team JSONB NOT NULL,
  opponent_team JSONB NOT NULL,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- User Cards policies
CREATE POLICY "cards_select" ON public.user_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "cards_insert" ON public.user_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cards_delete" ON public.user_cards FOR DELETE USING (auth.uid() = user_id);

-- User Teams policies
CREATE POLICY "teams_select" ON public.user_teams FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "teams_insert" ON public.user_teams FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "teams_update" ON public.user_teams FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "teams_delete" ON public.user_teams FOR DELETE USING (auth.uid() = user_id);

-- Battle History policies
CREATE POLICY "battles_select" ON public.battle_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "battles_insert" ON public.battle_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "transactions_select" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "transactions_insert" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup with 1000 coins
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, coin_balance)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))),
    1000
  );
  INSERT INTO public.transactions (user_id, amount, type, description)
  VALUES (NEW.id, 1000, 'signup_bonus', 'Welcome bonus');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Spend coins function
CREATE OR REPLACE FUNCTION public.spend_coins(p_user_id UUID, p_amount INTEGER, p_type TEXT, p_description TEXT)
RETURNS BOOLEAN AS $$
DECLARE current_balance INTEGER;
BEGIN
  SELECT coin_balance INTO current_balance FROM public.profiles WHERE id = p_user_id;
  IF current_balance < p_amount THEN RETURN FALSE; END IF;
  UPDATE public.profiles SET coin_balance = coin_balance - p_amount, updated_at = NOW() WHERE id = p_user_id;
  INSERT INTO public.transactions (user_id, amount, type, description) VALUES (p_user_id, -p_amount, p_type, p_description);
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add coins function  
CREATE OR REPLACE FUNCTION public.add_coins(p_user_id UUID, p_amount INTEGER, p_type TEXT, p_description TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles SET coin_balance = coin_balance + p_amount, updated_at = NOW() WHERE id = p_user_id;
  INSERT INTO public.transactions (user_id, amount, type, description) VALUES (p_user_id, p_amount, p_type, p_description);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
