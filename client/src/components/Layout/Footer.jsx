import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Search as GlobeSearch,
} from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8 lg:ml-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap     gap-8 mb-12">
          {/* <div className=  gap-8 mb-12"> */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <GlobeSearch className="h-7 w-7 text-white" />
              <span className="text-xl font-bold">GLOBE TREKKER</span>
            </Link>
            <p className="text-neutral-300 mb-6">
              Discover the world's hidden wonders with our expert travel guides
              and first-hand experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className=" flex justify-evenly  flex-col  max-sm:items-center max-sm:text-center gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 p-2 w-full ">
            <div className="">
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stories"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">
                Featured Destinations
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/destinations/europe"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Europe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations/asia"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Asia
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations/africa"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Africa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations/americas"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    The Americas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations/oceania"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Oceania
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">The Fine Print</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8">
          <p className="text-neutral-400 text-center">
            &copy; {new Date().getFullYear()} Globe Trekker. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
