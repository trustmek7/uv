import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WishlistContextType {
  items: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);
const WISHLIST_KEY = 'solarwear_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((productId: string) => {
    setItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => items.includes(productId), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
