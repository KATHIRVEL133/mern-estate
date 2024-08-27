import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js'
import Listing from "../models/listing.model.js";
export const test = (req,res) =>
{
    res.json({
        "msg":"kathir welcomes you",
    });
}
export const updateUser = async (req,res,next)=>
{
if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your own account'));
try
{
    if(req.body.password)
    {
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            photo:req.body.avatar,
        }
    },{new:true});
    const {password,...rest}=updateUser._doc;
    res.status(200).json(rest);
}
catch(error)
{   console.log(error);
    next(error);
}

};
export const deleteUser = async (req,res,next) =>
{
if(req.user.id!==req.params.id) return next(errorHandler(401,'You can only your own account'));
try
{
await User.findByIdAndDelete(req.params.id);
res.clearCookie('access_token');
res.status(200).json("Deleted Successfully");
}
catch(error)
{
    next(error);
}
}
export const getUserListings = async (req,res,next)=>
{
if(req.user.id===req.params.id)
{
try
{
const listings = await Listing.find({userRef:req.params.id});
res.status(200).json(listings);
}
catch(error)
{
    next(error);
}
}
else
{
    return next(errorHandler(401,'You can view only your own listing'));
}
}
export const deleteListing = async (req,res,next)=>
{
const listing = await Listing.findById(req.params.id);
if(!listing)
{
    return next(errorHandler(404,'list is not present here'));
}
if(req.user.id!==listing.userRef)
{
    return next(errorHandler(401,'You can delete only your listing'));
}
try
{
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('listing is successfully deleted');
}
catch(error)
{
    next(error);
}
}