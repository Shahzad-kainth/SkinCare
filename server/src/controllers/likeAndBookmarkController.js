
const Like=require('../models/likes');
const Blog=require('../models/blogs');
const Bookmark = require("../models/bookmarks");

const likeBlog = async (req, res) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { slug } = req.params;

    const blog = await Blog.findOne({ slug }).select("_id");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Upsert → create only if not exists
    const result = await Like.updateOne(
      { user: userId, blog: blog._id },
      { $setOnInsert: { user: userId, blog: blog._id } },
      { upsert: true }
    );

    // Only increment if new like inserted
    if (result.upsertedCount > 0) {
      await Blog.updateOne(
        { _id: blog._id },
        { $inc: { likesCount: 1 } }
      );
    }

    return res.status(200).json({ success:true,liked: true });

  } catch (err) {
    console.error("Like Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unlikeBlog=async(req,res)=>{
    try{
        const userId=req.result.id;
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        
        const {slug}=req.params;
        const blog=await Blog.findOne({slug}).select("_id");
        if(!blog){
            return res.status(404).json({message:"Blog Not Found"});
        }
         const deleted = await Like.deleteOne({
           user: userId,
           blog: blog._id,
        });

      if (deleted.deletedCount > 0) {
          await Blog.updateOne(
          { _id: blog._id },
          { $inc: { likesCount: -1 } }
      );
    }
    return res.status(200).json({success:true, liked: false });

    }
    catch(err){
        console.error("unLike Error",err);
        res.status(500).json({message:"Internal Server Error"})
    }
}


const addBookmark = async (req, res) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { slug } = req.params;

    const blog = await Blog.findOne({ slug }).select("_id");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Bookmark.updateOne(
      { user: userId, blog: blog._id },
      { $setOnInsert: { user: userId, blog: blog._id } },
      { upsert: true }
    );

    return res.status(200).json({ bookmarked: true });

  } catch (err) {
    console.error("Bookmark Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const userId = req.result?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { slug } = req.params;

    const blog = await Blog.findOne({ slug }).select("_id");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Bookmark.deleteOne({
      user: userId,
      blog: blog._id,
    });

    return res.status(200).json({ bookmarked: false });

  } catch (err) {
    console.error("Remove Bookmark Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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


module.exports={likeBlog,unlikeBlog,addBookmark,removeBookmark,getUserBookmarks};



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