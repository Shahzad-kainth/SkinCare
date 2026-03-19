import BlogsAdminTable from '../../components/admin/BlogsAdminTable';
import {useEffect} from 'react';
import { fetchAllBlogs,resetBlogs ,removeBlog} from '../../Slices/blogsSlice';
import { useSelector,useDispatch } from 'react-redux';
const BlogsAdminPage= () => {
       const { blogs, loading, deleteLoading, search, nextCursor, hasMore } = useSelector((state) => state.blogs);
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
           dispatch(resetBlogs());
           dispatch(fetchAllBlogs({ limit, cursor: null, search }));
      },[dispatch,search])

      const loadMore = () => {
       if (!loading && hasMore) {
         dispatch(fetchAllBlogs({ limit, cursor: nextCursor, search }));
     }
    };
      function Loader() {
           return (  
            <div className="flex justify-center py-12 text-gray-500">
               Loading Blogs...
            </div>
             );
}

 return (
  <>
    {blogs.length === 0 && loading ? (
      <Loader />
    ) : (
      <BlogsAdminTable blogs={blogs} onDelete={onDelete} loading={deleteLoading} />
    )}

    {/* Load More Button */}
    {hasMore && (
      <div className="flex justify-center mt-8">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-3 rounded-full bg-pink-100 hover:bg-pink-200 disabled:opacity-50 transition"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    )}
  </>
);
};

export default BlogsAdminPage;
