import React from "react";
import { Link } from "react-router-dom";
import {
  Twitter,
  Instagram,
  Search as GlobeSearch,
  MapPin,
  BookOpen,
  Home,
  User,
  icons,
} from "lucide-react";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/__pawan__suthar__",
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/pawankumar10/",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      url: "https://x.com/__Pawan__Kumar_",
    },
  ];

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-neutral-900 text-white pt-10 pb-32 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Logo and Intro */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <GlobeSearch className="h-7 w-7 text-white" />
                <span className="text-xl font-bold">GLOBE TREKKER</span>
              </Link>
              <p className="text-neutral-300 text-sm">
                Discover hidden wonders with our expert travel guides and
                stories.
              </p>
              <div className="flex mt-4 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-primary-400">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-primary-400">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/search?q=europe"
                    className="hover:text-primary-400"
                  >
                    Europe
                  </Link>
                </li>
                <li>
                  <Link to="/search?q=asia" className="hover:text-primary-400">
                    Asia
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=africa"
                    className="hover:text-primary-400"
                  >
                    Africa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=americas"
                    className="hover:text-primary-400"
                  >
                    Americas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=oceania"
                    className="hover:text-primary-400"
                  >
                    Oceania
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    target="_blank"
                    href="/privacy"
                    className="hover:text-primary-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="/terms"
                    className="hover:text-primary-400"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="/cookies"
                    className="hover:text-primary-400"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="/sitemap.xml"
                    className="hover:text-primary-400"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-neutral-400 text-sm border-t border-neutral-700 pt-4">
            &copy; {new Date().getFullYear()} Globe Trekker. All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
