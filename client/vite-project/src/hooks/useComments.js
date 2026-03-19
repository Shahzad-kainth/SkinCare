import { useState, useEffect } from "react";
import { getComments, createComment, deleteComment } from "../api/blogapis";

function useComments(slug) {
  const [comments, setComments] = useState([]);
  const [cloading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [posting, setPosting] = useState(false);
  const fetchComments = async (cursor = null) => {
    try {
      setLoading(true);
      const response = await getComments({ slug, limit: 10, cursor });
      if (cursor) {
        setComments((prev) => [...prev, ...response.data.data]);
      } else {
        setComments(response.data.data);
      }
      setNextCursor(response.data.nextCursor);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  async function addComment(text) {
    if (posting || !text.trim()) return;
    setPosting(true);
    const tempId = "temp-" + Date.now();
    const optimisticComment = {
      _id: tempId,
      comment:text,
      user: { name: "You" },
      createdAt: new Date().toISOString(),
      isPending: true,
    };
    setComments((prev) => [optimisticComment, ...prev]);
    try {
      const response = await createComment(slug, text);
      const realComment = response.data.data;

      setComments((prev) =>
        prev
          .filter(Boolean)
          .map((comment) => (comment?._id === tempId ? realComment : comment)),
      );
    } catch (error) {
      console.error("Failed to add comment", error);
      setComments((prev) => prev.filter((comment) => comment._id !== tempId));
    } finally {
      setPosting(false);
    }
  }

  async function removeComment(commentId) {
    try {
      await deleteComment(commentId);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  }
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchComments(nextCursor);
    }
  };

  useEffect(() => {
    if (slug) {
      setComments([]);
      setNextCursor(null);
      setHasMore(true);
      fetchComments();
    }
  }, [slug]);
  return {
    comments,
    cloading,
    hasMore,
    loadMore,
    addComment,
    removeComment,
    posting,
  };
}

export default useComments;
