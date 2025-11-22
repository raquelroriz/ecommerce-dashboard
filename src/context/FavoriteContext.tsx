import {createContext, useContext, useEffect, useMemo, useState} from "react";

type FavoritesContextType = {
  ids: Set<number>;
  has: (id: number) => boolean;
  toggle: (id: number) => void;
  showOnlyFavorites: boolean;
  toggleFilter: () => void;
  setOnlyFavorites: (value: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "favorite-ids";

function Favorite({children}: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set<number>();
      const arr = JSON.parse(raw) as number[];
      if (Array.isArray(arr)) return new Set<number>(arr);
      return new Set<number>();
    } catch {
      return new Set<number>();
    }
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  useEffect(() => {
    try {
      const arr = Array.from(ids.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore storage errors
    }
  }, [ids]);

  const toggle = (id: number) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFilter = () => setShowOnlyFavorites((prev) => !prev);
  const setOnlyFavorites = (value: boolean) => setShowOnlyFavorites(value);

  const value = useMemo<FavoritesContextType>(() => ({
    ids,
    has: (id: number) => ids.has(id),
    toggle,
    showOnlyFavorites,
    toggleFilter,
    setOnlyFavorites,
  }), [ids, showOnlyFavorites]);

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within <Favorite> provider");
  return ctx;
}

export default Favorite;
