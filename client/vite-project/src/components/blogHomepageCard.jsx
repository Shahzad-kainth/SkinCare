
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
      className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
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
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#4F7C73] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
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
                className={liked ? "fill-rose-500 stroke-rose-500" : "stroke-gray-500"}
              />
              {likeCount > 0 && (
                <span className={`text-xs font-medium ${liked ? "text-rose-500" : "text-gray-500"}`}>
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
                className={bookmarked ? "fill-[#4F7C73] stroke-[#4F7C73]" : "stroke-gray-500"}
              />
            </button>
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-semibold text-[#2E2E2E] mb-3 group-hover:text-[#7FAE9E] transition line-clamp-2">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-[#6B7280] text-sm mb-6 line-clamp-3 leading-relaxed">
          {getPlainText(blog.content)}
        </p>

        {/* Author + Date */}
        <div className="mt-auto flex justify-between items-center text-sm text-[#6B7280] border-t border-[#F1F1F1] pt-4">
          <span className="font-medium">{blog.author?.name || "Unknown"}</span>
          <span className="text-xs">{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;