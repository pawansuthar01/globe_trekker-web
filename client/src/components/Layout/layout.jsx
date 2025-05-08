import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "./sidebar";
import TopBar from "./tolBar";
import BottomNav from "./bottomNav";
import Footer from "./Footer";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:block">
        <SidebarNav
          expanded={isSidebarExpanded}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 md:ml-[72px] ${
          isSidebarExpanded ? "md:ml-64" : "md:ml-[72px]"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Top Bar - Visible on All Devices */}
        <TopBar isScrolled={isScrolled} />

        {/* Main Content */}
        <main className="flex-grow pb-20 md:pb-0 pt-16 md:pt-20">
          <Outlet />
        </main>

        {/* Footer - Hidden on Mobile */}
        <div className="block">
          <Footer />
        </div>
      </div>

      {/* Mobile Bottom Navigation - Visible only on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
