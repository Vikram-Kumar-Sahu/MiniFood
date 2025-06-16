# 🥗 Mini Food Ordering App

A responsive, single-page food ordering application built with **React.js** and **Firebase**. This app allows users to browse a food menu, add items to their cart, and place orders—all in a clean, modern UI.

---
## 🧰 Tech Stack

### **Frontend**
- **React.js** (Functional Components + Hooks)
- **React Router** – For navigation between views
- **Tailwind CSS** – Utility-first CSS for fast, responsive UI
- **React Icons** – For UI icons

### **Backend & Database**
- **Firebase Firestore** – Stores food menu items and user data
- **Firebase Authentication** – Manages email/password user sign-up and sign-in

### **Other Libraries**
- **Firebase SDK** – For integrating Firebase services
- **React Context (optional)** – For global state management (auth, Firebase, cart)

---

## 📲 Features

### 🍽️ **Food Menu**
- Fetches food items from Firestore
- Filter items by:
  - Type: Veg / Non-Veg
  - Category: Pizza, Burger, Sushi, etc.
- Each food card displays:
  - Image, Name, Description, Price
  - Add to Cart / Quantity controls (+ / -)

### 🛒 **Shopping Cart**
- Cart state is shared across the app
- View, increase, decrease, or remove items
- Automatically calculates the total price
- Proceed to **Order Summary**

### 📋 **Order Summary**
- Displays an overview of selected items and total amount before placing the order

### 🌐 **Navigation**
- Navigation handled with **React Router**
- Consistent **Navbar** and **Footer** across all pages

---

## 💡 Why This Stack?

- **React.js**: Component-driven architecture for scalable UIs
- **Firebase**: Serverless backend with real-time data sync, auth, and storage
- **Tailwind CSS**: Rapid development with responsive design out of the box
- **SPA Navigation**: Seamless user experience with React Router

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vikram-Kumar-Sahu/MiniFood.git
   cd MiniFood
