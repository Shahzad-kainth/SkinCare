const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const redisClient=require('../config/redis')
const validate=require('../utilis/validate')
const signup=async(req,res)=>{
    try{
    const {name,emailId,password}=req.body;
     validate(req.body);
     const existingUser = await User.findOne({ emailId });
     if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashPassword=await bcrypt.hash(password,10);
   const newUser= await User.create({
        name,
        emailId,
        password:hashPassword
    })
    res.status(201).json({message:"User is created successfully",
        user:{
           id:newUser._id,
           name:newUser.name,
        
        }
    })
}
catch(error){
    res.status(500).json({message:"Server Error"});
}
}

const login=async(req,res)=>{
    try{
     const {emailId,password}=req.body;
      validate(req.body);
      const checkUser = await User.findOne({ emailId }).select("+password");;
      if(!checkUser){
        return res.status(404).json({message:"User Does Not Exist"})
      }
      if(checkUser.role!=='admin'){
        return res.status(403).json({message:"Access Denied"})
      }
      
     const isMatch = await bcrypt.compare(password, checkUser.password);
     if (!isMatch) {
      return res.status(401).json({ message: "Password doesn't match" });
     }
   
     const token=jwt.sign(
        {
           id: checkUser._id,
           email: checkUser.emailId,
           role: checkUser.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
        
     )
     res.cookie("token",token,{
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 60 * 60 * 1000,
     })
      return res.status(200).json({
      message: "Login successful",
      user: {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.emailId,
        role: checkUser.role,
      },
    });
   }
   catch(error){
    res.status(500).json({message:error.message})
   }
}

const logout=async(req,res)=>{
    try{
     const token=req.cookies.token;
      const payload=jwt.decode(token);
       let expireTime=payload.exp-Math.floor(Date.now()/1000)
       if(expireTime<1){
        expireTime=1;
       }
     await redisClient.set(token,'blacklisted',{ EX: expireTime });
     res.clearCookie('token');
     res.status(200).json({message:"Successfuly logout"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
const checkAuth=(req,res)=>{
    try{
       res.status(200).json({
        message:"success",
        data:req.result
       })
    }
    catch(error){
          res.status(500).json({
            message:"Internal Server Error"
          })
    }
}
module.exports={signup,login,logout,checkAuth};