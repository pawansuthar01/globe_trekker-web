import React, { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import PasswordInput from "./passwordInput";
import PasswordStrengthIndicator from "./passwordStrenth";

const PasswordForm = ({
  password,
  setPassword,
  errors,
  setErrors,
  resetSuccess,

  setConfirmPassword,
  isSubmitting,

  confirmPassword,
  handleSubmit,
  passwordStrength,
  canSubmit,
}) => {
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Clear errors when user types
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };
  if (errors.message) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full p-3">
            <X className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-800">
          Invalid or Expired Token
        </h2>
        <p className="text-gray-500">
          Your password could not be updated because the token is either invalid
          or has expired.
        </p>
        <a
          href="/email/reset-password"
          className="block w-full mt-6 bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Try Again
        </a>
      </div>
    );
  }
  if (resetSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-800">
          Password Reset Successfully
        </h2>
        <p className="text-gray-500">
          Your password has been updated. You can now log in with your new
          password.
        </p>
        <a
          href="/login"
          className="block w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Return to Login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.server && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{errors.server}</p>
        </div>
      )}

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <PasswordInput
          id="password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        <PasswordStrengthIndicator strength={passwordStrength} />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}
        {password && !errors.password && (
          <p className="text-sm text-gray-500 mt-1">
            {passwordStrength < 50
              ? "Try adding numbers, symbols, and varying character types"
              : "Strong password"}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${
          canSubmit && !isSubmitting
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\"
              xmlns="http://www.w3.org/2000/svg\"
              fill="none\"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25\"
                cx="12\"
                cy="12\"
                r="10\"
                stroke="currentColor\"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Resetting Password...
          </span>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
};

export default PasswordForm;
