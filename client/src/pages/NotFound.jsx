import { ArrowRight, Compass } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <Compass className="text-blue-900 w-24 h-24 animate-[spin_10s_linear_infinite]" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you've ventured off the beaten path! Let's get you back to
          exploring amazing destinations.
        </p>
        <a
          href="/"
          className="inline-flex items-center bg-blue-900 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors"
        >
          Return Home
          <ArrowRight className="ml-2" size={18} />
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
