import { useEffect, useState } from "react";
import { removeBookmark } from "../api/blogapis";
import { meBookmarks } from "../api/authenicationApi";
import { Link } from "react-router";
function BookMarkPage() {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  async function fetchBookmark(cursor = null) {
    try {
      cursor ? setLoadingMore(true) : setLoading(true);
      const response = await meBookmarks(cursor);
       console.log(response);
      setBookmarks(prev=>cursor?[...prev,...response.data.data]:response.data.data);
      setNextCursor(response.data.nextCursor);
      setHasMore(response.data.hasMore);
      
    } catch (error) {
        console.log(error);
      setError("Failed to load bookmarks");
    }
    finally{
        setLoading(false)
        setLoadingMore(false);
    }
  }
  useEffect(() => {
    fetchBookmark();
  }, []);

  async function optimisticRemoveBookmark(slug) {
    const prev = [...bookmarks];
    // optimistic UI
    setBookmarks((curr) => curr.filter((b) => b.blog.slug !== slug));

    try {
      await removeBookmark(slug);
    } catch (error) {
      setBookmarks(prev); // rollback
    }
  }
   async function loadMore() {
  if (nextCursor && hasMore) {
    await fetchBookmark(nextCursor);
  }
}
  
return (
  <div className="min-h-screen bg-stone-50 px-4 sm:px-6 lg:px-10 py-10">
    
    {/* Page Header */}
    <div className="mb-8">
      <p className="text-xs font-semibold tracking-widest text-teal-500 uppercase mb-1">
        Your Collection
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 tracking-tight">
        Bookmarks
      </h1>
    </div>

    {/* Loading Skeletons */}
    {loading && (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-teal-100/50 h-44 rounded-2xl border border-gray-200"
          />
        ))}
      </div>
    )}

    {/* Error */}
    {error && (
      <div className="flex justify-center mt-10">
        <p className="text-sm text-red-400 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
          {error}
        </p>
      </div>
    )}

    {/* Empty State */}
    {!loading && bookmarks.length === 0 && (
      <div className="flex flex-col items-center justify-center mt-20 gap-3">
        <span className="text-5xl">🌿</span>
        <p className="text-gray-400 text-sm tracking-wide">
          No bookmarks yet. Start saving blogs you love!
        </p>
      </div>
    )}

    {/* Cards Grid */}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((item) => {
        const blog = item.blog;
        if (!blog) return null;

        return (
          <Link to={`/blog/${blog.slug}`} key={item._id}>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 group h-full">
              
              {/* Top: Title + Excerpt */}
              <div>
                {/* Category-style tag */}
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full mb-3">
                  Skincare
                </span>

                <h2 className="text-base font-semibold text-neutral-800 line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors duration-200">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {blog.contentText}
                </p>
              </div>

              {/* Bottom: Likes + Remove */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span className="text-rose-400">❤️</span>
                  {blog.likesCount}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    optimisticRemoveBookmark(blog.slug);
                  }}
                  className="text-xs font-medium text-red-400 hover:text-red-600 hover:underline transition-colors duration-200"
                >
                  Remove
                </button>
              </div>

            </div>
          </Link>
        );
      })}
    </div>

    {/* Load More */}
    {hasMore && !loading && (
      <div className="flex justify-center mt-10">
        <button
          onClick={loadMore}
          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-xl transition-colors duration-200 shadow-sm"
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      </div>
    )}

  </div>
);
}

export default BookMarkPage;
