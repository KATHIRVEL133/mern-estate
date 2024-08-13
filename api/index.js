import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express(); 
dotenv.config();
const PORT = 3000 || process.env.PORT;
import userRouter from './routes/user.route.js'
mongoose.connect(process.env.MONGO).then(()=>
{
    console.log('connected to MongoDB!');
}).catch((err)=>{console.log(err);})
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
app.use('/api/user',userRouter);
