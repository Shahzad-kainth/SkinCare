import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F8F6F2] text-[#2E2E2E] mt-20 border-t border-[#E5E7EB]">
      <div className="container mx-auto py-16 px-6 grid md:grid-cols-3 gap-12">
        
        {/* About */}
        <div>
          <h2 className="text-3xl font-semibold text-[#4F7C73] mb-4 tracking-wide">
            GlowBlog
          </h2>
          <p className="text-[#6B7280] leading-relaxed">
            Your daily dose of skincare tips, ingredient insights, and beauty inspiration.
            Helping you glow naturally 🌿
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#4F7C73]">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="text-[#6B7280] hover:text-[#7FAE9E] transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-[#6B7280] hover:text-[#7FAE9E] transition duration-300"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-[#6B7280] hover:text-[#7FAE9E] transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#4F7C73]">
            Stay Connected
          </h3>

          <div className="flex space-x-4 mb-6 text-[#6B7280]">
            <a href="#" className="hover:text-[#7FAE9E] transition duration-300 text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#7FAE9E] transition duration-300 text-lg">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#7FAE9E] transition duration-300 text-lg">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#7FAE9E] transition duration-300 text-lg">
              <FaPinterest />
            </a>
          </div>

          <p className="text-[#6B7280] mb-3">
            Subscribe to our newsletter
          </p>

          <form className="flex bg-white rounded-xl shadow-sm overflow-hidden border border-[#E5E7EB]">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 focus:outline-none text-sm"
            />
            <button className="bg-[#7FAE9E] text-white px-6 hover:bg-[#4F7C73] transition duration-300 text-sm font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#E5E7EB] text-center py-6 text-sm text-[#6B7280]">
        &copy; {new Date().getFullYear()} GlowBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;