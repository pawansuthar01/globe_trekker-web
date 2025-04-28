import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Search as GlobeSearch } from "lucide-react";
import { Mobile_header } from "../Mobile-header/Header_moblie";

const Header = ({ isScrolled, toggleMobileMenu, isMobileMenuOpen }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchVisible(false);
    }
  };

  return (
    <header
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <GlobeSearch className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-neutral-800">
            GLOBE TREKKER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-neutral-700 hover:text-primary-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/destinations"
            className="text-neutral-700 hover:text-primary-600 font-medium"
          >
            Destinations
          </Link>
          <Link
            to="/stories"
            className="text-neutral-700 hover:text-primary-600 font-medium"
          >
            Stories
          </Link>
          <Link
            to="/about"
            className="text-neutral-700 hover:text-primary-600 font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-neutral-700 hover:text-primary-600 font-medium"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {searchVisible ? (
            <form onSubmit={handleSearchSubmit} className="relative transform">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-100 rounded-full py-2 px-4 pl-10 outline-none w-[200px] focus:ring-2 focus:ring-primary-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <button
                type="button"
                onClick={() => setSearchVisible(false)}
                className="absolute right-3 top-2.5"
              >
                <X className="h-4 w-4 text-neutral-500" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchVisible(true)}
              className="p-2 rounded-full hover:bg-neutral-100"
            >
              <Search className="h-5 w-5 text-neutral-700" />
            </button>
          )}
          <div>
            <Mobile_header
              isClose={toggleMobileMenu}
              isOpen={isMobileMenuOpen}
            />
          </div>
          <button
            className="md:hidden p-2 rounded-full hover:bg-neutral-100"
            onClick={toggleMobileMenu}
          >
            {!isMobileMenuOpen && <Menu className="h-6 w-6 text-neutral-700" />}
          </button>

          <Link
            to="/login"
            className="hidden md:block bg-primary-600 text-white px-4 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
