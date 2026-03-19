const Comment = require("../models/comment");
const Blog = require("../models/blogs");
const withTransaction = require("../utilis/withTransaction");
const State = require("../models/states");
const {
  Types: { ObjectId },
} = require("mongoose");
const createComment = async (req, res) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    const { slug } = req.params;
    const { comment } = req.body;

    let createdComment;
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment Required" });
    }
    await withTransaction(async (session) => {
      const blog = await Blog.findOne({ slug }).session(session);
      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }
      const newComment = new Comment({
        blog: blog._id,
        user: userId,
        comment,
      });
      const savedComment = await newComment.save({ session });
      await savedComment.populate(
        { path: "user", select: "name" ,session:session}
      );
      createdComment = savedComment;
      await Blog.updateOne(
        { _id: blog._id },
        { $inc: { commentsCount: 1 } },
        { session },
      );
      await State.updateOne(
        {},
        { $inc: { totalCommentsCount: 1 } },
        { upsert: true, session },
      );
    });
    return res.status(201).json({
      message: "Comment added",
      data: createdComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { slug } = req.params;
    const { cursor } = req.query;
    const limit = 10;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    let query = { blog: blog._id };
    if (cursor) {
      query._id = { $lt: cursor };
    }
    const comments = await Comment.find(query)
      .populate("user", "name")
      .sort({ _id: -1 })
      .limit(limit + 1);
    const hasMore = comments.length > limit;
    if (hasMore) {
      comments.pop();
    }
    const nextCursor =
      comments.length > 0 ? comments[comments.length - 1]._id : null;

    return res.status(200).json({
      success: true,
      data: comments,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const userId = req.result.id;
    const { id } = req.params;

    // Validate comment ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid comment ID",
      });
    }
    await withTransaction(async (session) => {
      // Find comment by _id
      const comment = await Comment.findById(id).session(session);
      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
        });
      }
      const isOwner = comment.user.toString() === userId;
      const isAdmin = req.result.role === "admin";
      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
      await Comment.deleteOne({ _id: id }).session(session);
      await Blog.updateOne(
        { _id: comment.blog },
        { $inc: { commentsCount: -1 } },
        { session },
      );

      await State.updateOne(
        {},
        { $inc: { totalCommentsCount: -1 } },
        { upsert: true, session },
      );

      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { deleteComment };

module.exports = { createComment, getComments, deleteComment };
