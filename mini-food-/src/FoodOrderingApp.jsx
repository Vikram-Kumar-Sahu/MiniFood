import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FoodMenu from "./pages/FoodMenu";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const FoodOrderingApp = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
  setCart([]);
};

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = () => {
    navigate("/summary");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cart={cart} />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <FoodMenu
                addToCart={addToCart}
                cart={cart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                totalPrice={totalPrice}
                handleSubmitOrder={handleSubmitOrder}
              />
            }
          />
          <Route
            path="/summary"
            element={<OrderSummary cart={cart} totalPrice={totalPrice} clearCart={clearCart} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default FoodOrderingApp;
