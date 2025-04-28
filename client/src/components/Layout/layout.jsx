import { useEffect, useState } from "react";
import Header from "./destop-header/Header_destop";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Mobile_header from "./Mobile-header/Header_moblie";

export const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handelScroll);
    return () => window.addEventListener("scroll", handelScroll);
  }, []);
  const handelMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        isScrolled={isScrolled}
        toggleMobileMenu={handelMobileMenu}
      />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
