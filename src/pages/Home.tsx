import {useEffect, useMemo} from "react";
import Card from "../components/Card.tsx";
import {useFavorites} from "../components/Favorite.tsx";
import type {Category} from "../components/Header.tsx";
import { useCart } from "../components/CartContext.tsx";
import { useLocation } from "react-router-dom";
import type { Product } from "../data/products";
import { demoProducts } from "../data/products";

type HomeProps = {
  selectedCategory: Category;
  searchQuery: string;
};

function Home({selectedCategory, searchQuery}: HomeProps) {
  const {ids, has, toggle, showOnlyFavorites, setOnlyFavorites} = useFavorites();
  const { add } = useCart();
  const location = useLocation();

  // Sempre que estivermos na Home ("/"), garantir que o filtro de favoritos esteja desligado
  useEffect(() => {
    if (location.pathname === "/") {
      setOnlyFavorites(false);
    }
  }, [location.pathname, setOnlyFavorites]);

  const byCategory = useMemo(() => {
    if (selectedCategory === 'all') return demoProducts;
    return demoProducts.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const bySearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCategory;

    // Mapeia palavras-chave de tipo para categorias
    const matchesCategory = (category: Product["category"], query: string) => {
      if (["hair", "skin", "nails"].includes(query)) {
        return category === (query as Product["category"]);
      }
      // palavras em PT que indicam as categorias
      if (query === "cabelo") return category === "hair";
      if (query === "pele") return category === "skin";
      if (query === "unha" || query === "unhas") return category === "nails";
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
    [bySearch, ids, has]
  );

  const productsToRender = showOnlyFavorites ? favoriteProducts : bySearch;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h2 className="mb-4 text-lg font-semibold">{showOnlyFavorites ? "Favorites" : "Products"}</h2>

      {/* Grade principal */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {productsToRender.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            name={p.name}
            priceEUR={p.priceEUR}
            image={p.image}
            onToggleFavorite={() => toggle(p.id)}
            isFavorite={has(p.id)}
            onAddToCart={() => add({ id: p.id, name: p.name, priceEUR: p.priceEUR, image: p.image }, 1)}
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

