import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search as GlobeSearch } from "lucide-react";
import { Mobile_header } from "../Mobile-header/Header_moblie";
import { Search_bar } from "../../Search-bar";
const Header = ({ isScrolled, toggleMobileMenu, isMobileMenuOpen }) => {
  const [searchVisible, setSearchVisible] = useState(false);

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
          <Search_bar
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
          />

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
