import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, User, X } from "lucide-react";

const TopBar = ({ isScrolled }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-0 right-0 left-0 md:left-[72px] py-5 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-6">
        {/* Left side - Search & Title on Mobile */}
        <div className="flex items-center md:hidden">
          <Search className="h-5 w-5 text-primary-600 mr-2" />
          <span className="text-lg font-bold text-neutral-800">
            GLOBE TREKKER
          </span>
        </div>

        {/* Desktop Page Title - Hidden on Mobile */}
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-neutral-800">
            Explore the World
          </h1>
        </div>

        {/* Right side - User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          {searchVisible ? (
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
            >
              <X size={20} />
            </button>
          ) : (
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
            >
              <Search size={20} />
            </button>
          )}

          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary-600 rounded-full"></span>
          </button>

          {/* Profile - Hidden on Mobile */}
          <button
            onClick={() => navigate("/profile")}
            className="hidden md:block p-1 rounded-full hover:bg-neutral-100 text-neutral-600 border border-neutral-200"
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Search Input - Conditional */}
      {searchVisible && (
        <div className="p-4  animate-slideDown">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search destinations, stories..."
              className="w-full px-10 py-2 bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
