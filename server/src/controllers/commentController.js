const Comment=require('../models/comment');
const Blog=require('../models/blogs');

const createComment=async(req,res)=>{
    try{
        const userId=req.result?.id;
        if(!userId){
            return res.status(404).json({message:"UnAuthorized"});
        }
        const {slug}=req.params;
        const {comment}=req.body;

        if(!comment || comment.trim()===''){
            return res.status(404).json({message:'Comment Required'})
        }
        const blog=await Blog.findOne({slug});
        if(!blog){
            return res.status().json({message:'Blog Not Found'})
        }
        await Comment.create({
            blog:blog._id,
            user:userId,
            comment
        })

        await Blog.updateOne(
          { _id: blog._id },
          { $inc: { commentsCount: 1 } }
         );

        return res.status(201).json({ message: "Comment added" });
    }
    catch(error){
          console.log(error)
          return res.status(500).json({ message: "Server error" });
    }
}

const  getComments=async(req,res)=>{
    try{
        const {slug}=req.params;
        const {cursor}=req.query;
        const limit=10;
        const blog=await Blog.findOne({slug});
        if(!blog){
            return res.status(404).json({message:"Blog Not Found"})
        }
         let query = { blog: blog._id };
         if(cursor){
            query._id= { $lt: cursor };
         }
        const comments=await Comment.find(query)
        .populate('user','name')
        .sort({_id:-1})
        .limit(limit+1)
        const hasMore = comments.length > limit;
        if(hasMore){
           comments.pop();
        }
        const nextCursor=comments.length>0 ?comments[comments.length-1]._id:null;

        return res.status(200).json({
            success:true,
            data:comments,
            nextCursor,
            hasMore,
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

const deleteComment=async(req,res)=>{
    try{
       const userId=req.result.id;
       const {id}=req.params;
       const comment=await Comment.findById(id);
       if(!comment){
        return res.status(404).json({message:"Comment Not found"})
       }
       
       if(comment.user.toString()!==userId || req.result.role==='admin'){
        return res.status(403).json({message:"Forbidden"})
       }
       await comment.deleteOne();
       await Blog.updateOne(
        {_id:comment.blog},
        { $inc: { commentsCount: -1 } }
       )
       return res.status(200).json({ message: "Deleted" });

    }
    catch(error){
       return res.status(500).json({ message: "Server error" });
    }
}



module.exports={createComment,getComments,deleteComment};