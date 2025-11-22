import {useEffect, useMemo, useState} from "react";
import Card from "../components/Card.tsx";
import {useFavorites} from "../context/FavoriteContext.tsx";
import type {Category} from "../components/Header.tsx";
import {useCart} from "../context/CartContext.tsx";
import {useLocation} from "react-router-dom";
import type {Product} from "../types/product";
import {fetchAllCategories, fetchProductsByCategory} from "../api/products";

type HomeProps = {
  selectedCategory: Category;
  searchQuery: string;
};

function Home({selectedCategory, searchQuery}: HomeProps) {
  const {has, toggle, showOnlyFavorites, setOnlyFavorites} = useFavorites();
  const {add} = useCart();
  const location = useLocation();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sempre que estivermos na Home ("/"), garantir que o filtro de favoritos esteja desligado
  useEffect(() => {
    if (location.pathname === "/") {
      setOnlyFavorites(false);
    }
  }, [location.pathname, setOnlyFavorites]);

  // Buscar da API conforme categoria / busca
  useEffect(() => {
    let cancelled = false;

    // util local para embaralhar os produtos quando for "all"
    function shuffle<T>(arr: T[]): T[] {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const q = searchQuery.trim() || undefined;
        const data = selectedCategory === 'all'
          ? await fetchAllCategories(q)
          : await fetchProductsByCategory(selectedCategory, q);
        // Filtra produtos sem imagem (não renderizar cards sem imagem)
        const withImages = data.filter(p => !!p.image);
        // Para a opção "All items", exibimos itens misturados (shuffle)
        const finalList = selectedCategory === 'all' ? shuffle(withImages) : withImages;
        if (!cancelled) setItems(finalList);
      } catch (e: any) {
        if (!cancelled) {
          setError('Failed to load products from API.');
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [selectedCategory, searchQuery]);

  const byCategory = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter(p => p.category === selectedCategory);
  }, [selectedCategory, items]);

  const bySearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCategory;

    // Mapeia palavras-chave de tipo para categorias
    const matchesCategory = (category: Product["category"], query: string) => {
      if (["eyes", "skin", "lips", "nails"].includes(query)) {
        return category === (query as Product["category"]);
      }
      // English-only keywords (Portuguese aliases removed to keep the app fully in English)
      return false;
    };

    return byCategory.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const typeMatch = matchesCategory(p.category, q);
      return nameMatch || typeMatch;
    });
  }, [byCategory, searchQuery]);

  // Lista derivada só com os produtos favoritados
  const favoriteProducts = useMemo(
    () => bySearch.filter((p) => has(p.id)),
    [bySearch, has]
  );

  const productsToRender = showOnlyFavorites ? favoriteProducts : bySearch;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h2 className="mb-4 text-lg font-semibold">{showOnlyFavorites ? "Favorites" : "Products"}</h2>

      {loading && (
        <div className="mb-4 text-sm text-gray-600">Loading products...</div>
      )}
      {error && (
        <div className="mb-4 text-sm text-danger-600">{error}</div>
      )}

      {/* Grade principal */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {productsToRender.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            name={p.name}
            priceUSD={p.priceUSD}
            image={p.image}
            onToggleFavorite={() => toggle(p.id)}
            isFavorite={has(p.id)}
            onAddToCart={() => add({id: p.id, name: p.name, priceUSD: p.priceUSD, image: p.image}, 1)}
          />
        ))}
      </div>

      {productsToRender.length === 0 && (
        <div className="mt-8 text-center text-sm text-gray-600">
          {showOnlyFavorites
            ? 'No favorites found for this search/category.'
            : (searchQuery.trim() ? 'No products match your search.' : 'No products in this category yet.')}
        </div>
      )}

    </div>
  )
}

export default Home

