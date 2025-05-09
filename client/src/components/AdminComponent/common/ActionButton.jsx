import React from "react";

const ActionButton = ({
  onClick,
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
