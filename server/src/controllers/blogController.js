const Blog = require("../models/blogs");
const Like = require("../models/likes");
const Bookmark = require("../models/bookmarks");
const State = require("../models/states");
const {
  Types: { ObjectId },
} = require("mongoose");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const { nanoid } = require("nanoid");
const postBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const createSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    };
    let slug = `${createSlug(title)}-${nanoid(6)}`;
    const existblog = await Blog.findOne({
      title: req.body.title,
      author: req.result._id,
    });
    if (existblog) {
      return res.status(409).json({ message: "Blog is Already Exist" });
    }
    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        message: "Image is Required",
      });
    }

    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "skinCareBlogs",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const uploadResult = await uploadFromBuffer();
    let parseContent;
    try {
      parseContent = JSON.parse(content);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid JSON format",
      });
    }

    if (!parseContent || !Array.isArray(parseContent.ops)) {
      return res.status(400).json({ message: "Invalid content format" });
    }
    const getPlainText = (delta) => {
      if (!delta?.ops) return "";
      return delta.ops
        .map((op) => (typeof op.insert === "string" ? op.insert : ""))
        .join("")
        .replace(/\n/g, " ")
        .trim();
    };

    const contentText = getPlainText(parseContent);

    const createdBlog = await Blog.create({
      title,
      slug,
      content: parseContent,
      contentText,
      category,
      image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      author: req.result._id,
    });

    res
      .status(201)
      .json({ message: "the blog is Successfuly Created", data: createdBlog });
  } catch (error) {
    console.error(error);
    if (uploadResult?.public_id) {
      await cloudinary.uploader.destroy(uploadResult.public_id);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    if (Object.keys(req.body).length === 0 && !req.file) {
      return res.status(400).json({ message: "No fields to update" });
    }
    const AllowedFields = ["title", "content", "category"];
    const updates = {};
    AllowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
     if(updates.content){
        updates.content = JSON.parse(updates.content);
     }
    if (req.file) {
      const existingBlog = await Blog.findOne({
        slug,
        author: req.result._id,
      });
      if (!existingBlog) {
        return res.status(404).json({
          message: "Blog not found or unauthorized",
        });
      }
      if (existingBlog.image?.public_id) {
        await cloudinary.uploader.destroy(existingBlog.image.public_id);
      }

      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "skinCareBlogs",
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            },
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const uploadResult = await uploadFromBuffer();
      updates.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }
    const updatedBlog = await Blog.findOneAndUpdate(
      {
        slug: slug,
        author: req.result._id,
      },
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while updating blog",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const deletedblog = await Blog.findOneAndDelete({
      slug: slug,
      author: req.result._id,
    });

    if (!deletedblog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const userId = req.result?.id;
    const limit = Math.min(Number(req.query.limit) || 10, 15);
    const cursor = req.query.cursor;
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.$text = { $search: search };
    }
    if (category) {
      filter.category = category;
    }

    if (cursor && ObjectId.isValid(cursor)) {
      filter._id = { $lt: new ObjectId(cursor) };
    }

    const blogs = await Blog.find(filter)
      .populate("author", "name") // populate author info
      .sort({ _id: -1 }) // newest first
      .limit(limit + 1);
    const hasMore = blogs.length > limit;
    if (hasMore) {
      blogs.pop();
    }
    const nextCursor = blogs.length > 0 ? blogs[blogs.length - 1]._id : null;
    const blogIds = blogs.map((blog) => blog._id);
    let likedSet = new Set();
    let bookmarkedSet = new Set();
    if (userId) {
      const likes = await Like.find({
        user: userId,
        blog: { $in: blogIds },
      }).select("blog");
      const bookmarks = await Bookmark.find({
        user: userId,
        blog: { $in: blogIds },
      }).select("blog");
      likedSet = new Set(likes.map((l) => l.blog.toString()));
      bookmarkedSet = new Set(bookmarks.map((b) => b.blog.toString()));
    }
    const state = await State.findOne();
    const totalBlogs = state.blogsCount;
    const parsedBlogs = blogs.map((blog) => {
      const blogObj = blog.toObject();
      if (typeof blogObj.content === "string") {
        try {
          blogObj.content = JSON.parse(blogObj.content);
        } catch (e) {
          blogObj.content = {};
        }
      }
      blogObj.isLiked = likedSet.has(blog._id.toString());
      blogObj.isBookmarked = bookmarkedSet.has(blog._id.toString());
      return blogObj;
    });
    //response send
    res.status(200).json({
      success: true,
      limit,
      totalBlogs,
      hasMore,
      nextCursor,
      data: parsedBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug: slug })
      .populate("author", "name")
      .lean();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const formattedBlog = {
      ...blog,
      content:
        typeof blog.content === "string"
          ? JSON.parse(blog.content)
          : blog.content,
    };
    res.status(200).json({
      success: true,
      data: formattedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

module.exports = { postBlog, editBlog, deleteBlog, getAllBlogs, getBlog };
