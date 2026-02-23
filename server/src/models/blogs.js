const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    content: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
      minLength: 3, 
      maxLength: 60,
    },
    image: {
       url: {type:String,required:true},
       public_id: {type:String,required:true}
      },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true },

  },
  {
    timestamps: true, 
  }
);

blogSchema.index({
   title: "text",
   content: "text",
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
