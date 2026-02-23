const express=require('express');
const authRouter=express.Router();
const adminMiddleware=require('../middlewares/adminMiddleware')
const {login,signup,logout,checkAuth}=require('../controllers/authController')

authRouter.post('/login',login);
authRouter.post('/signup',adminMiddleware,signup);
authRouter.post('/logout',adminMiddleware,logout);
authRouter.post('/checkAuth',adminMiddleware,checkAuth);

module.exports=authRouter;
