import {useEffect, useMemo, useState} from "react";
import {useCart} from "../context/CartContext.tsx";
import {useFavorites} from "../context/FavoriteContext.tsx";
import {Link, useNavigate} from "react-router-dom";

export default function ShoppingCart() {
  const {items, increment, decrement, removeAll, clear, subtotal} = useCart();
  const {setOnlyFavorites} = useFavorites();
  const FALLBACK_IMG = "https://placehold.co/200x200?text=No+Image";
  const navigate = useNavigate();

  // Selecting items in the cart (local state of this page only)
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // When you go to the shopping cart page, make sure the favorites filter is not active.
  useEffect(() => {
    setOnlyFavorites(false);
  }, [setOnlyFavorites]);

  // Keeps the selection consistent when the items in your cart change.
  useEffect(() => {
    setSelected(prev => {
      const next = new Set<number>();
      const ids = new Set(items.map(i => i.id));
      // Keeps selected only the items that are still in the cart.
      prev.forEach(id => {
        if (ids.has(id)) next.add(id);
      });
      return next;
    });
  }, [items]);

  const allSelected = items.length > 0 && selected.size === items.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleOne = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map(i => i.id)));
    }
  };

  const selectedCount = selected.size;
  const selectedSubtotal = useMemo(() => {
    return items
      .filter(i => selected.has(i.id))
      .reduce((acc, it) => acc + (Number(it.priceUSD) || 0) * (Number.isFinite(it.qty) ? it.qty : 0), 0);
  }, [items, selected]);

  // The subtotal shown in the footer should reflect the selection when items are selected.
  const displayedSubtotal = selectedCount > 0 ? selectedSubtotal : subtotal;

  const handlePurchase = () => {
    // Redirects to the secure checkout (RequireAuth will handle login)
    navigate("/checkout");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">My shopping cart</h1>

      {items.length === 0 ? (
        <div className="rounded-md border bg-white p-6 text-center">
          <p className="text-neutral-700">Your shopping cart is empty.</p>
          <Link to="/" className="mt-4 inline-block rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Selection toolbar + purchase action */}
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                aria-checked={allSelected ? true : someSelected ? "mixed" : false}
              />
              <span>Select all</span>
              {selectedCount > 0 && (
                <span className="ml-1 text-neutral-500">({selectedCount} selected)</span>
              )}
            </label>

            <div className="flex items-center gap-3">
              {/* Subtotal of those selected as visual feedback */}
              <div className="text-sm text-neutral-700">
                Selected subtotal: $ {selectedSubtotal.toFixed(2)}
              </div>
              <button
                type="button"
                onClick={handlePurchase}
                disabled={selectedCount === 0}
                className={`rounded-md px-4 py-2 text-white ${selectedCount === 0 ? "bg-brand-300 cursor-not-allowed" : "bg-brand-600 hover:bg-brand-700"}`}
                title={selectedCount === 0 ? "Select items to purchase" : "Buy Now"}
              >
                Buy Now
              </button>
            </div>
          </div>

          <ul className="divide-y divide-brand-100 rounded-md border border-brand-200 bg-white">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                {/* Selection checkbox by item */}
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selected.has(item.id)}
                  onChange={() => toggleOne(item.id)}
                  aria-label={`Select ${item.name}`}
                />

                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-neutral-100 sm:h-16 sm:w-16">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG;
                      }}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div
                  className="flex w-full flex-col gap-3 sm:flex-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-neutral-600">$ {Number(item.priceUSD ?? 0).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded border border-brand-200 px-2 py-1 hover:bg-brand-50"
                      onClick={() => decrement(item.id)}
                      aria-label="Decrease"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      className="rounded border border-brand-200 px-2 py-1 hover:bg-brand-50"
                      onClick={() => increment(item.id)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                    <button
                      className="ml-3 text-sm text-danger-600 hover:text-danger-700"
                      onClick={() => removeAll(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <button className="text-sm text-danger-600 hover:text-danger-700" onClick={clear}>Empty shopping cart
            </button>
            <div className="text-lg font-semibold">Subtotal: $ {displayedSubtotal.toFixed(2)}</div>
          </div>
        </>
      )}
    </div>
  );
}
