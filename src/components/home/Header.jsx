"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {
  Search,
  User,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
    //[OKS] handle logout
      const handleLogout = () => {
        localStorage.removeItem("access_token");
        setUser(null); 
        navigate("/login");
   };  

  useEffect(() => {
    // [OKS] Check if user is logged in
      const token = localStorage.getItem("access_token");
      if (token) {
        setUser({ token }); 
      } else {
        setUser(null);
      }

    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(".relative")) {
        setShowUserDropdown(false);
      }
    };
    


    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown]);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>info@webmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>18/A, Nest Tower, NYC</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-xl">+</div>
            </div>
            <span className="text-2xl font-bold text-gray-800">Vicodin</span>
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-2 text-gray-600">
            <Phone className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs text-gray-500">PHONE</div>
              <div className="font-semibold">+0123-456-789</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* User Actions with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-4"
            >
              {/* Cart and User */}
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-emerald-600" />
                <div className="relative">
                  {/* <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-emerald-600" />
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span> */}
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              {/* User Info */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-gray-700">
                    {user ? "Welcome Back!" : "Guest"}
                  </span>
                </div>
              </div>

              {/* Show Logout if logged in */}
              {user ? (
                <div className="p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="py-2">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                  >
                    Register
                  </Link>
                </div>
              )}

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+123-456-789-10</span>
                </div>
              </div>
            </div>
          )}

          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 py-4 md:py-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 md:py-4 text-white hover:text-emerald-200 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="login"
                  className="block py-2 md:py-4 text-white hover:text-emerald-200 font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to="/login"
                  className="block py-2 md:py-4 text-white hover:text-emerald-200 font-medium"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 md:py-4 text-white hover:text-emerald-200 font-medium"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 md:py-4 text-white hover:text-emerald-200 font-medium"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 md:py-4 text-white hover:text-emerald-200 font-medium"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
