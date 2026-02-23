const Blog=require('../models/blogs')
const mongoose=require('mongoose');
const cloudinary=require('../config/cloudinary')
const streamifier=require('streamifier');
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
     if(!req.file){
      return res.status(400).json({
        message:"Image is Required"
      })
     }

     const uploadFromBuffer=()=>{
       return new Promise((resolve,reject)=>{
          const stream=cloudinary.uploader.upload_stream(
             {
              folder: "skinCareBlogs",
              },
              (error,result)=>{
                if(result){
                  resolve(result)
                }
                else{
                  reject(error)
                }
              }, 
          )
          streamifier.createReadStream(req.file.buffer).pipe(stream);
       })
     }

    const uploadResult=await uploadFromBuffer();
     const parseContent=JSON.parse(content)
     console.log(parseContent);
     if (!parseContent || !Array.isArray(parseContent.ops)) {
     return res.status(400).json({ message: "Invalid content format" });
   }
    const createdBlog=await Blog.create({
     title,
     content,
     category,
     image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
     author:req.result._id,
    });
    res.status(201).json({message:"the blog is Successfuly Created",
        data:createdBlog,
    });
    }
    catch(error){
       console.error(error);
       res.status(500).json({message:"Internal Server Error"})
    }
    
}

const editBlog=async(req,res)=>{
  try{
      const {id}=req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: "Invalid blog ID" });
      }
      if (Object.keys(req.body).length === 0 && !req.file) {
       return res.status(400).json({ message: "No fields to update" });
      }
       const AllowedFields=["title", "content", "category"];
       const updates={};
       AllowedFields.forEach((field)=>{
        if(req.body[field]!==undefined){
            updates[field]=req.body[field];
        }
       })
       if(updates.content){
          updates.content = JSON.parse(updates.content);
       }
      if(req.file){
      const existingBlog = await Blog.findById(id);
      if(existingBlog.image?.public_id){
         await cloudinary.uploader.destroy(existingBlog.image.public_id);
    }

     const uploadFromBuffer=()=>{
       return new Promise((resolve,reject)=>{
          const stream=cloudinary.uploader.upload_stream(
             {
              folder: "skinCareBlogs",
              },
              (error,result)=>{
                if(result){
                  resolve(result)
                }
                else{
                  reject(error)
                }
              }, 
          )
          streamifier.createReadStream(req.file.buffer).pipe(stream);
       })
     }
       const uploadResult=await uploadFromBuffer();
       updates.image={
           public_id: uploadResult.public_id,
           url: uploadResult.secure_url,
       }
      }
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
        const limit=Number(req.query.limit) || 10;
        const skip=(page-1)*limit;
        const {search,category}=req.query;
        const filter={};
        if(search){
             filter.$text = { $search: search };
        }
        if(category){
            filter.category=category;
        }
        
        
      const totalBlogs=await Blog.countDocuments(filter);

      const blogs = await Blog.find(filter)
      .populate("author", "name") // populate author info
      .sort({ createdAt: -1 })          // newest first
      .skip(skip)
      .limit(limit);

       const parsedBlogs = blogs.map(blog => {
       const blogObj = blog.toObject();
        if (typeof blogObj.content === "string") {
          try {
            blogObj.content = JSON.parse(blogObj.content);
         } catch (e) {
            blogObj.content = {};
         }
      }

  return blogObj;
      });
      //response send
     res.status(200).json({
      success: true,
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      data: parsedBlogs,
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
       const blog=await Blog.findById(id).populate("author","name").lean();
        if (!blog) {
       return res.status(404).json({ message: "Blog not found" });
       }
       const formattedBlog={
        ...blog,
        content:typeof blog.content==="string"?JSON.parse(blog.content):blog.content,
       }
       res.status(200).json({
       success: true,
       data: formattedBlog,
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


