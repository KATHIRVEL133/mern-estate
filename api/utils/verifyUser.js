import  jwt  from "jsonwebtoken"
import { errorHandler } from "./error.js";
export const verifyUser = (req,res,next)=>
{
   const token = req.cookies.access_token;
   if(!token) return next(errorHandler(401,'Unauthorized'));
<<<<<<< HEAD
    jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>
=======
    jwt.verify(token,process.env.JWT_TOKEN,(error,user)=>
>>>>>>> f75d45f39222d2f27e49f53a07812cb537ee8912
    {
        if(err) return next(errorHandler(403,'Forbidden'));
        req.user = user;
        next();
    })
}