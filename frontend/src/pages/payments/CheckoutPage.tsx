import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";

export const handlePaymentStay = async () => {
  const res = await fetch(
    "http://localhost:5001/api/payments/create-checkout-session-stay",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stayId: "69dea3ac4ec6c5f456ee0e3a",
      }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data.url) {
    console.error("Payment error:", data);
    return;
  }

  window.location.href = data.url;
};

export const handlePaymentRoomres = async () => {
  const res = await fetch(
    "http://localhost:5001/api/payments/create-checkout-session-roomres",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomresId: "69de9037b3aa07fcb32ae4c1",
      }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data.url) {
    console.error("Payment error:", data);
    return;
  }

  window.location.href = data.url;
};

export const handlePaymentAmres = async () => {
  const res = await fetch(
    "http://localhost:5001/api/payments/create-checkout-session-amres",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amresId: "69d36dd78c432b53ef7b89b5",
      }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data.url) {
    console.error("Payment error:", data);
    return;
  }

  window.location.href = data.url;
};

const CheckoutPage = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const { state } = useLocation();
  const stay = state?.stay;
  const roomres = state?.roomres;
  const amres = state?.amres;

  if (stay) console.log(stay);
  if (roomres) console.log(roomres);
  if (amres) console.log(amres);

  return (
    <>
      <button className="mx-4" onClick={handlePaymentStay}>
        click me stay
      </button>
      <button className="mx-4" onClick={handlePaymentRoomres}>
        click me roomres
      </button>
      <button className="mx-4" onClick={handlePaymentAmres}>
        click me amres
      </button>
    </>
  );
};

export default CheckoutPage;
