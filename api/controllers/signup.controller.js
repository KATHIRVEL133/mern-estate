import User from "../models/user.models.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup =async (req,res,next)=>
{
const {username,email,password} = req.body;
const hasedPassword = bcryptjs.hashSync(password,10);
const newUser  = new User({username,email,password:hasedPassword});
try{
    await newUser.save();
    res.status(201).json("user created successfully");
}
catch(error)
{
    next(error);
}
};
export const signin = async (req,res,next)=>
{
const {email,password} = req.body;
try
{
    const foundUser = await User.findOne({email});
    if(!foundUser) 
    {
        return next(errorHandler(404,'Invalid user'));
    }
    const validPassword = bcryptjs.compareSync(password,foundUser.password);
    if(!validPassword)
    {
    return next(errorHandler(401,'Invalid credentials'));
    }
    const {password:pass,...rest} = foundUser._doc;
    const token = jwt.sign({id:foundUser._id},process.env.jWT_TOKEN)
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
}
catch(error)
{
    next(error);
}

}
export const google = async (req,res,next)=>
{
    try
    {
    const user = await User.findOne({email:req.body.email});
    if(user)
    {

        const token = jwt.sign({id:user._id},process.env.jWT_TOKEN)
        const {password:pass,...rest} = user._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }
    else
    {
        const passwordGenerated = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
        const hasedPassword = bcryptjs.hashSync(passwordGenerated,10);
        const newUser  = new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),email:req.body.email,password:hasedPassword,avatar:req.body.photo});
        await newUser.save();
        const token = jwt.sign({id:newUser._id},process.env.jWT_TOKEN)
        const {password:pass,...rest} = newUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }
    }
    catch(error)
    {
        next(error);
    }
}
export const signOut = async (req,res,next) =>
{
try
{
res.clearCookie('access_token');
res.status(200).json('user signed out successfully');
}
catch(error)
{
    next(error);
}
}