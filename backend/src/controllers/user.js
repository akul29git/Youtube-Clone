import asyncHandler  from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import { User } from "../modles/user.js"
import { uploadCloud } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

// check for unique email and username
// upload image to cloudinary
// enter into the database
// create a response and password and refresh token should not be sent to the frontend
// return response to the frontend

// handle error if no data is send

export const reqisterUser=asyncHandler(async(req,res)=>{

    const {username,email,password,fullname}=req.body

    if(
        [username,email,password,fullname].some((field)=> !field || field.trim() === "")
    ){
        throw new ApiError(400,"Please provide all the required fields")
    }

    const existingUser = await User.findOne({
        $or : [{ email },{ username }]
    })

    if(existingUser){
        throw new ApiError(409,"User already exists, please login")
    }

    const avatarLocalPath=req.files?.avatar?.[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400,"Please provide an avatar image")
    }

    const avatar =await uploadCloud(avatarLocalPath)

    const coverImageLocalPath=req.files?.coverimage?.[0]?.path
    let coverImage
    if(coverImageLocalPath){
        coverImage=await uploadCloud(coverImageLocalPath)
    }

    if(!avatar){
        throw new ApiError(500,"Error uploading images to cloudinary...omg")
    }

    const user=await User.create({
        fullname,
        username,
        email,
        password,
        avatar:avatar.secure_url,
        coverimage:coverImage?.secure_url,
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshtoken "
    )

    if(!createdUser){
        throw new ApiError(500,"Error creating user")
    }
    else{
        console.log("User created successfully")
    }

    return res.status(201).json({
        response: new ApiResponse("User created successfully",createdUser,true,201)
    })

})