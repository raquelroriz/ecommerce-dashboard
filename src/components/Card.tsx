type CardProps = {
    name: string;
    priceEUR: number;
    image?: string;
    onMoreDetails?: () => void;
    onToggleFavorite?: () => void;
    isFavorite?: boolean; // novo: indica se este item está favoritado
    onAddToCart?: () => void; // novo: adicionar ao carrinho
};

function Card({name, priceEUR, image, onMoreDetails, onToggleFavorite, isFavorite, onAddToCart}: CardProps) {
    return (
        <article className="overflow-hidden rounded-lg border bg-white shadow-sm">
            {/* Quadrado do produto (imagem) */}
            <div className="aspect-square w-full bg-gray-100" aria-hidden>
                {/* Placeholder de imagem enquanto não temos real */}
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover"/>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">Image</div>
                )}
            </div>

            {/* Descrição */}
            <div className="space-y-1 p-3">
                <h3 className="line-clamp-2 text-sm font-medium">{name}</h3>
                <p className="text-base font-semibold">€ {priceEUR.toFixed(2)}</p>
            </div>

            {/* Ações */}
            <div className="mt-3 flex w-full items-center gap-2 px-3 pb-3">
                <button
                    className="rounded-full bg-blue-500 text-white px-3 py-1 text-sm hover:bg-blue-600"
                    onClick={onMoreDetails}
                >
                    More details
                </button>

                {/* Carrinho ícone*/}
                <button
                    type="button"
                    className="flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={onAddToCart}
                    aria-label="Adicionar ao carrinho"
                    title="Adicionar ao carrinho"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="h-5 w-5">
                        <path
                            d="M2.25 3a.75.75 0 0 0 0 1.5h1.386l.955 9.549A2.25 2.25 0 0 0 6.83 16.125h8.79a2.25 2.25 0  0 0 2.238-2.076l.66-7.425A.75.75 0  0 0 17.775 6H5.99l-.13-1.3A1.5 1.5 0  0 0 4.636 3H2.25Zm5.25 18a1.5 1.5 0  1 0 0-3 1.5 1.5 0  0 0 0 3Zm9-1.5a1.5 1.5 0  1 1-3 0 1.5 1.5 0  0 1 3 0Z"/>
                    </svg>
                </button>

                {/* Favorito ícone*/}
                <button
                    type="button"
                    aria-label="Favorites"
                    aria-pressed={!!isFavorite}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className={`ml-auto flex items-center justify-center rounded-full border px-3 py-2 text-sm hover:bg-gray-50 ${
                        isFavorite ? "border-rose-400 bg-rose-50" : "border-gray-300 bg-white"
                    }`}
                    onClick={onToggleFavorite}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className={`h-5 w-5 ${isFavorite ? "text-rose-600" : "text-rose-500"}`}>
                        <path
                            d="M11.645 20.91l-.007-.003-.022-.012a21.86 21.86 0  0 1-1.162-.682 25.18 25.18 0  0 1-4.063-3.02C3.454 14.584 1.5 12.272 1.5 9.75A5.25 5.25 0  0 1 6.75 4.5a5.22 5.22 0  0 1 3.75 1.59A5.22 5.22 0  0 1 14.25 4.5 5.25 5.25 0  0 1 19.5 9.75c0 2.523-1.955 4.834-4.891 7.444a25.18 25.18 0  0 1-4.063 3.02 21.86 21.86 0  0 1-1.162.682l-.022.012-.007.003-.003.002a.75.75 0  0 1-.682 0l-.003-.002Z"/>
                    </svg>
                </button>
            </div>
        </article>
    );
}

export default Card;
