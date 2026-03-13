const mongoose = require("mongoose");
const State=require('./states');
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    slug:{
     type:String,
     required:true,
     unique:true,
    },
    content: {
      type: Object,
      required: true,
    },
    contentText: {
    type: String,
    required: true
    },
    category: {
      type: String,
      required: true,
       enum: [
        "Skincare Routine",
        "Acne Care",
        "Anti Aging",
        "Dry Skin",
        "Oily Skin",
        "Sensitive Skin",
       "Combination Skin",
       "Ingredients Guide",
        "Product Reviews",
        "DIY Skincare",
       "Sun Protection",
       "Hyperpigmentation",
       "Dermatologist Advice",
       "Men Skincare",
       "Beginner Guide"
       ]
    },
    image: {
       url: {type:String,required:true},
       public_id: {type:String,required:true}
      },
        likesCount:{
        type:Number,
        default:0,
    },
    commentsCount:{
        type:Number,
        default:0,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true },
  },
  {
    timestamps: true, 
  }
);

blogSchema.index({
   title: "text",
   contentText: "text",
})

blogSchema.post('save',async function(doc){
 if(doc){
    await State.updateOne(
      {},
      { $inc: { blogsCount: 1 } },
      { upsert: true }
    );
 }
})

blogSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await State.updateOne(
      {},
      { $inc: { blogsCount: -1 } }
    );
  }
});
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
