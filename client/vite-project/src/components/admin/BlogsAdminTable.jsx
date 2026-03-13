import { Link } from "react-router";
import { Edit, Trash2, MessageSquare, Plus } from "lucide-react";
function BlogsAdminTable ({ blogs=[], onDelete,loading}){

  return (
  <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-emerald-100">
    <div className="flex justify-end m-3">
        <Link
          to="/admin/blogs/create"
          className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          <Plus size={16} /> {/* ✅ Lucide + icon */}
          Create Blog
        </Link>
      </div>
    <table className="min-w-full divide-y divide-emerald-100">
      <thead className="bg-emerald-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Created At
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-emerald-100">
        {blogs.length === 0 ? (
          <tr>
            <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
              No posts found
            </td>
          </tr>
        ) : (
          blogs.map((blog) => (
            <tr
              key={blog._id}
              className="hover:bg-emerald-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-gray-800 font-medium">{blog.title}</td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 flex gap-2">
                <Link
                  to={`/admin/blogs/edit/${blog.slug}`}
                  className="px-4 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  <Edit size={16} />
                </Link>
                <button
                  disabled={loading}
                  onClick={() => onDelete(blog.slug)}
                  className="px-4 py-1 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition disabled:opacity-50"
                >
                   <Trash2 size={16} />
                </button>
                 <Link
                  to={`/admin/blogs/comments/${blog.slug}`}
                  state={{blog}}
                  className="px-4 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  <MessageSquare size={16} />
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
};

export default BlogsAdminTable;
