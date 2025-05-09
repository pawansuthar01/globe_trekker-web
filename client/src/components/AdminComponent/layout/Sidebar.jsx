import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Star,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  LucideHome,
  TableCellsMerge,
} from "lucide-react";
import { FcAbout } from "react-icons/fc";

const NavItem = ({ to, icon, label }) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={to}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
        pathname == to
          ? "bg-indigo-50 text-indigo-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};
const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 flex flex-col border-r border-gray-200 bg-white transform transition-transform duration-300 ease-in-out z-30">
      <div className="flex h-16 flex-shrink-0 items-center px-4">
        <h1 className="text-xl font-bold text-indigo-600">Travel Admin</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-4 pb-4">
        <nav className="mt-2 space-y-1 px-2">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
          <NavItem
            to="/admin/about"
            icon={<FcAbout size={20} />}
            label="About"
          />
          <NavItem
            to="/admin/about/team"
            icon={<TableCellsMerge size={20} />}
            label="Team Members"
          />
          <NavItem
            to="/admin/banners"
            icon={<LucideHome size={20} />}
            label="Banner"
          />
          <NavItem
            to="/admin/destinations"
            icon={<Map size={20} />}
            label="Destinations"
          />
          <NavItem
            to="/admin/highlights"
            icon={<Star size={20} />}
            label="Highlights"
          />
          <NavItem
            to="/admin/stories"
            icon={<BookOpen size={20} />}
            label="Stories"
          />
          <NavItem to="/admin/users" icon={<Users size={20} />} label="Users" />
          <NavItem
            to="/admin/contacts"
            icon={<MessageSquare size={20} />}
            label="Contacts"
          />
          <NavItem
            to="/admin/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
