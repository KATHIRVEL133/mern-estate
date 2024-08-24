import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
const app = express(); 
dotenv.config();
const PORT = 3000 || process.env.PORT;
import userRouter from './routes/user.route.js'
import signUpRouter from './routes/auth.route.js'
import listingRoute from './routes/listing.route.js'
mongoose.connect(process.env.MONGO).then(()=>
{
    console.log('connected to MongoDB!');
}).catch((err)=>{console.log(err);})
app.use(express.json());
app.use(cookieParser());
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
app.use('/api/user',userRouter);
app.use('/api/auth',signUpRouter);
app.use('/api/listing',listingRoute);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message || 'Internal Server error';
   return res.status(statusCode).json({
          success:false,
          statusCode,
          message,
    });
})
