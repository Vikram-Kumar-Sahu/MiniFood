import React from "react";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <div>
            <h2>{item.name}</h2>
            <p>₹{item.price} × </p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-16 border p-1"
            />
          </div>
          <p className="font-medium">₹{item.price * item.quantity}</p>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ₹{total}</div>
      <Link
        to="/summary"
        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
      >
        Proceed to Summary
      </Link>
    </div>
  );
}