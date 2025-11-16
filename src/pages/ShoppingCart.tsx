import {useCart} from "../components/CartContext.tsx";
import {Link} from "react-router-dom";

export default function ShoppingCart() {
  const {items, increment, decrement, removeAll, clear, subtotal} = useCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">My shopping cart</h1>

      {items.length === 0 ? (
        <div className="rounded-md border bg-white p-6 text-center">
          <p className="text-gray-700">Your shopping cart is empty.</p>
          <Link to="/" className="mt-4 inline-block rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y rounded-md border bg-white">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 p-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover"/>
                  ) : null}
                </div>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">€ {item.priceEUR.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded border px-2 py-1"
                      onClick={() => decrement(item.id)}
                      aria-label="Diminuir"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      className="rounded border px-2 py-1"
                      onClick={() => increment(item.id)}
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                    <button
                      className="ml-3 text-sm text-rose-600 hover:underline"
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
            <button className="text-sm text-gray-600 hover:underline" onClick={clear}>Empty shopping cart</button>
            <div className="text-lg font-semibold">Subtotal: € {subtotal.toFixed(2)}</div>
          </div>
        </>
      )}
    </div>
  );
}
