import { createContext, useContext, useMemo, useState } from "react";

// Tipagem do contexto de favoritos
type FavoritesContextType = {
  ids: Set<number>;
  has: (id: number) => boolean;
  toggle: (id: number) => void;
  showOnlyFavorites: boolean;
  toggleFilter: () => void;
};

// Contexto em si (começa como undefined para garantir uso dentro do Provider)
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Componente Provider: envolve a árvore e mantém o estado dos favoritos
function Favorite({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<number>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  const toggle = (id: number) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFilter = () => setShowOnlyFavorites((prev) => !prev);

  const value = useMemo<FavoritesContextType>(() => ({
    ids,
    has: (id: number) => ids.has(id),
    toggle,
    showOnlyFavorites,
    toggleFilter,
  }), [ids, showOnlyFavorites]);

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

// Hook de conveniência para consumir o contexto
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within <Favorite> provider");
  }
  return ctx;
}

export default Favorite;