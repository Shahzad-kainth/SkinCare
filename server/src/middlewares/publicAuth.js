const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const User = require('../models/user');

const publicAuth= async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(token){
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if(user){
    req.result = user;
    } // attach clean user object
    }
    
  } catch (error) {
    
  }
  next();
};

module.exports = publicAuth;