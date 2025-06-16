import React from "react";

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-[#FFBE00] text-white rounded-lg hover:bg-[#F4873B] transition ${className}`}
  >
    {children}
  </button>
);

export default Button;
