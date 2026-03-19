import  { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {user ,isAuthenticated}= useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  // Close profile dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
  };

  return (
    <header className="bg-stone-50 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-teal-700 tracking-wide">
          GlowBlog
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-neutral-800">
          <Link to="/" className="hover:text-teal-500 transition duration-300">Home</Link>
          {isAuthenticated && user.role === 'admin' && (
            <Link to="/admin" className="hover:text-teal-500 transition duration-300">Admin Panel</Link>
          )}
          <Link to="/contact" className="hover:text-teal-500 transition duration-300">Contact</Link>

          {/* User Profile / Sign In */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-teal-400 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition duration-300"
              >
                <div className="w-6 h-6 bg-white text-teal-500 rounded-full flex items-center justify-center font-bold text-sm">
                  {user.name[0].toUpperCase()}
                </div>
                <span>{user.name}</span>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-xl py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition duration-200"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="bg-teal-400 text-white px-5 py-2 rounded-xl hover:bg-teal-600 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-800">
            {isOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-6 space-y-4 shadow-sm">
          <Link to="/" className="block text-neutral-800 hover:text-teal-500 transition">Home</Link>
          <Link to="/contact" className="block text-neutral-800 hover:text-teal-500 transition">Contact</Link>

          {user ? (
            <div className="space-y-2">
              <Link to="/profile" className="block px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="inline-block bg-teal-400 text-white px-5 py-2 rounded-xl hover:bg-teal-600 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;