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
      type: String,
      required: true,
      trim:true,
    },
    category: {
      type: String,
      required: true,
      minLength: 3, 
      maxLength: 60,
    },
    // image: {
    //   type: String,
    //   minLength: 3, 
    //   maxLength: 500,
    // },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

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
