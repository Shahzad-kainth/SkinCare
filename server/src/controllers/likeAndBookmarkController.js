const Like = require("../models/likes");
const withTransaction = require("../utilis/withTransaction");
const Blog = require("../models/blogs");
const Bookmark = require("../models/bookmarks");
const State = require("../models/states");

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
   const actionPerformed= await withTransaction(async (session) => {
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
          return  true;
        }
      }
       return false;
    });

     return res.status(200).json({
        success:true,
        data:{
          actionPerformed,
        }
       })
  } 
  catch (error) {
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

const likeBlog = (req, res) => handleAction({
  req, 
  res, 
  model: Like, 
  counterField: "likesCount", 
  stateField: "totalLikesCount", 
  actionType: "like"
});

const unlikeBlog = (req, res) => handleAction({
  req, 
  res, 
  model: Like, 
  counterField: "likesCount", 
  stateField: "totalLikesCount", 
  actionType: "unlike"
});

// Bookmark / Remove Bookmark
const addBookmark = (req, res) => handleAction({
  req, 
  res, 
  model: Bookmark, 
  counterField: "bookmarksCount", 
  stateField: "totalBookmarksCount", 
  actionType: "addBookmark"
});

const removeBookmark = (req, res) => handleAction({
  req, 
  res, 
  model: Bookmark, 
  counterField: "bookmarksCount", 
  stateField: "totalBookmarksCount", 
  actionType: "removeBookmark"
});

const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const bookmarks = await Bookmark.find({ user: userId })
      .populate("blog", "title slug likesCount")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json(bookmarks);
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

// const getLikes = async (req, res) => {
//   try {
//     const userId = req.result?.id;
//     const { slug } = req.params;
//     console.log(userId);
//     const blog = await Blog.findOne({ slug })
//       .select("_id likesCount");

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     let isLiked = false;

//     if (userId) {
//       const likeExists = await Like.exists({
//         user: userId,
//         blog: blog._id,
//       });
//       isLiked = !!likeExists;
//     }

//     return res.status(200).json({
//       likesCount: blog.likesCount,
//       isLiked,
//     });

//   } catch (err) {
//     console.error("Get Likes Error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
