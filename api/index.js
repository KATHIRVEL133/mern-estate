const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
const dotenv = require('dotenv');
dotenv.config();
const PORT = 3000 || process.env.PORT;
const userRouter = require('./routes/user.route.js')
mongoose.connect(process.env.MONGO).then(()=>
{
    console.log('connected to MongoDB!');
}).catch((err)=>{console.log(err);})
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
app.use('/api/user',userRouter);
