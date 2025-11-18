import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Tipagem do contexto de favoritos
type FavoritesContextType = {
  ids: Set<number>;
  has: (id: number) => boolean;
  toggle: (id: number) => void;
  showOnlyFavorites: boolean;
  toggleFilter: () => void;
  setOnlyFavorites: (value: boolean) => void;
};

// Contexto em si (começa como undefined para garantir uso dentro do Provider)
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "favorite-ids";

// Componente Provider: envolve a árvore e mantém o estado dos favoritos
function Favorite({ children }: { children: React.ReactNode }) {
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

  // Persistir favoritos no localStorage sempre que mudar
  useEffect(() => {
    try {
      const arr = Array.from(ids.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore erros de storage
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
  const setOnlyFavorites = (value: boolean) => setShowOnlyFavorites(!!value);

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

// Hook de conveniência para consumir o contexto
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within <Favorite> provider");
  }
  return ctx;
}

// Botão de alternância de favoritos para ser usado no Header (ou em qualquer lugar)
export function FavoriteToggleButton() {
  const { showOnlyFavorites, setOnlyFavorites, ids } = useFavorites();
  const count = ids.size;
  return (
    <Link
      to="/favorites"
      aria-label="Favorites"
      aria-pressed={showOnlyFavorites}
      onClick={() => setOnlyFavorites(true)}
      title={showOnlyFavorites ? "Showing only favorites" : "Show only favorites"}
      className={`relative ml-auto flex items-center justify-center rounded-full border px-3 py-2 text-sm hover:bg-brand-50 ${showOnlyFavorites ? "border-rose-400 bg-rose-50" : "border-brand-200 bg-white"}`}
      data-has-favorites={count > 0 ? true : undefined}
    >
      {/* Heart icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
           className={`h-5 w-5 ${showOnlyFavorites ? "text-rose-600" : "text-rose-500"}`}>
        <path
          d="M11.645 20.91l-.007-.003-.022-.012a21.86 21.86 0 0 1-1.162-.682 25.18 25.18 0 0 1-4.063-3.02C3.454 14.584 1.5 12.272 1.5 9.75A5.25 5.25 0 0 1 6.75 4.5a5.22 5.22 0 0 1 3.75 1.59A5.22 5.22 0 0 1 14.25 4.5 5.25 5.25 0 0 1 19.5 9.75c0 2.523-1.955 4.834-4.891 7.444a25.18 25.18 0 0 1-4.063 3.02 21.86 21.86 0 0 1-1.162.682l-.022.012-.007.003-.003.002a.75.75 0 0 1-.682 0l-.003-.002Z"/>
      </svg>
      {/* Badge with count */}
      {count > 0 && (
        <span
          className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-medium text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export default Favorite;