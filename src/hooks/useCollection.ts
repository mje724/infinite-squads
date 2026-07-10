import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getSupabase, UserCard } from '@/lib/supabase';
import { Card } from '@/types/schema';

export function useCollection() {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [cards, setCards] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all cards for the logged-in user
  const fetchCards = useCallback(async () => {
    if (!user) {
      setCards([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('user_cards')
      .select('*')
      .eq('user_id', user.id)
      .order('pulled_at', { ascending: false });

    if (error) {
      console.error('Error fetching cards:', error);
    } else {
      setCards(data || []);
    }
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Add a card to the user's collection
  const addCard = async (card: Card): Promise<boolean> => {
    if (!user) {
      console.error('No user logged in');
      return false;
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

    // Refresh the collection
    await fetchCards();
    
    // Update packs_opened count
    await supabase
      .from('profiles')
      .update({ packs_opened: (await supabase.from('profiles').select('packs_opened').eq('id', user.id).single()).data?.packs_opened + 1 })
      .eq('id', user.id);

    return true;
  };

  // Remove a card from the collection
  const removeCard = async (cardId: string): Promise<boolean> => {
    if (!user) return false;

    const { error } = await supabase
      .from('user_cards')
      .delete()
      .eq('id', cardId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error removing card:', error);
      return false;
    }

    await fetchCards();
    return true;
  };

  // Toggle favorite status
  const toggleFavorite = async (cardId: string): Promise<boolean> => {
    if (!user) return false;

    const card = cards.find(c => c.id === cardId);
    if (!card) return false;

    const { error } = await supabase
      .from('user_cards')
      .update({ is_favorite: !card.is_favorite })
      .eq('id', cardId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }

    await fetchCards();
    return true;
  };

  // Get cards as Card type for compatibility with existing components
  const getCardsAsCardType = (): Card[] => {
    return cards.map(uc => uc.card_data as unknown as Card);
  };

  // Check if user has a specific card by name
  const hasCard = (cardName: string): boolean => {
    return cards.some(c => c.card_name === cardName);
  };

  // Get card count
  const cardCount = cards.length;

  // Get unique card names
  const uniqueCards = [...new Set(cards.map(c => c.card_name))].length;

  return {
    cards,
    loading,
    addCard,
    removeCard,
    toggleFavorite,
    fetchCards,
    getCardsAsCardType,
    hasCard,
    cardCount,
    uniqueCards,
    isLoggedIn: !!user,
  };
}
