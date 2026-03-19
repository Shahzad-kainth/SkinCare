
import { Link } from "react-router";
import { Heart, Bookmark } from "lucide-react";
import useLikeBookmark from "../hooks/useLikeBookmark";

const BlogCard = ({ blog }) => {
  const { liked, likeCount, bookmarked, handleLike, handleBookmark } =
    useLikeBookmark(blog.slug);

  const getPlainText = (delta) => {
    if (!delta?.ops) return "";
    return delta.ops
      .map((op) => (typeof op.insert === "string" ? op.insert : ""))
      .join("")
      .replace(/\n/g, " ")
      .trim();
  };

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      {blog.image && (
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={blog.image.url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />

          {/* Category Badge */}
          {blog.category && (
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-teal-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {blog.category}
            </span>
          )}

          {/* Like & Bookmark */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm hover:scale-110 active:scale-90 transition-transform duration-150"
            >
              <Heart
                size={15}
                strokeWidth={2}
                className={liked ? "fill-rose-400 stroke-rose-400" : "stroke-gray-400"}
              />
              {likeCount > 0 && (
                <span className={`text-xs font-medium ${liked ? "text-rose-400" : "text-gray-400"}`}>
                  {likeCount}
                </span>
              )}
            </button>

            <button
              onClick={handleBookmark}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 active:scale-90 transition-transform duration-150"
            >
              <Bookmark
                size={15}
                strokeWidth={2}
                className={bookmarked ? "fill-teal-500 stroke-teal-500" : "stroke-gray-400"}
              />
            </button>
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Title */}
        <h2 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-teal-500 transition duration-200 line-clamp-2">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-5 line-clamp-3 leading-relaxed">
          {getPlainText(blog.content)}
        </p>

        {/* Author + Date */}
        <div className="mt-auto flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
          <span className="font-medium text-teal-600">{blog.author?.name || "Unknown"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

      </div>
    </Link>
  );
};

export default BlogCard;