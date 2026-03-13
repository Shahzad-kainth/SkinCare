const {createComment,getComments,deleteComment}=require('../controllers/commentController');
const express=require('express');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin=require('../middlewares/requireAdmin')

const commentRouter=express.Router();

commentRouter.post('/:slug/comment',verifyToken,createComment);
commentRouter.delete('/:id/comment',verifyToken,deleteComment);
commentRouter.get('/:slug/comments',getComments);

module.exports=commentRouter;