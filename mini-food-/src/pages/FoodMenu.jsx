import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import Button from "../components/Button";
import { MdDeleteOutline } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const sliderImages = [
  "https://wallpapers.com/images/featured/food-4k-1pf6px6ryqfjtnyr.jpg",
  "https://wallpapers.com/images/high/food-4k-peec114e1yl8sh69.webp",
  "https://wallpapers.com/images/hd/food-4k-spdnpz7bhmx4kv2r.jpg",
];

const FoodMenu = ({ cart, addToCart, updateQuantity }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Fetch food items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foodItems")); // Use your actual collection name
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchItems();
  }, []);

  // Slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems = foodItems.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesCategory =
      selectedCategory === "all" ||
      item.name.toLowerCase() === selectedCategory;
    return matchesFilter && matchesCategory;
  });

  const getQuantity = (itemId) => {
    const itemInCart = cart.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return (
    <div className="p-6 grid gap-6">
      {/* Slider Section */}
      <div className="w-full md:h-100 overflow-hidden rounded-xl shadow-md">
        <img
          src={sliderImages[currentSlide]}
          alt="slider"
          className="w-full object-contain transition-all duration-500"
        />
      </div>

      {/* Category Circles */}
      <div className="flex overflow-x-auto md:flex-wrap md:justify-evenly gap-4 mb-6 px-2 py-3 no-scrollbar">
        {[
          {
            name: "All",
            image: "https://img.icons8.com/color/96/meal.png",
          },
          {
            name: "Pizza",
            image: "https://img.icons8.com/color/96/pizza.png",
          },
          {
            name: "Burger",
            image: "https://img.icons8.com/color/96/hamburger.png",
          },
          {
            name: "Sushi",
            image: "https://img.icons8.com/color/96/sushi.png",
          },
          {
            name: "Dessert",
            image: "https://img.icons8.com/color/96/cupcake.png",
          },
          {
            name: "Drinks",
            image: "https://img.icons8.com/color/96/cocktail.png",
          },
        ].map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name.toLowerCase())}
            className="flex flex-col items-center flex-shrink-0 w-[70px] sm:w-[80px]"
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${
                selectedCategory === cat.name.toLowerCase()
                  ? "bg-[#F4873B]"
                  : "bg-[#FFBE00]"
              } hover:bg-[#F4873B] shadow-md flex items-center justify-center transition duration-300`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <span className="text-[11px] sm:text-xs mt-1 font-medium text-gray-700">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Filter + Cart */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-3 items-center flex-wrap">
          <span className="font-medium">Filter:</span>
          {["all", "veg", "non-veg"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
                filter === type
                  ? "bg-[#F4873B] text-white border-[#F4873B]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type === "all" ? "All" : type === "veg" ? "Veg" : "Non-Veg"}
            </button>
          ))}
        </div>

        <Link to="/cart" className="relative">
          <Button>
            Go to Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Button>
        </Link>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-row md:flex-col sm:min-h-[100px] scale-100 hover:scale-105 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-l-2xl md:rounded-bl-none md:rounded-t-2xl w-1/3 md:w-full">
              <img
                src={item.image}
                alt={item.name}
                className="h-full rounded-3xl md:rounded-none sm:h-16 w-full object-cover md:h-48"
              />
            </div>
            <CardContent className="p-3 sm:p-2 space-y-1 w-2/3 md:w-full flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-sm font-bold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-[10px] text-gray-600 leading-tight line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm sm:text-xs font-bold text-green-600">
                  ${item.price ? Number(item.price).toFixed(2) : "0.00"}
                </span>
                {getQuantity(item.id) > 0 ? (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 text-lg font-bold"
                    >
                      <MdDeleteOutline />
                    </Button>
                    <span className="text-sm">{getQuantity(item.id)}</span>
                    <Button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 text-sm font-bold"
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1 text-xs sm:text-[10px]"
                  >
                    Add
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
