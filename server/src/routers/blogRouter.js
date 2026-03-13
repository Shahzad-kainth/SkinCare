const express=require('express');
 const {postBlog,getAllBlogs,getBlog,editBlog,deleteBlog}=require('../controllers/blogController')
 const commentRouter=require('./commentRouter');
 const verifyToken=require('../middlewares/verifyToken');
 const requireAdmin=require('../middlewares/requireAdmin')
 const publicAuth=require('../middlewares/publicAuth');
 const likesAndBookmarkRouter=require('./likesAndBookmarkRouter');
 const upload=require('../middlewares/multer')
const blogRouter=express.Router();
blogRouter.post('/postBlog',verifyToken,requireAdmin,upload.single("image"),postBlog);
blogRouter.put('/editblog/:slug',verifyToken,requireAdmin,editBlog);
blogRouter.delete('/deleteblog/:slug',verifyToken,requireAdmin,deleteBlog)
blogRouter.get('/getblogs',publicAuth,getAllBlogs);
blogRouter.get('/getblog/:slug',getBlog);
blogRouter.use('/', commentRouter);
blogRouter.use('/', likesAndBookmarkRouter);
module.exports=blogRouter;
