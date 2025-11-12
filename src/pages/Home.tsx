import {useMemo} from "react";
import Card from "../components/Card.tsx";
import {useFavorites} from "../components/Favorite.tsx";

type Product = {
    id: number;
    name: string;
    priceEUR: number;
    image?: string; // opcional por enquanto, usamos um placeholder
};

const demoProducts: Product[] = [
    {id: 1, name: "Shampoo Nutritivo", priceEUR: 12.9},
    {id: 2, name: "Hidratante Facial", priceEUR: 18.5},
    {id: 3, name: "Base Cobertura Leve", priceEUR: 22.0},
    {id: 4, name: "Óleo para Unhas", priceEUR: 9.75},
    {id: 5, name: "Máscara Capilar", priceEUR: 16.4},
    {id: 6, name: "Sérum Antioxidante", priceEUR: 29.9},
];

function Home() {
    const {ids, has, toggle, showOnlyFavorites} = useFavorites();

    // Lista derivada só com os produtos favoritados
    const favoriteProducts = useMemo(
        () => demoProducts.filter((p) => has(p.id)),
        [ids, has]
    );

    const productsToRender = showOnlyFavorites ? favoriteProducts : demoProducts;

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <h2 className="mb-4 text-lg font-semibold">{showOnlyFavorites ? "Favorites" : "Products"}</h2>

            {/* Grade principal */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {productsToRender.map((p) => (
                    <Card
                        key={p.id}
                        name={p.name}
                        priceEUR={p.priceEUR}
                        image={p.image}
                        onToggleFavorite={() => toggle(p.id)}
                        isFavorite={has(p.id)}
                    />
                ))}
            </div>

            {showOnlyFavorites && productsToRender.length === 0 && (
                <div className="mt-8 text-center text-sm text-gray-600">
                    No favorites yet. Click the heart icon next to each product to add it.
                </div>
            )}

        </div>
    )
}

export default Home

