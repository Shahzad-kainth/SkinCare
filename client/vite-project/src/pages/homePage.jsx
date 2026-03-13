import  { useEffect, useState } from "react";
import BlogCard from "../components/blogHomepageCard";
import { fetchAllBlogs,resetBlogs,setSearch } from "../features/blogsSlice";
import { useSelector,useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi"; 
const HomePage = () => {
  const dispatch=useDispatch()
  const {blogs,loading,search,nextCursor,hasMore}=useSelector((state)=>state.blogs)
  const limit = 10;

  useEffect(() => {
    dispatch(resetBlogs());
    dispatch(fetchAllBlogs({limit, cursor: null, search }))
  }, [dispatch,search]);
 
 const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchAllBlogs({ limit, cursor: nextCursor, search }));
    }
  };
 return (
  <div className="max-w-6xl mx-auto py-12 px-6">
    {/* Search Bar */}
    <div className="flex justify-center mb-12">
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
          className="w-full px-4 py-3 pl-12 rounded-full border border-emerald-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-gray-700 placeholder-gray-400 transition"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>

    {/* Blogs Grid */}
    {blogs.length === 0 && loading ? (
      <p className="text-center text-gray-500">Loading blogs...</p>
    ) : blogs.length === 0 ? (
      <p className="text-center text-gray-500">No blogs found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    )}

    {/* Load More Button */}
    {hasMore && (
      <div className="flex justify-center mt-12">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-3 rounded-full border border-emerald-200 bg-white hover:bg-emerald-200 disabled:opacity-50 transition"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    )}
  </div>
);
};

export default HomePage;
