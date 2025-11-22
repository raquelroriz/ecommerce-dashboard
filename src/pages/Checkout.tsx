import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";

type Address = {
  fullName: string;
  email: string;
  line1: string;
  city: string;
  zip: string;
};

type PaymentMethod = "card" | "pix" | "boleto";

export default function CheckoutPage() {
  const {user} = useAuth();
  const {items, subtotal, clear} = useCart();
  const navigate = useNavigate();

  // Prefill from auth
  const [addr, setAddr] = useState<Address>(() => ({
    fullName: user?.name || "",
    email: user?.email || "",
    line1: "",
    city: "",
    zip: "",
  }));
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState(""); // MM/YY
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    // If cart is empty, bounce back to cart
    if (items.length === 0) {
      navigate("/cart", {replace: true});
    }
  }, [items.length, navigate]);

  const total = useMemo(() => subtotal, [subtotal]);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!addr.fullName || !addr.email || !addr.line1 || !addr.city || !addr.zip) {
      setError("Please fill in all required fields.");
      return;
    }
    // Basic payment validation (UI-only)
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
    if (paymentMethod === "card") {
      const digits = cardNumber.replace(/\D/g, "");
      const expiryOk = /^\d{2}\/\d{2}$/.test(cardExpiry.trim());
      const cvcOk = /^\d{3,4}$/.test(cardCvc.trim());
      if (!cardName.trim() || digits.length < 13 || digits.length > 19 || !expiryOk || !cvcOk) {
        setError("Please provide a valid card holder, number, expiry (MM/YY) and CVC.");
        return;
      }
    }
    try {
      setPlacing(true);
      // Simula processamento do pedido
      await new Promise((r) => setTimeout(r, 800));
      const orderId = Math.floor(100000 + Math.random() * 900000);
      clear();
      navigate("/order-success", {
        replace: true,
        state: {orderId, total, paymentMethod},
      });
    } catch (err) {
      setError("Could not place the order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,320px]">
        {/* Form */}
        <form onSubmit={placeOrder} className="space-y-6 rounded-md border border-brand-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium" htmlFor="fullName">Full name</label>
              <input id="fullName" value={addr.fullName}
                     onChange={(e) => setAddr(a => ({...a, fullName: e.target.value}))}
                     className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium" htmlFor="email">Email</label>
              <input id="email" type="email" value={addr.email}
                     onChange={(e) => setAddr(a => ({...a, email: e.target.value}))}
                     className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium" htmlFor="line1">Address</label>
              <input id="line1" value={addr.line1} onChange={(e) => setAddr(a => ({...a, line1: e.target.value}))}
                     placeholder="Street, number"
                     className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"/>
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="city">City</label>
              <input id="city" value={addr.city} onChange={(e) => setAddr(a => ({...a, city: e.target.value}))}
                     className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"/>
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="zip">ZIP</label>
              <input id="zip" value={addr.zip} onChange={(e) => setAddr(a => ({...a, zip: e.target.value}))}
                     className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"/>
            </div>
          </div>

          {/* Payment */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Payment</legend>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span>Credit/Debit card</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium" htmlFor="cardName">Card holder name</label>
                  <input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as printed on card"
                    className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium" htmlFor="cardNumber">Card number</label>
                  <input
                    id="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium" htmlFor="cardExpiry">Expiry</label>
                  <input
                    id="cardExpiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium" htmlFor="cardCvc">CVC</label>
                  <input
                    id="cardCvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                    className="mt-1 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
              </div>
            )}
          </fieldset>

          {error && <p className="text-sm text-danger-600">{error}</p>}

          <button type="submit" disabled={placing || items.length === 0}
                  className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60">
            {placing ? "Placing order…" : `Place order ($ ${total.toFixed(2)})`}
          </button>
        </form>

        {/* Summary */}
        <aside className="rounded-md border border-brand-200 bg-white p-6">
          <h2 className="mb-3 text-base font-semibold">Order summary</h2>
          <ul className="divide-y divide-brand-100">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between py-2 text-sm">
                <span className="truncate mr-2">{it.name} × {it.qty}</span>
                <span>$ {(Number(it.priceUSD) * it.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t pt-3 font-medium">
            <span>Subtotal</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-sm text-neutral-700">
            <span className="font-medium">Payment:</span>{" "}
            {paymentMethod === "card" && "Credit/Debit card"}
            {paymentMethod === "pix" && "PIX"}
            {paymentMethod === "boleto" && "Boleto"}
          </div>
        </aside>
      </div>
    </div>
  );
}
