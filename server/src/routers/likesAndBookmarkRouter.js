const express=require('express');
const verifyToken=require('../middlewares/verifyToken');
const likesAndBookmarkRouter=express.Router();
const {likeBlog,unlikeBlog,getLikes,addBookmark,removeBookmark}=require('../controllers/likeAndBookmarkController')

likesAndBookmarkRouter.put('/:slug/like',verifyToken,likeBlog);
likesAndBookmarkRouter.delete('/:slug/like',verifyToken,unlikeBlog);
likesAndBookmarkRouter.put('/:slug/bookmark',verifyToken,addBookmark);
likesAndBookmarkRouter.delete('/:slug/bookmark',verifyToken,removeBookmark);

module.exports=likesAndBookmarkRouter;