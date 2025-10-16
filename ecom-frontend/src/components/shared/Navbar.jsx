import { useState, useEffect, useCallback, memo } from "react";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaStore,
  FaBell,
  FaHeart,
  FaGithub
} from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

const Navbar = memo(() => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { cart } = useSelector((state) => state.carts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const githubLink = "https://github.com/yourusername/your-repo";
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "h-16 bg-gray-900/80 backdrop-blur-lg shadow-md border-b border-gray-800/40"
          : "h-20 bg-transparent"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group transition-transform duration-300 hover:scale-105"
        >
          <FaStore className="mr-2 text-3xl text-blue-400 group-hover:text-blue-300" />
          <span className="font-montserrat bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-2xl font-extrabold tracking-wider">
            InstaMart
          </span>
        </Link>

        {/* Desktop Navigation (Stylized) */}
        <nav className="hidden lg:flex flex-1 justify-center items-center space-x-8">
          {[
            { name: "Home", to: "/" },
            { name: "Products", to: "/products" },
            { name: "About", to: "/about" },
            { name: "Contact", to: "/contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative group text-sm font-semibold uppercase tracking-wide transition-all duration-300
              ${
                path === link.to
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  : "text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-400 hover:to-pink-400"
              }`}
            >
              {link.name}
              {/* Animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300
                ${
                  path === link.to
                    ? "w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    : "w-0 group-hover:w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-full hover:bg-gray-800/50 transition-all">
            <FaBell className="text-lg text-gray-300 hover:text-white" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                {notifications}
              </span>
            )}
          </button>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-gray-800/50 transition-all"
            title="View on GitHub"
          >
            <FaGithub className="text-lg text-gray-300 hover:text-white transition-colors" />
          </a>
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="p-2.5 rounded-full hover:bg-gray-800/50 transition-all"
          >
            <FaHeart className="text-lg text-gray-300 hover:text-white" />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-gray-800/50 transition-all"
          >
            <FaShoppingCart className="text-lg text-gray-300 hover:text-white" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Login / User */}
          {isAuthenticated && user ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:opacity-90 transition-all"
            >
              <FaSignInAlt className="inline mr-2" /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/30 transition-all"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-xl" />
          ) : (
            <IoIosMenu className="text-white text-xl" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 z-50 ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setNavbarOpen(false)}
            className="p-2 rounded-full hover:bg-gray-800 transition-all"
          >
            <RxCross2 className="text-white text-xl" />
          </button>
        </div>

        {/* Stylized Mobile Links */}
        <div className="flex flex-col space-y-3 px-6 mt-4">
          {[
            { name: "Home", to: "/" },
            { name: "Products", to: "/products" },
            { name: "About", to: "/about" },
            { name: "Contact", to: "/contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setNavbarOpen(false)}
              className={`relative px-4 py-3 rounded-lg text-lg font-semibold uppercase tracking-wide transition-all
              ${
                path === link.to
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 border border-blue-500/40 shadow-md"
                  : "text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 hover:border hover:border-blue-500/30 hover:shadow-md"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700/50"></div>

        {/* Actions */}
        <div className="flex flex-col px-6 space-y-3">
          <Link
            to="/wishlist"
            onClick={() => setNavbarOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all"
          >
            Wishlist <FaHeart />
          </Link>
          <Link
            to="/cart"
            onClick={() => setNavbarOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all relative"
          >
            Cart <FaShoppingCart />
            {cart?.length > 0 && (
              <span className="absolute right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <Link
            to="/alerts"
            onClick={() => setNavbarOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all"
          >
            Notifications <FaBell />
          </Link>

          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setNavbarOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all"
          >
            GitHub <FaGithub />
          </a>
        </div>


        {/* Divider */}
        <div className="my-6 border-t border-gray-700/50"></div>

        {/* Auth */}
        <div className="px-6 mb-6">
          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setNavbarOpen(false)}
              className="block text-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:opacity-90 transition-all"
            >
              <FaSignInAlt className="inline mr-2" /> Login
            </Link>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
