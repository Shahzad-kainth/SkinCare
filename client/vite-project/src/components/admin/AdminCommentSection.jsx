import { useParams,useLocation } from "react-router";
import useComments from "../../hooks/useComments";
import { Trash2 } from "lucide-react";
function AdminCommentSection(){
     const {slug}=useParams();
     const location = useLocation();
     const blog = location.state?.blog;
     const {comments,cloading,hasMore,loadMore,addComment,removeComment,posting}=useComments(slug)
    return (
  <div className="max-w-4xl mx-auto p-6">

    {/* Blog Title */}
    <h1 className="text-2xl font-semibold mb-6">
      Comments for: {blog?.title || slug}
    </h1>

    {cloading && comments.length === 0 && (
      <p className="text-gray-500">Loading comments...</p>
    )}

    {/* Comments List */}
    <div className="space-y-4">

      {comments.map((comment) => (

        <div
          key={comment._id}
          className="border rounded-lg p-4 flex justify-between items-start bg-white shadow-sm"
        >

          <div>
            <p className="font-medium">
              {comment.user?.name || "Anonymous"}
            </p>

            <p className="text-gray-600 mt-1">
              {comment.comment}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => removeComment(comment._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      ))}

    </div>

    {/* Load More */}
    {hasMore && (
      <div className="mt-6 text-center">
        <button
          onClick={loadMore}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Load More
        </button>
      </div>
    )}

  </div>
);
   
}

export default AdminCommentSection;