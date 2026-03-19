require('dotenv').config();
const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const main=require('./config/db')
const blogRouter=require('./routers/blogRouter');
const authRouter=require('./routers/authRouter')
const redisClient=require('./config/redis')
const cors=require('cors');
const dashboardRouter = require('./routers/dashboardRouter');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.use('/api/blogs',blogRouter);
app.use('/api/user',authRouter);
app.use('/api',dashboardRouter);

const inializeConnection=async()=>{
    await Promise.all([main(),redisClient.connect()])
    console.log("DB is connected");
    app.listen(process.env.Port,()=>{
        console.log("Server is listening at Port No : "+ process.env.Port)
    })
}
inializeConnection();



