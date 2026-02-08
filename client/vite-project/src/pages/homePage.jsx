import React, { useEffect, useState } from "react";
import BlogCard from "../components/blogHomepageCard";
import { getAllBlogs } from "../api/blogapis";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs(page, limit, search);
      if (response.data.success) {
        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  return (
    <>
      
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8 text-pink-600 text-center">
          Latest Skincare Blogs
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full p-3 pl-10 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            />
            <span className="absolute left-3 top-3 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-3">
            {/* Prev Button */}
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 disabled:opacity-50 transition"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-4 py-2 rounded-full transition ${
                    page === num
                      ? "bg-pink-500 text-white"
                      : "bg-pink-100 hover:bg-pink-200"
                  }`}
                >
                  {num}
                </button>
              )
            )}

            {/* Next Button */}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
