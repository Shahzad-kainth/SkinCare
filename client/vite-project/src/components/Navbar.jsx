import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-pink-50 shadow-md">
      <div className="container mx-auto flex justify-evenly items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600 cursor-pointer">
          GlowBlog
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-pink-500 transition">Home</Link>
          <Link to='/blog' className="hover:text-pink-500 transition">Blog</Link>
          <Link to="/contact" className="hover:text-pink-500 transition">Contact</Link>
          {/* Add other links if needed */}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-50 px-6 py-4 space-y-2">
          <Link to="/" className="block hover:text-pink-500 transition">Home</Link>
          <Link to="/blog" className="block hover:text-pink-500 transition">Blog</Link>
          <Link to="/contact" className="block hover:text-pink-500 transition">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
