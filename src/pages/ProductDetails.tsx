import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Product} from "../types/product";
import {useCart} from "../context/CartContext.tsx";
import {useFavorites} from "../context/FavoriteContext.tsx";
import {fetchProductById} from "../api/products";

export default function ProductDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {add} = useCart();
  const {has, toggle} = useFavorites();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load product from API only; no local fallback
  useEffect(() => {
    let cancelled = false;

    async function run() {
      const num = Number(id);
      if (Number.isNaN(num)) {
        setProduct(undefined);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const p = await fetchProductById(num);
        if (!cancelled) setProduct(p);
      } catch (e) {
        if (!cancelled) {
          setError('Failed to load product from API.');
          setProduct(undefined);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-md border border-brand-200 bg-white p-6 text-sm text-neutral-700">Loading…</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-md border border-brand-200 bg-white p-6">
          <h1 className="mb-2 text-lg font-semibold">Product not found</h1>
          <p className="mb-4 text-sm text-neutral-700">
            We couldn't find a product with id "{id}".
          </p>
          {error && <div className="mb-4 text-sm text-danger-600">{error}</div>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md border border-brand-200 bg-white px-4 py-2 text-sm hover:bg-brand-50"
            >
              Back
            </button>
            <Link
              to="/"
              className="rounded-md bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFav = has(product.id);
  const FALLBACK_IMG = "https://placehold.co/800x800?text=No+Image";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Smaller image column on desktop */}
      <div className="grid grid-cols-1 gap-6 items-start md:grid-cols-[180px,1fr]">
        {/* Image */}
        <div className="overflow-hidden rounded-lg border bg-white w-40 sm:w-48 md:w-[180px] mx-auto md:mx-0">
          <div className="aspect-square w-full bg-neutral-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG;
                }}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="mt-1 text-sm text-neutral-600 capitalize">Category: {product.category}</div>
            <div className="mt-3 text-xl font-bold">$ {product.priceUSD.toFixed(2)}</div>
          </div>

          {/* Actions (icon-only) */}
          <div className="flex items-center gap-3">
            {/* Add to cart button (normal size) */}
            <button
              type="button"
              onClick={() => add({
                id: product.id,
                name: product.name,
                priceUSD: product.priceUSD,
                image: product.image
              }, 1)}
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
              aria-label="Add to cart"
              title="Add to cart"
            >
              {/* Cart icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                  d="M2.25 3a.75.75 0 0 0 0 1.5h1.386l.955 9.549A2.25 2.25 0 0 0 6.83 16.125h8.79a2.25 2.25 0 0 0 2.238-2.076l.66-7.425A.75.75 0  0 0 17.775 6H5.99l-.13-1.3A1.5 1.5 0  0 0 4.636 3H2.25Zm5.25 18a1.5 1.5 0  1 0 0-3 1.5 1.5 0  0 0 0 3Zm9-1.5a1.5 1.5 0  1 1-3 0 1.5 1.5 0  0 1 3 0Z"/>
              </svg>
            </button>

            {/* Favorite button (normal size) */}
            <button
              type="button"
              aria-pressed={isFav}
              onClick={() => toggle(product.id)}
              className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-200 ${isFav ? "border-rose-400 bg-rose-50 text-rose-700" : "border-brand-200 bg-white text-neutral-800"}`}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              {/* Heart icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   className={`h-5 w-5 ${isFav ? "text-rose-600" : "text-rose-500"}`}>
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a21.86 21.86 0  0 1-1.162-.682 25.18 25.18 0  0 1-4.063-3.02C3.454 14.584 1.5 12.272 1.5 9.75A5.25 5.25 0  0 1 6.75 4.5a5.22 5.22 0  0 1 3.75 1.59A5.22 5.22 0  0 1 14.25 4.5 5.25 5.25 0  0 1 19.5 9.75c0 2.523-1.955 4.834-4.891 7.444a25.18 25.18 0  0 1-4.063 3.02 21.86 21.86 0  0 1-1.162.682l-.022.012-.007.003-.003.002a.75.75 0  0 1-.682 0l-.003-.002Z"/>
              </svg>
            </button>
          </div>

          {/* Fake details */}
          <section className="rounded-md border border-brand-200 bg-white p-4">
            <h2 className="mb-2 text-base font-semibold">Description</h2>
            <p className="text-sm text-neutral-700">
              This is a wonderful product that provides excellent results as part of your daily routine. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Praesent posuere neque in felis fringilla, in laoreet augue
              dignissim.
            </p>
          </section>

          <section className="rounded-md border border-brand-200 bg-white p-4">
            <h2 className="mb-2 text-base font-semibold">Specifications</h2>
            <ul className="list-inside list-disc text-sm text-neutral-700">
              <li>Volume: 200 ml</li>
              <li>Dermatologically tested</li>
              <li>Suitable for daily use</li>
            </ul>
          </section>

          <section className="rounded-md border border-brand-200 bg-white p-4">
            <h2 className="mb-2 text-base font-semibold">Shipping & Returns</h2>
            <p className="text-sm text-neutral-700">
              Free shipping on orders over $50. Returns accepted within 30 days in original packaging.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
