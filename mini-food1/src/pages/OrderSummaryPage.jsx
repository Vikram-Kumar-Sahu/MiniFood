import React from "react";
import { useCart } from "../context/cartContext";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function OrderSummaryPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        total,
        createdAt: new Date(),
      });
      alert("Order submitted successfully!");
    } catch (e) {
      alert("Failed to submit order: " + e.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <p>{item.name} × {item.quantity}</p>
          <p>₹{item.price * item.quantity}</p>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ₹{total}</div>
      <button
        onClick={submitOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Order
      </button>
    </div>
  );
}