import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Map, BookOpen, Compass, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Map size={20} />, label: "Explore", path: "/destinations" },
    { icon: <BookOpen size={20} />, label: "Stories", path: "/stories" },
    { icon: <Compass size={20} />, label: "About", path: "/about" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] py-2 px-4">
      <ul className="flex justify-between items-center">
        {navItems.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center px-3 py-2"
            >
              <div
                className={`mb-1 p-1 rounded-full transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary-600"
                    : "text-neutral-500"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary-600"
                    : "text-neutral-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
