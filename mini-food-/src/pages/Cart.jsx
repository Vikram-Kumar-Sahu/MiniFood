import React from "react";
import Button from "../components/Button";
import { MdDeleteOutline } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
const Cart = ({ cart, updateQuantity, totalPrice, handleSubmitOrder }) => (
  <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md space-y-6">
    <h2 className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 text-center border-b pb-4">
  Your Cart <TiShoppingCart />
</h2>

    {cart.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
    ) : (
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 w-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover shadow"
              />
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-sm">
                <MdDeleteOutline />
              </Button>
              <span className="text-base font-medium">{item.quantity}</span>
              <Button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-sm">
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    )}

    {cart.length > 0 && (
      <>
        <div className="text-right text-lg font-semibold text-gray-800 border-t pt-4">
          Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="text-center">
          <Button
            className="mt-4 w-full py-2 text-lg font-medium rounded-xl bg-green-600 hover:bg-green-700 text-white shadow"
            onClick={handleSubmitOrder}
          >
            Proceed to Summary
          </Button>
        </div>
      </>
    )}
  </div>
);

export default Cart;
