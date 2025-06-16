import React, { useState } from "react";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const OrderSummary = ({ cart, totalPrice, clearCart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Submit to Firestore
      await addDoc(collection(db, "orders"), {
        items: cart,
        total: Number(totalPrice),
        createdAt: Timestamp.now(),
      });

      // ✅ Clear the cart
      clearCart();

      // Show success toast
      toast.success("🎉 Order submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Optional: Redirect to thank-you page if needed
      // navigate("/thank-you");
    } catch (error) {
      console.error("Error placing order: ", error);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 relative">
      <ToastContainer />

      <h2 className="text-3xl font-bold text-gray-800 text-center border-b pb-4">
        Order Summary
      </h2>

      {cart.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">No items in the cart.</div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2 text-gray-700"
            >
              <div className="text-left font-medium">{item.name}</div>
              <div className="text-right">
                {item.quantity} × ${Number(item.price).toFixed(2)} ={" "}
                <span className="font-semibold text-gray-900">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-right text-xl font-semibold text-green-600 border-t pt-4">
        Total: ${Number(totalPrice).toFixed(2)}
      </div>

      <div className="text-center">
        <Button
          className="w-full mt-6 py-3 text-lg font-medium rounded-xl bg-green-600 hover:bg-green-700 text-white shadow flex justify-center items-center"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ClipLoader size={24} color="#fff" /> : "Submit Order"}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
