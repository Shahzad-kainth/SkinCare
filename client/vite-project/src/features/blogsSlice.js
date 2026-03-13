import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBlogs, deleteBlog, likeBlog, unlikeBlog, addBookmark, removeBookmark } from "../api/blogapis";


export const syncLike = createAsyncThunk(
  "blogs/syncLike",
  async ({ slug, liked }, { rejectWithValue }) => {
    try {
      liked ? await likeBlog(slug) : await unlikeBlog(slug);
      return { slug, liked };
    } catch {
      return rejectWithValue({ slug, liked });
    }
  }
);

export const syncBookmark = createAsyncThunk(
  "blogs/syncBookmark",
  async ({ slug, bookmarked }, { rejectWithValue }) => {
    try {
      bookmarked ? await addBookmark(slug) : await removeBookmark(slug);
      return { slug, bookmarked };
    } catch {
      return rejectWithValue({ slug, bookmarked });
    }
  }
);

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ limit = 6, cursor = null, search = "" }, { rejectWithValue }) => {
    try {
      const response = await getAllBlogs({ limit, cursor, search });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBlog(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    deleteLoading: false,
    nextCursor: null,
    hasMore: true,
    totalBlogs: 0,
    search: "",
  },
  reducers: {
    resetBlogs: (state) => {
      state.blogs = [];
      state.nextCursor = null;
      state.hasMore = true;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.blogs = [];
      state.nextCursor = null;
      state.hasMore = true;
    },
    // Optimistic UI updates
    optimisticLike: (state, action) => {
      const { slug, liked } = action.payload;
      const blog = state.blogs.find((b) => b.slug === slug);
      if (blog) {
        blog.isLiked = liked;
        blog.likesCount += liked ? 1 : -1;
      }
    },
    optimisticBookmark: (state, action) => {
      const { slug, bookmarked } = action.payload;
      const blog = state.blogs.find((b) => b.slug === slug);
      if (blog) {
        blog.isBookmarked = bookmarked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        const reset = !action.meta.arg.cursor;
        if (reset) {
          state.blogs = action.payload.data;
        } else {
          state.blogs = [...state.blogs, ...action.payload.data];
        }
        state.nextCursor = action.payload.nextCursor;
        state.hasMore = action.payload.hasMore;
        state.totalBlogs = action.payload.totalBlogs;
      })
      .addCase(fetchAllBlogs.rejected, (state) => {
        state.loading = false;
      })

      // Delete blog
      .addCase(removeBlog.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(removeBlog.rejected, (state) => {
        state.deleteLoading = false;
      })

      // Sync Like (rollback if failed)
      .addCase(syncLike.rejected, (state, action) => {
        const { slug, liked } = action.payload;
        const blog = state.blogs.find((b) => b.slug === slug);
        if (blog) {
          blog.isLiked = !liked; // rollback
          blog.likesCount += liked ? -1 : 1;
        }
      })

      // Sync Bookmark (rollback if failed)
      .addCase(syncBookmark.rejected, (state, action) => {
        const { slug, bookmarked } = action.payload;
        const blog = state.blogs.find((b) => b.slug === slug);
        if (blog) {
          blog.isBookmarked = !bookmarked; // rollback
        }
      });
  },
});

export const { resetBlogs, setSearch, optimisticLike, optimisticBookmark } = blogsSlice.actions;
export default blogsSlice.reducer;