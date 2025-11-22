// Hooks auxiliares para o carrinho
// Mantém compatibilidade: exporta o hook original do contexto
import {useMemo} from "react";
import type {CartItem} from "../context/CartContext";
import {useCart as useCartBase} from "../context/CartContext";

export {useCartBase as useCart};

/**
 * Retorna apenas a lista de itens do carrinho.
 * Útil para componentes que só precisam renderizar itens sem reagir a count/subtotal.
 */
export function useCartItems(): CartItem[] {
  const {items} = useCartBase();
  return items;
}

/**
 * Retorna apenas a contagem total (soma de quantidades).
 */
export function useCartCount(): number {
  const {count} = useCartBase();
  return count;
}

/**
 * Retorna apenas o subtotal (USD).
 */
export function useCartSubtotal(): number {
  const {subtotal} = useCartBase();
  return subtotal;
}

/**
 * Retorna somente as ações do carrinho (sem dados),
 * para evitar re-render por mudanças em items/count/subtotal em componentes que só disparam ações.
 */
export function useCartActions() {
  const {add, increment, decrement, removeAll, clear} = useCartBase();
  // Memoriza o objeto para estabilidade de referência entre renders
  return useMemo(() => ({add, increment, decrement, removeAll, clear}), [add, increment, decrement, removeAll, clear]);
}

/**
 * Atalho para obter uma função `addToCart` pronta para uso em botões.
 */
export function useAddToCart() {
  const {add} = useCartBase();
  return add;
}
