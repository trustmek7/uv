import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as allProducts } from '../data/products';
import { Product } from '../types';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface StoredCartItem {
  id: string;
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = 'solarwear_cart';

function hydrateCart(stored: StoredCartItem[]): CartItem[] {
  return stored.reduce<CartItem[]>((acc, item) => {
    const product = allProducts.find((p) => p.id === item.productId);
    if (product) acc.push({ ...item, product });
    return acc;
  }, []);
}

function dehydrateCart(items: CartItem[]): StoredCartItem[] {
  return items.map(({ id, productId, quantity, selectedColor, selectedSize }) => ({
    id,
    productId,
    quantity,
    selectedColor,
    selectedSize,
  }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? hydrateCart(JSON.parse(stored)) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(dehydrateCart(items)));
  }, [items]);

  const addToCart = useCallback(
    (product: Product, color?: string, size?: string, quantity = 1) => {
      const selectedColor = color || product.colors[0];
      const selectedSize = size || product.sizes[0];
      const id = `${product.id}-${selectedColor}-${selectedSize}`;
      setItems((prev) => {
        const existing = prev.find((item) => item.id === id);
        if (existing) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, { id, productId: product.id, product, quantity, selectedColor, selectedSize }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
