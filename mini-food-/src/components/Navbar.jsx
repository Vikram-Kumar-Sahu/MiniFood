import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiIfood } from "react-icons/si";

const Navbar = ({ cart }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef();

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#FFBE00] text-white shadow-md z-50 relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl flex items-center gap-2 font-bold text-white">
  <SiIfood className="text-3xl" /> MiniFood
</Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-base font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/cart" className="hover:underline">Cart ({totalItems})</Link>
            <Link to="/summary" className="hover:underline">Summary</Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-4 right-4 bg-white text-black rounded-lg shadow-lg z-50 px-4 py-4 min-w-[200px] transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: "fit-content" }}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex flex-col space-y-3 text-base font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#FFBE00]">
            Home
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-[#FFBE00]">
            Cart ({totalItems})
          </Link>
          <Link to="/summary" onClick={() => setMenuOpen(false)} className="hover:text-[#FFBE00]">
            Summary
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
