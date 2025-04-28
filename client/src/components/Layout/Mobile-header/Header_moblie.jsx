import { BookOpen, Compass, Home, Map, User, X } from "lucide-react";
import { useEffect, useRef } from "react";

export const Mobile_header = ({ isOpen, isClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handelMouseClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        isClose();
      }
    };
    document.addEventListener("mousedown", handelMouseClick);
    return () => {
      document.removeEventListener("mousedown", handelMouseClick);
    };
  }, [isClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={ref}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 z-40 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0   h-full max-w-64 bg-white shadow-lg z-50 transform   transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Globe Trekker</h2>
            <button
              onClick={isClose}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <NavItem icon={<Home size={20} />} label="Home" active />
              <NavItem icon={<Map size={20} />} label="Destinations" />
              <NavItem icon={<Compass size={20} />} label="Explore" />
              <NavItem icon={<BookOpen size={20} />} label="Stories" />
              <NavItem icon={<User size={20} />} label="Profile" />
            </ul>

            <div className="mt-8 border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Top Destinations
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="block px-2 py-1.5 text-sm hover:text-amber-600 transition-colors"
                  >
                    Golden Bridge, Da Nang
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-2 py-1.5 text-sm hover:text-amber-600 transition-colors"
                  >
                    Cappadocia, Turkey
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-2 py-1.5 text-sm hover:text-amber-600 transition-colors"
                  >
                    Santorini, Greece
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-2 py-1.5 text-sm hover:text-amber-600 transition-colors"
                  >
                    Machu Picchu, Peru
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
              Sign Up
            </button>
            <div className="mt-2 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="#" className="text-amber-600 hover:underline">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const NavItem = ({ icon, label, active }) => {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          active ? "bg-amber-50 text-amber-600" : "hover:bg-gray-100"
        }`}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
};
export default NavItem;
