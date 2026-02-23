import BlogsAdminTable from '../../components/admin/BlogsAdminTable';
import {useEffect} from 'react';
import { fetchAllBlogs,removeBlog,setPage } from '../../features/blogsSlice';
import { useSelector,useDispatch } from 'react-redux';
const BlogsAdminPage= () => {
     const { blogs, loading, deleteLoading, page, totalPages, search}=useSelector((state)=>state.blogs)
     const limit=10;
     const dispatch=useDispatch();
     async function onDelete(id){
           const confirmDelete = window.confirm(
           "Are you sure you want to delete this blog?"
           );
            if (!confirmDelete) return;
              dispatch(removeBlog(id))
           }
      useEffect(()=>{
           dispatch(fetchAllBlogs({page,limit,search}))
      },[dispatch, page, search])
      function Loader() {
           return (  
            <div className="flex justify-center py-12 text-gray-500">
               Loading Blogs...
            </div>
             );
}

  return (
      <>
       {loading ? (
          <Loader />
      ) : (
        <BlogsAdminTable blogs={blogs} onDelete={onDelete} loading={deleteLoading} />
     )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-3">
            {/* Prev Button */}
            <button
              onClick={() => dispatch(setPage(Math.max(prev - 1, 1)))}
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
                  onClick={() => dispatch(setPage(num))}
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
              onClick={() => dispatch(setPage(Math.min(prev + 1, totalPages)))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </>
  );
};

export default BlogsAdminPage;
