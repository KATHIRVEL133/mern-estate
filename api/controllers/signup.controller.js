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
    res.cookie('access-token',token,{httpOnly:true}).status(200).json(rest);
}
catch(error)
{
    next(error);
}

}