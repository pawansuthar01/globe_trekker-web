import React from "react";

const PasswordStrengthIndicator = ({ strength }) => {
  // Determine color based on strength
  let color = "bg-red-500";
  let label = "Weak";

  if (strength >= 80) {
    color = "bg-green-500";
    label = "Strong";
  } else if (strength >= 50) {
    color = "bg-yellow-500";
    label = "Moderate";
  } else if (strength >= 30) {
    color = "bg-orange-500";
    label = "Fair";
  }

  // Determine width based on strength
  const width = `${Math.max(5, strength)}%`;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">Password strength</span>
        <span
          className={`text-xs font-medium ${
            strength >= 80
              ? "text-green-600"
              : strength >= 50
              ? "text-yellow-600"
              : strength >= 30
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {strength > 0 ? label : ""}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 ease-in-out rounded-full`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
