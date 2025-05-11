import React from "react";

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-black",
};

const ButtonUI = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonUI;
