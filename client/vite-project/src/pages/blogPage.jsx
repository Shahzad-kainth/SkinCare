import { getBlog } from "../api/blogapis";
import { useParams } from "react-router";
import {useState,useEffect} from 'react'
import ReactQuill from 'react-quill-new'
function BlogPage(){
      const {id}=useParams()
      const [blog,setBlog]=useState()
      const [loading ,setLoading]=useState(false);
    async function fetchBlog(){
        try{
            setLoading(true);
            const response = await getBlog(id);
            // console.log(response);
            if(response.data.success){
                 setBlog(response.data.data)
            }
            setLoading(false)
        }
        catch(error){
             console.error("Failed to fetch blog:", error);
             setLoading(false);
        }
    }

    useEffect(()=>{
        fetchBlog()
    },[id])
    if (loading) {
      return (
        <div className="container mx-auto py-12 text-center text-gray-500">
           Loading blog...
        </div>
       );
     }

    if (!blog) {
      return (
        <div className="container mx-auto py-12 text-center text-gray-500">
           Blog not found.
       </div>
    );
  }

    return(
        <div className="container mx-auto py-16 px-6 max-w-3xl">
           <h1 className="text-5xl font-bold text-pink-600 mb-4">{blog.title}</h1>
            <p className="text-gray-400 mb-8">
             {new Date(blog.createdAt).toLocaleDateString()} | by {blog.author?.name || "Unknown"}
           </p>
            {blog.image ?(
               <div className="my-10">
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
      <img
        src={blog.image.url}
        alt={blog.title}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />

      {/* Optional subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
        </div>
            ):null}
            <div
             className="prose prose-pink max-w-full"
              >
                <ReactQuill
                  value={blog.content} 
                  readOnly={true} 
                  theme="bubble"
                />
              </div>
        </div>
    )

}

export default BlogPage;
