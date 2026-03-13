const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token invalid, please login" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(!payload.id){
        throw new Error("id is Missing")
    }
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    req.result = user; // attach clean user object
    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;