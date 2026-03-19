import { useState } from "react";
import { Trash2 } from "lucide-react";

function CommentSection({
  comments,
  loading,
  hasMore,
  onLoadMore,
  addComment,
  removeComment,
  posting
}) {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text);
    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-20 mt-16 border-t pt-10">

      {/* Comment Header */}
      <h2 className="text-2xl font-semibold mb-6 text-[#2E2E2E]">
        Comments ({comments?.length})
      </h2>

      {/* Add Comment */}
      <form onSubmit={handleSubmit} className="mb-8">

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7C73]"
          rows={3}
        />

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={posting}
            className="px-4 py-2 bg-[#4F7C73] text-white text-sm rounded-md hover:bg-[#3f645d] disabled:opacity-50"
          >
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </div>

      </form>

      {/* Comments List */}
      <div className="space-y-6">

        {comments?.map((comment,index) => (
          <div
            key={comment?._id ||`temp-${index}`}
            className="border p-4 rounded-xl bg-white shadow-sm"
          >

            {/* User + Date */}
            <div className="flex justify-between items-center mb-2">

              <div className="flex flex-col">
                <span className="font-medium text-sm text-[#2E2E2E]">
                  {comment?.user?.name || "Anonymous"}
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(comment?.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Delete Button */}
              {!comment?.isPending && (
                <button
                  onClick={() => removeComment(comment._id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              )}

            </div>

            {/* Comment Text */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {comment?.text || comment?.comment}
            </p>

            {/* Pending indicator */}
            {comment?.isPending && (
              <p className="text-xs text-gray-400 mt-2">
                Posting...
              </p>
            )}

          </div>
        ))}

      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-4 text-sm text-gray-500">
          Loading comments...
        </p>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-5 py-2 bg-[#4F7C73] text-white text-sm rounded-md hover:bg-[#3f645d]"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}

export default CommentSection;