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
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <p className="text-sm text-gray-400 tracking-widest uppercase animate-pulse">
            Loading blog...
          </p>
        </div>
      );
    }

    if (!blog) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <p className="text-sm text-gray-400 tracking-widest uppercase">
            Blog not found.
          </p>
        </div>
      );
    }

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Category */}
        {blog.category && (
          <div className="mb-5">
            <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {blog.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 leading-tight tracking-tight mb-5">
          {blog.title}
        </h1>

        {/* Author + Date + Like & Bookmark */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400 mb-10 border-b border-gray-200 pb-6">
          <span className="font-semibold text-teal-600 text-sm">
            By {blog.author?.name || "Unknown"}
          </span>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>

            {/* Like */}
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-rose-400 transition-colors duration-150"
            >
              <Heart
                size={16}
                strokeWidth={2}
                className={liked ? "fill-rose-400 stroke-rose-400" : "stroke-gray-400"}
              />
              {likeCount > 0 && (
                <span className={liked ? "text-rose-400" : "text-gray-400"}>
                  {likeCount}
                </span>
              )}
            </button>

            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              className="flex items-center hover:text-teal-500 transition-colors duration-150"
            >
              <Bookmark
                size={16}
                strokeWidth={2}
                className={bookmarked ? "fill-teal-500 stroke-teal-500" : "stroke-gray-400"}
              />
            </button>
          </div>
        </div>

        {/* Blog Image */}
        {blog.image && (
          <div className="mb-12">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100">
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
        <div className="prose prose-sm sm:prose-base max-w-none
          prose-headings:text-neutral-800 prose-headings:font-semibold prose-headings:tracking-tight
          prose-p:text-gray-600 prose-p:leading-8
          prose-a:text-teal-500 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-neutral-800
          prose-blockquote:border-l-teal-400 prose-blockquote:text-gray-500 prose-blockquote:italic
          prose-li:text-gray-600
          prose-img:rounded-xl prose-img:shadow-sm
        ">
          <ReactQuill value={blog.content || { ops: [] }} readOnly={true} theme="bubble" />
        </div>

      </div>

      {/* Comment Section */}
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
