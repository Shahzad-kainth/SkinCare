const express=require('express');
 const {postBlog,getAllBlogs,getBlog,editBlog,deleteBlog}=require('../controllers/blogController')
 const adminMiddleware=require('../middlewares/adminMiddleware')
const blogRouter=express.Router();
blogRouter.post('/postBlog',adminMiddleware,postBlog);
blogRouter.put('/editblog/:id',adminMiddleware,editBlog);
blogRouter.delete('/deleteblog/:id',adminMiddleware,deleteBlog)
blogRouter.get('/getblogs',getAllBlogs);
blogRouter.get('/getblog/:id',getBlog);

module.exports=blogRouter;
