import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { optimisticLike, optimisticBookmark, syncLike, syncBookmark } from "../Slices/blogsSlice";

const useLikeBookmark = (slug) => {
  const dispatch = useDispatch();
  const blog = useSelector((s) => s.blogs.blogs.find((b) => b.slug === slug));

  const liked = blog?.isLiked ?? false;
  const likeCount = blog?.likesCount ?? 0;
  const bookmarked = blog?.isBookmarked ?? false;

  // Track what the server last confirmed
  const serverLiked = useRef(liked);
  const serverBookmarked = useRef(bookmarked);
  const likeTimer = useRef(null);
  const bookmarkTimer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(likeTimer.current);
      clearTimeout(bookmarkTimer.current);
    };
  }, []);

  const handleLike = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    const next = !liked;
    // Update Redux immediately — both components re-render
    dispatch(optimisticLike({ slug, liked: next }));

    // Reset debounce timer — only fires once user stops clicking
    clearTimeout(likeTimer.current);
    likeTimer.current = setTimeout(() => {
      if (next === serverLiked.current) return; // toggled back — no API needed
      dispatch(syncLike({ slug, liked: next }))
        .unwrap()
        .then(() => { serverLiked.current = next; })
        .catch(() => {}); // rollback handled in slice
    }, 5000);
  };

  const handleBookmark = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    const next = !bookmarked;
    dispatch(optimisticBookmark({ slug, bookmarked: next }));

    clearTimeout(bookmarkTimer.current);
    bookmarkTimer.current = setTimeout(() => {
      if (next === serverBookmarked.current) return;
      dispatch(syncBookmark({ slug, bookmarked: next }))
        .unwrap()
        .then(() => { serverBookmarked.current = next; })
        .catch(() => {});
    }, 5000);
  };

  return { liked, likeCount, bookmarked, handleLike, handleBookmark };
};

export default useLikeBookmark;