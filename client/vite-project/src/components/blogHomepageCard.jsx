import React from "react";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Optional Blog Image */}
      {blog.image ? (
        <div className="h-48 w-full overflow-hidden rounded-t-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transform transition duration-500"
          />
        </div>
      ) : null}

      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        {blog.category && (
          <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {blog.category}
          </span>
        )}

        {/* Blog Title */}
        <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-pink-600 transition line-clamp-2">
          {blog.title}
        </h2>

        {/* Blog Snippet */}
        <p className="text-gray-600 mb-6 text-sm line-clamp-3">
          {blog.content}
        </p>

        {/* Author and Date */}
        <div className="mt-auto flex justify-between items-center text-gray-500 text-sm">
          <span>By {blog.author?.name || "Unknown"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
