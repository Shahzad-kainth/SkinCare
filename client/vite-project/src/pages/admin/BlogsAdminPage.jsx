import AdminLayout from '../../layouts/admin/AdminLayout'
import BlogsAdminTable from '../../components/admin/BlogsAdminTable';
import {useState,useEffect,useCallback} from 'react';
import {getAllBlogs,deleteBlog} from '../../api/blogapis'
const BlogsAdminPage= () => {
     const [blogs,setblogs]=useState([]);
     const [loading,setLoading]=useState(false);
     const [search,setSearch]=useState(null);
     const [deleteloading,setDeleteLoading]=useState(false);
     const [totalPages,settotalPages]=useState(1)
     const [page,setPage]=useState(1)
     const limit=10;
       const  getblogsForAdmin=useCallback(async()=>{
         try{
            setLoading(true);
            const response=await getAllBlogs(page,limit,search);
            if(response.data.success){
             setblogs(response.data.data);
             settotalPages(response.data.totalPages)
            }
            setLoading(false);
          }
         catch(error){
            console.error(error)
            setLoading(false);
         }
      },[page, limit, search]
    )

     async function onDelete(id){
           const confirmDelete = window.confirm(
           "Are you sure you want to delete this blog?"
           );
            if (!confirmDelete) return;
            const previousBlogs = blogs;
            setblogs((prev) => prev.filter((blog) => blog._id !== id));
           try{
              setDeleteLoading(true);
              await deleteBlog(id);
              setDeleteLoading(false);
             }
           catch(error){
              console.log(error);
              alert("Failed to delete post");
              setDeleteLoading(false);
              setblogs(previousBlogs);
           }
     }
      useEffect(()=>{
           getblogsForAdmin();
      },[getblogsForAdmin])
      function Loader() {
           return (
            <div className="flex justify-center py-12 text-gray-500">
               Loading posts...
            </div>
             );
}

  return (
       <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">All Posts</h2>
       {loading ? (
          <Loader />
      ) : (
        <BlogsAdminTable blogs={blogs} onDelete={onDelete} loading={deleteloading} />
     )}


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
      </AdminLayout>
  );
};

export default BlogsAdminPage;
