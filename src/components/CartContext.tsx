import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  priceEUR: number;
  image?: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;       // soma de quantidades
  subtotal: number;    // soma preço * qty
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  increment: (id: number, step?: number) => void;
  decrement: (id: number, step?: number) => void; // remove item quando chegar a 0
  removeAll: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart-items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const add: CartContextType["add"] = (item, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === item.id);
      if (i === -1) return [...prev, { ...item, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  };

  const increment = (id: number, step = 1) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + step } : p));
  };

  const decrement = (id: number, step = 1) => {
    setItems(prev => {
      const next = prev.map(p => p.id === id ? { ...p, qty: p.qty - step } : p)
                       .filter(p => p.qty > 0); // remove quando chegar a 0
      return next;
    });
  };

  const removeAll = (id: number) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((acc, it) => acc + it.qty, 0);
  const subtotal = items.reduce((acc, it) => acc + it.priceEUR * it.qty, 0);

  const value = useMemo(() => ({ items, count, subtotal, add, increment, decrement, removeAll, clear }), [items, count, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
