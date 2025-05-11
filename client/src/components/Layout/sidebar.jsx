import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Map,
  BookOpen,
  Compass,
  MessageSquare,
  User,
  Search,
  LogIn,
  FanIcon,
  PenLine,
} from "lucide-react";
import { useSelector } from "react-redux";

const SidebarNav = ({ expanded, onMouseEnter, onMouseLeave }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((state) => state?.auth);
  const navItems = [
    { icon: <Home size={24} />, label: "Home", path: "/" },
    { icon: <Map size={24} />, label: "Destinations", path: "/destinations" },
    { icon: <BookOpen size={24} />, label: "Stories", path: "/stories" },
    { icon: <Compass size={24} />, label: "About", path: "/about" },
    { icon: <MessageSquare size={24} />, label: "Contact", path: "/contact" },
    isLoggedIn
      ? { icon: <User size={20} />, label: "Profile", path: "/profile" }
      : { icon: <LogIn size={20} />, label: "Login", path: "/login" },
    isLoggedIn &&
      (role === "ADMIN" || role === "AUTHOR") && {
        icon: <PenLine size={20} />,
        label: "Admin Dashboard",
        path: "/admin",
      },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white shadow-lg z-30 transition-all duration-300 ease-in-out
        ${expanded ? "w-64" : "w-[72px]"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Logo */}
      <div className="flex items-center h-20 px-4">
        <div className="flex items-center space-x-3">
          <Search className="h-8 w-8 text-primary-600" />
          <span
            className={`text-xl font-bold text-neutral-800 transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            GLOBE TREKKER
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-8">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full rounded-xl px-4 py-3 transition-all duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-primary-50 text-primary-600"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  className={`ml-4 font-medium whitespace-nowrap transition-all duration-300
                    ${
                      expanded
                        ? "opacity-100 max-w-full"
                        : "opacity-0 max-w-0 overflow-hidden"
                    }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
