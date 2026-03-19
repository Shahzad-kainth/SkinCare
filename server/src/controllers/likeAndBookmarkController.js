const Like = require("../models/likes");
const withTransaction = require("../utilis/withTransaction");
const Blog = require("../models/blogs");
const Bookmark = require("../models/bookmarks");
const State = require("../models/states");
const { Types } = require("mongoose");

const handleAction = async ({
  req,
  res,
  model,
  counterField,
  stateField,
  actionType,
}) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { slug } = req.params;
    const actionPerformed = await withTransaction(async (session) => {
      const blog = await Blog.findOne({ slug }).select("_id").session(session);
      if (!blog) {
        throw { status: 404, message: "Blog Not Found" };
      }

      if (actionType === "like" || actionType === "addBookmark") {
        const result = await model.updateOne(
          { user: userId, blog: blog._id },
          { $setOnInsert: { user: userId, blog: blog._id } },
          { upsert: true, session },
        );
        if (result.upsertedCount > 0) {
          await Blog.updateOne(
            { _id: blog._id },
            { $inc: { [counterField]: 1 } },
            { session },
          );
          await State.updateOne(
            {},
            { $inc: { [stateField]: 1 } },
            { upsert: true, session },
          );
          return true;
        }
      } else {
        const deleted = await model.deleteOne(
          { user: userId, blog: blog._id },
          { session },
        );
        if (deleted.deletedCount > 0) {
          await Blog.updateOne(
            { _id: blog._id },
            { $inc: { [counterField]: -1 } },
            { session },
          );
          await State.updateOne(
            {},
            { $inc: { [stateField]: -1 } },
            { upsert: true, session },
          );
          return true;
        }
      }
      return false;
    });

    return res.status(200).json({
      success: true,
      data: {
        actionPerformed,
      },
    });
  } catch (error) {
    console.error(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const likeBlog = (req, res) =>
  handleAction({
    req,
    res,
    model: Like,
    counterField: "likesCount",
    stateField: "totalLikesCount",
    actionType: "like",
  });

const unlikeBlog = (req, res) =>
  handleAction({
    req,
    res,
    model: Like,
    counterField: "likesCount",
    stateField: "totalLikesCount",
    actionType: "unlike",
  });

// Bookmark / Remove Bookmark
const addBookmark = (req, res) =>
  handleAction({
    req,
    res,
    model: Bookmark,
    counterField: "bookmarksCount",
    stateField: "totalBookmarksCount",
    actionType: "addBookmark",
  });

const removeBookmark = (req, res) =>
  handleAction({
    req,
    res,
    model: Bookmark,
    counterField: "bookmarksCount",
    stateField: "totalBookmarksCount",
    actionType: "removeBookmark",
  });

const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { cursor } = req.query;

    const query = { user: userId};
     if ( cursor && ObjectId.isValid(cursor)) {
         query._id = { $lt: new ObjectId(cursor) };
        }
    const limit = Math.min(Number(req.query.limit) || 6, 8);
    const bookmarks = await Bookmark.find(query)
      .populate({
        path: "blog",
        select: "title slug contentText likesCount",
        match: { _id: { $exists: true } },
      })
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();
    const hasMore = bookmarks.length > limit;
    if (hasMore) {
      bookmarks.pop();
    }
    const nextCursor =
      bookmarks.length > 0 ? bookmarks[bookmarks.length - 1]._id : null;
    return res.status(200).json({
      success: true,
      data: bookmarks,
      nextCursor,
      hasMore,
    });
  } catch (err) {
    console.error("Get Bookmarks Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  likeBlog,
  unlikeBlog,
  addBookmark,
  removeBookmark,
  getUserBookmarks,
};
