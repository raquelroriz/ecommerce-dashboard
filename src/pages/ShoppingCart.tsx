import {useEffect, useMemo, useState} from "react";
import {useCart} from "../components/CartContext.tsx";
import {Link} from "react-router-dom";

export default function ShoppingCart() {
  const {items, increment, decrement, removeAll, clear, subtotal} = useCart();

  // Seleção de itens no carrinho (apenas estado local desta página)
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // Mantém a seleção consistente quando os itens do carrinho mudam
  useEffect(() => {
    setSelected(prev => {
      const next = new Set<number>();
      const ids = new Set(items.map(i => i.id));
      // mantém selecionados apenas os que ainda existem no carrinho
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
    return items.filter(i => selected.has(i.id)).reduce((acc, it) => acc + it.priceEUR * it.qty, 0);
  }, [items, selected]);
  
  // Subtotal mostrado no rodapé deve refletir a seleção quando houver itens selecionados
  const displayedSubtotal = selectedCount > 0 ? selectedSubtotal : subtotal;

  const handlePurchase = () => {
    // Placeholder sem lógica real por enquanto
    // Futuro: enviar itens selecionados para checkout
    console.log("Make a purchase - selected items:", Array.from(selected.values()));
    alert(`Make a purchase of ${selectedCount} item(s).`);
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
          {/* Toolbar de seleção + ação de compra */}
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
              {/* Subtotal dos selecionados como feedback visual */}
              <div className="text-sm text-neutral-700">
                Selected subtotal: € {selectedSubtotal.toFixed(2)}
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
              <li key={item.id} className="flex items-center gap-4 p-4">
                {/* Checkbox de seleção por item */}
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selected.has(item.id)}
                  onChange={() => toggleOne(item.id)}
                  aria-label={`Selecionar ${item.name}`}
                />

                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-neutral-100">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover"/>
                  ) : null}
                </div>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-neutral-600">€ {item.priceEUR.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded border border-brand-200 px-2 py-1 hover:bg-brand-50"
                      onClick={() => decrement(item.id)}
                      aria-label="Diminuir"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      className="rounded border border-brand-200 px-2 py-1 hover:bg-brand-50"
                      onClick={() => increment(item.id)}
                      aria-label="Aumentar"
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

          <div className="mt-4 flex items-center justify-between">
            <button className="text-sm text-danger-600 hover:text-danger-700" onClick={clear}>Empty shopping cart</button>
            <div className="text-lg font-semibold">Subtotal: € {displayedSubtotal.toFixed(2)}</div>
          </div>
        </>
      )}
    </div>
  );
}
