import User from "../models/user.models.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup =async (req,res,next)=>
{
const {username,email,password} = req.body;
const hasedPassword = bcryptjs.hashSync(password,10);
const user  = new User({username,email,password:hasedPassword});
try{
    await user.save();
    res.status(201).json("user created successfully");
}
catch(error)
{
    next(errorHandler(550,'Created by user'));
}
}