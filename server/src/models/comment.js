const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema(
    {
        blog:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'blog',
            required:true,
            index:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true,
        },
        comment:{
            type:String,
            required:true,
            trim:true,
            maxLength:1000
        }
    },
    {timestamps:true}
)

commentSchema.index({blog:1,createdAt:-1})
const Comment=mongoose.model('comment',commentSchema);

module.exports=Comment;