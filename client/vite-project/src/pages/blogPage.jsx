import { deleteComment, getBlog, getComments} from "../api/blogapis";
import { useParams } from "react-router";
import {useState,useEffect} from 'react'
import ReactQuill from 'react-quill-new'
import useLikeBookmark from "../hooks/useLikeBookmark";
import {Heart,Bookmark} from 'lucide-react';
import useComments from '../hooks/useComments'
import CommentSection from "../components/commentSection";
function BlogPage(){
      const {slug}=useParams()
      const [blog,setBlog]=useState()
      const [loading ,setLoading]=useState(false);
      const {comments,cloading,hasMore,loadMore,addComment,removeComment,posting}=useComments(slug)
      const { liked, likeCount, bookmarked, handleLike, handleBookmark } =
          useLikeBookmark(slug);
      async function fetchBlog(){
        try{
            setLoading(true);
            const response = await getBlog(slug);
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
        fetchBlog();
    },[slug])
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

  return (
  <div className="bg-[#F8F6F2] min-h-screen">
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Category */}
      {blog.category && (
        <div className="mb-4">
          <span className="bg-[#EAF2EF] text-[#4F7C73] text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold text-[#2E2E2E] leading-tight mb-6">
        {blog.title}
      </h1>

      {/* Author + Date + Like & Bookmark */}
      <div className="flex items-center justify-between text-sm text-[#6B7280] mb-10 border-b border-[#E5E7EB] pb-6">
        <span className="font-medium">
          By {blog.author?.name || "Unknown"}
        </span>

        <div className="flex items-center gap-4">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>

          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-rose-500 transition-colors duration-150"
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={liked ? "fill-rose-500 stroke-rose-500" : "stroke-gray-400"}
            />
            {likeCount > 0 && <span className={liked ? "text-rose-500" : ""}>{likeCount}</span>}
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className="flex items-center hover:text-[#4F7C73] transition-colors duration-150"
          >
            <Bookmark
              size={16}
              strokeWidth={2}
              className={bookmarked ? "fill-[#4F7C73] stroke-[#4F7C73]" : "stroke-gray-400"}
            />
          </button>
        </div>
      </div>

      {/* Blog Image */}
      {blog.image && (
        <div className="mb-12">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
            <img
              src={blog.image.url}
              alt={blog.title}
              className="w-full h-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="prose max-w-none prose-headings:text-[#2E2E2E] prose-p:text-[#374151] prose-a:text-[#7FAE9E] prose-strong:text-[#2E2E2E]">
        <ReactQuill value={blog.content} readOnly={true} theme="bubble" />
      </div>

    </div>
      <CommentSection
       comments={comments}
       loading={cloading}
       hasMore={hasMore}
       onLoadMore={loadMore}
       addComment={addComment}
       removeComment={removeComment}
       posting={posting}
      />
  </div>
);

}

export default BlogPage;
