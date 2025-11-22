import { Link, useLocation, useNavigate } from "react-router-dom";

type SuccessState = {
  orderId?: number;
  total?: number;
  paymentMethod?: "card" | "pix" | "boleto";
};

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as SuccessState;
  const orderId = state.orderId ?? undefined;
  const total = typeof state.total === "number" ? state.total : undefined;
  const paymentMethod = state.paymentMethod;

  // If navigated directly, bounce to home
  if (!orderId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="rounded-md border border-brand-200 bg-white p-6 text-center">
          <h1 className="mb-2 text-xl font-semibold">Order placed</h1>
          <p className="text-sm text-neutral-700">Your order has been placed successfully.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-md border border-brand-200 bg-white px-4 py-2 text-sm hover:bg-brand-50">Back</button>
            <Link to="/" className="rounded-md bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700">Continue shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="rounded-md border border-brand-200 bg-white p-6 text-center">
        <h1 className="mb-2 text-xl font-semibold">Thank you for your purchase!</h1>
        <p className="text-sm text-neutral-700">Order #{orderId} confirmed.</p>
        {typeof total === "number" && (
          <p className="mt-1 text-sm text-neutral-700">Total paid: $ {total.toFixed(2)}</p>
        )}
        {paymentMethod && (
          <p className="mt-1 text-sm text-neutral-700">
            Payment method: {paymentMethod === "card" ? "Credit/Debit card" : paymentMethod === "pix" ? "PIX" : "Boleto"}
          </p>
        )}
        <Link to="/" className="mt-6 inline-block rounded-md bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700">Continue shopping</Link>
      </div>
    </div>
  );
}
