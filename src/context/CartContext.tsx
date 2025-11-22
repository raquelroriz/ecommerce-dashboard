import {createContext, useContext, useEffect, useMemo, useState} from "react";

export type CartItem = {
  id: number;
  name: string;
  priceUSD: number;
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

export function CartProvider({children}: { children: React.ReactNode }) {
  // Normaliza itens vindos do localStorage (migração de priceEUR -> priceUSD, coerção de tipos, etc.)
  function normalizeStoredItems(value: unknown): CartItem[] {
    if (!Array.isArray(value)) return [];
    const out: CartItem[] = [];
    for (const anyItem of value) {
      const id = Number((anyItem as any)?.id);
      const name = String((anyItem as any)?.name ?? "").trim();
      // Suporta legado: priceEUR ou priceUSD ausente
      const legacyPriceEUR = (anyItem as any)?.priceEUR;
      const priceCandidate = (anyItem as any)?.priceUSD ?? legacyPriceEUR ?? 0;
      const priceUSD = Number.parseFloat(priceCandidate) || 0;
      const image = (anyItem as any)?.image as string | undefined;
      const qtyRaw = Number((anyItem as any)?.qty);
      const qty = Number.isFinite(qtyRaw) && qtyRaw > 0 ? qtyRaw : 1;
      if (!Number.isFinite(id) || !id || !name) continue; // descarta itens inválidos
      out.push({id, name, priceUSD, image, qty});
    }
    return out;
  }

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return normalizeStoredItems(parsed);
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
      const safePrice = Number(item.priceUSD) || 0;
      if (i === -1) return [...prev, {...item, priceUSD: safePrice, qty}];
      const next = [...prev];
      next[i] = {...next[i], priceUSD: safePrice, qty: next[i].qty + qty};
      return next;
    });
  };

  const increment = (id: number, step = 1) => {
    setItems(prev => prev.map(p => p.id === id ? {...p, qty: p.qty + step} : p));
  };

  const decrement = (id: number, step = 1) => {
    setItems(prev => {
       // remove quando chegar a 0
      return prev.map(p => p.id === id ? {...p, qty: p.qty - step} : p)
        .filter(p => p.qty > 0);
    });
  };

  const removeAll = (id: number) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((acc, it) => acc + (Number.isFinite(it.qty) ? it.qty : 0), 0);
  const subtotal = items.reduce((acc, it) => acc + (Number(it.priceUSD) || 0) * (Number.isFinite(it.qty) ? it.qty : 0), 0);

  const value = useMemo(() => ({
    items,
    count,
    subtotal,
    add,
    increment,
    decrement,
    removeAll,
    clear
  }), [items, count, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
