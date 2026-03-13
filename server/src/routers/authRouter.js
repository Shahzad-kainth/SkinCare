const express = require('express');
const authRouter = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');
const {getUserBookmarks}=require('../controllers/likeAndBookmarkController')

const {
  signup,
  login,
  logout,
  checkAuth
} = require('../controllers/authController');


// Public Routes
authRouter.post('/signup', signup);
authRouter.post('/login', login);

// Protected User Routes
authRouter.post('/logout', verifyToken, logout);
authRouter.get('/check-auth', verifyToken, checkAuth);

// Only logged-in admin can create new admin
authRouter.post('/admin/signup', verifyToken, requireAdmin, signup);

authRouter.get('/me/bookmarks',verifyToken,getUserBookmarks)
module.exports = authRouter;