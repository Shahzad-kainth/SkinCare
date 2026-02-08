const Blog=require('../models/blogs')
const mongoose=require('mongoose');
const postBlog=async (req,res)=>{
    try{
    const { title, content, category } = req.body;
    const existblog= await Blog.findOne({
         title: req.body.title,
         author: req.result._id,
    })
    if(existblog){
        return res.status(409).json({message:"Blog is Already Exist"})
    }

    const createdBlog=await Blog.create({
     title,
     content,
     category,
     author:req.result._id,
    });
    res.status(201).json({message:"the blog is Successfuly Created",
        data:createdBlog,
    });
    }
    catch(error){
       res.status(500).json({message:"Internal Server Error"})
    }
    
}
const editBlog=async(req,res)=>{
  try{
      const {id}=req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: "Invalid blog ID" });
      }
      if (Object.keys(req.body).length === 0) {
       return res.status(400).json({ message: "No fields to update" });
      }
       const AllowedFields=["title", "content", "category"];
       const updates={};
       AllowedFields.forEach((field)=>{
        if(req.body[field]!==undefined){
            updates[field]=req.body[field];
        }
       })
       const updatedBlog=await Blog.findOneAndUpdate({
          _id:id,
          author:req.result._id,
         },
          {
            $set:updates

          },
          {
            new:true,
            runValidators:true
          }
       )
       if(!updatedBlog){
             return res.status(404).json({
             message: "Blog not found or unauthorized",
         });
       }
        res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
  }
  catch(error){
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error while updating blog",
    });
  }

}

const deleteBlog=async(req,res)=>{
    try{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: "Invalid blog ID" });
    }
    const deletedblog=await Blog.findOneAndDelete({
        _id:id,
        author:req.result._id,
    })

      if (!deletedblog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized",
      });
    }
     res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  }
  catch(error){
    console.error(error);
    res.status(500).json({
        success:false,
        message:"Internal Server Error "})
  }
}

const getAllBlogs=async(req,res)=>{
  try{
        const page=Number(req.query.page) || 1;
        const limit=Number(req.query.limit) || 6;
        const skip=(page-1)*limit;
        const {search,category}=req.query;
        const filter={};
        if(search){
             filter.$text = { $search: search };
        }
        if(category){
            filter.category=category;
        }

      const totalBlogs = await Blog.countDocuments(filter);

      const blogs = await Blog.find(filter)
      .populate("author", "name") // populate author info
      .sort({ createdAt: -1 })          // newest first
      .skip(skip)
      .limit(limit);

      //response send
     res.status(200).json({
      success: true,
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      data: blogs,
    });
     }
        
  catch(error){
      console.error(error);
      res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
}

const getBlog=async(req,res)=>{
    try{
       const {id}=req.params;
       //check id is it correct or not to prevent database call
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }
       const blog=await Blog.findById(id).populate("author","name");
        if (!blog) {
       return res.status(404).json({ message: "Blog not found" });
      }
       res.status(200).json({
       success: true,
       data: blog,
       });
    }
    catch(error){
       console.error(error);
      res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      });
    }
}

module.exports={postBlog,editBlog,deleteBlog,getAllBlogs,getBlog}


