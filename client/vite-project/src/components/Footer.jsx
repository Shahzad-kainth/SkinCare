import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-gray-700 mt-12">
      <div className="container mx-auto py-12 px-6 grid md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600 mb-4">GlowBlog</h2>
          <p className="text-gray-600">
            Your daily dose of skincare tips, product reviews, and beauty inspiration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-pink-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-pink-500 transition">Blog</Link>
            </li>
            {/* Add more links if needed */}
            <li>
              <Link to="/" className="hover:text-pink-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-pink-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaPinterest /></a>
          </div>
          <p className="text-gray-600 mb-2">Subscribe to our newsletter:</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l border border-pink-200 focus:outline-none"
            />
            <button className="bg-pink-500 text-white px-4 rounded-r hover:bg-pink-600 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-pink-200 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GlowBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
