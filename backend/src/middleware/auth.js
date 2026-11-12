import asyncHandler from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import { User } from "../modles/user.js"

export const verifyUser=asyncHandler(async(req,res,next)=>{
     try{
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            return res.status(401).json({
                response: new ApiResponse("Unauthorized access, please login",null,false,401)
            })
        }
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decoded._id).select("-password -refreshtoken ")

        if(!user){
            return res.status(401).json({
                response: new ApiResponse("Unauthorized access, please login",null,false,401)
            })
        }
        req.user=user
        next()
     }
     catch(error){
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({
                response: new ApiResponse("Token expired, please login again",null,false,401)
            })
        }
        if(error.name==="JsonWebTokenError"){
            return res.status(401).json({
                response: new ApiResponse("Invalid token",null,false,401)
            })
        }
     }
})