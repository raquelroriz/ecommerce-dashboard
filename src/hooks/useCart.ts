// Hooks auxiliares para o carrinho
import {useMemo} from "react";
import type {CartItem} from "../context/CartContext";
import {useCart as useCartBase} from "../context/CartContext";

export {useCartBase as useCart};

// Returns only the list of items in the cart.
export function useCartItems(): CartItem[] {
  const {items} = useCartBase();
  return items;
}

// Returns only the total count (sum of quantities).
export function useCartCount(): number {
  const {count} = useCartBase();
  return count;
}

// Returns only the subtotal (USD).
export function useCartSubtotal(): number {
  const {subtotal} = useCartBase();
  return subtotal;
}

// Returns only the cart actions (without data) to avoid re-rendering due to simple changes that trigger actions.
export function useCartActions() {
  const {add, increment, decrement, removeAll, clear} = useCartBase();
  // It memorizes the object for reference stability between renders.
  return useMemo(() => ({add, increment, decrement, removeAll, clear}), [add, increment, decrement, removeAll, clear]);
}

// Shortcut to obtain a ready-to-use `addToCart` function in buttons.
export function useAddToCart() {
  const {add} = useCartBase();
  return add;
}
