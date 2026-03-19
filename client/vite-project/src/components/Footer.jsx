import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-stone-50 text-neutral-800 mt-20 border-t border-gray-200">
      <div className="container mx-auto py-16 px-6 grid md:grid-cols-3 gap-12">

        {/* About */}
        <div>
          <h2 className="text-3xl font-semibold text-teal-700 mb-4 tracking-wide">
            GlowBlog
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Your daily dose of skincare tips, ingredient insights, and beauty inspiration.
            Helping you glow naturally 🌿
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-teal-700">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="text-gray-500 hover:text-teal-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-500 hover:text-teal-500 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-teal-700">
            Stay Connected
          </h3>

          <div className="flex space-x-4 mb-6 text-gray-500">
            <a href="#" className="hover:text-teal-500 transition duration-300 text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-teal-500 transition duration-300 text-lg">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-teal-500 transition duration-300 text-lg">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-teal-500 transition duration-300 text-lg">
              <FaPinterest />
            </a>
          </div>

          <p className="text-gray-500 mb-3">
            Subscribe to our newsletter
          </p>

          <form className="flex bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 focus:outline-none text-sm text-neutral-800"
            />
            <button className="bg-teal-400 text-white px-6 hover:bg-teal-600 transition duration-300 text-sm font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GlowBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;