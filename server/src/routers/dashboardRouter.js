const {getDashboardStats}=require('../controllers/dashboardController');
const {Router}=require('express');
const verifyToken=require('../middlewares/verifyToken');
const requireAdmin=require('../middlewares/requireAdmin')
const dashboardRouter=Router();

dashboardRouter.get('/dashboard',verifyToken,requireAdmin,getDashboardStats)

module.exports=dashboardRouter;