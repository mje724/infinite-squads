// ============================================
// UNIFIED COLLECTION HOOK
// Logged in  -> Supabase user_cards (the real economy)
// Logged out -> localStorage Zustand store (guest sandbox)
//
// Both paths expose the same interface so Squad, Battle,
// My Cards and Packs don't care where cards live.
// For DB cards, Card.id is the user_cards row id — so
// remove/quicksell/burn by id works identically.
// ============================================

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getSupabase, UserCard } from '@/lib/supabase';
import { useCardCollection } from '@/store/store';
import { Card } from '@/types/schema';
import { progressIdentity, recordProgress } from '@/data/progression';

function rowToCard(row: UserCard): Card {
  const card = row.card_data as unknown as Card;
  return { ...card, id: row.id, isFavorite: row.is_favorite };
}

// Cross-instance sync: NavHeader and pages each own a hook instance,
// so after any mutation we ping every instance to refetch.
const CARDS_CHANGED_EVENT = 'is:cards-changed';
function announceCardsChanged() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(CARDS_CHANGED_EVENT));
}

export function useGameCollection() {
  const { user, refreshProfile } = useAuth();
  const supabase = getSupabase();
  const local = useCardCollection();

  const [dbCards, setDbCards] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    if (!user) {
      setDbCards([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('user_cards')
      .select('*')
      .eq('user_id', user.id)
      .order('pulled_at', { ascending: false });
    if (error) console.error('Error fetching cards:', error);
    setDbCards((data as UserCard[]) || []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    const onChange = () => fetchCards();
    window.addEventListener(CARDS_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CARDS_CHANGED_EVENT, onChange);
  }, [fetchCards]);

  const cards: Card[] = user ? dbCards.map(rowToCard) : local.cards;

  const addCard = async (card: Card): Promise<boolean> => {
    if (!user) {
      local.addCard(card);
      return true;
    }
    const { error } = await supabase.from('user_cards').insert({
      user_id: user.id,
      card_name: card.name,
      card_data: card as unknown as Record<string, unknown>,
    });
    if (error) {
      console.error('Error adding card:', error);
      return false;
    }
    await fetchCards();
    announceCardsChanged();
    return true;
  };

  const addCards = async (newCards: Card[]): Promise<boolean> => {
    if (newCards.length === 0) return true;
    if (!user) {
      newCards.forEach(card => local.addCard(card));
      announceCardsChanged();
      return true;
    }
    const { error } = await supabase.from('user_cards').insert(
      newCards.map(card => ({
        user_id: user.id,
        card_name: card.name,
        card_data: card as unknown as Record<string, unknown>,
      }))
    );
    if (error) {
      console.error('Error adding starter cards:', error);
      return false;
    }
    await fetchCards();
    announceCardsChanged();
    return true;
  };

  const removeCard = async (id: string): Promise<boolean> => {
    if (!user) {
      local.removeCard(id);
      return true;
    }
    const { error } = await supabase
      .from('user_cards')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) {
      console.error('Error removing card:', error);
      return false;
    }
    await fetchCards();
    announceCardsChanged();
    return true;
  };

  const clearCollection = async (): Promise<void> => {
    if (!user) {
      local.clearCollection();
      return;
    }
    await supabase.from('user_cards').delete().eq('user_id', user.id);
    await fetchCards();
    announceCardsChanged();
  };

  const toggleFavorite = async (id: string): Promise<boolean> => {
    const card = cards.find(candidate => candidate.id === id);
    if (!card) return false;
    const next = !card.isFavorite;
    if (!user) {
      local.updateCard(id, { isFavorite: next });
      announceCardsChanged();
      return true;
    }
    const { error } = await supabase
      .from('user_cards')
      .update({ is_favorite: next })
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
    await fetchCards();
    announceCardsChanged();
    return true;
  };

  // Returns coins received, or null on failure. Guests can't quicksell
  // (no wallet) — the UI uses that to sell the signup.
  const quicksellCard = async (id: string): Promise<number | null> => {
    if (!user) return null;
    const { data, error } = await supabase.rpc('quicksell_card', {
      p_user_id: user.id,
      p_card_id: id,
    });
    if (error || typeof data !== 'number' || data < 0) {
      console.error('Quicksell failed:', error);
      return null;
    }
    await Promise.all([fetchCards(), refreshProfile()]);
    recordProgress(progressIdentity(user.id), 'quicksell');
    announceCardsChanged();
    return data;
  };

  // How many copies of a given card name the user owns
  const copiesOf = (cardName: string): number =>
    cards.filter(c => c.name === cardName).length;

  return {
    cards,
    loading: user ? loading : false,
    isLoggedIn: !!user,
    addCard,
    addCards,
    removeCard,
    clearCollection,
    toggleFavorite,
    quicksellCard,
    copiesOf,
    refresh: fetchCards,
  };
}
