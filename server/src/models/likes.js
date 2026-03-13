const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
},  { timestamps: true });

likeSchema.index({user:1,blog:1},{unique:true});
likeSchema.index({blog:1});

const Like=mongoose.model('like',likeSchema);
module.exports=Like;

