const User=require('../models/user');
const jwt=require('jsonwebtoken')
const redisClient=require('../config/redis')
const adminMiddleware=async(req,res,next)=>{
    try{
  const token = req.cookies.token;
     if (!token) {
            return res.status(401).json({ message: "Token Is Not Provided" });
     }
     const isBlacklisted = await redisClient.get(token);
     if (isBlacklisted) return res.status(401).json({ message: "Token invalid, please login" });
     const payload=jwt.verify(token,process.env.JWT_SECRET);
     const {id}=payload;
    if(!id){
        throw new Error("id is missing")
    }
    if(payload.role!=='admin'){
        throw new Error('you are not admin')
    }
  const result=await User.findById(id);
   if(!result){
    throw new Error('User doesnt exist ');
   }
    req.result=result;
    next();

}
catch(error){
    res.status(401).json({message:error.message})
}

}

module.exports=adminMiddleware;