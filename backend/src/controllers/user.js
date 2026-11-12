import asyncHandler  from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import { User } from "../modles/user.js"
import { uploadCloud } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"


const generateTokens=async(userId)=>{

    try{
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

    return { accessToken, refreshToken }
    }
    catch(error){
        throw new ApiError(500,"Error generating tokens",error)
    }
}

const reqisterUser=asyncHandler(async(req,res)=>{

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

const loginUser=asyncHandler(async(req,res)=>{

    // get data from the request body
    // check if email and password are provided
    // check if user exists
    // route to signin page if user does not exist
    // check if password is correct
    // generate access token and refresh token
    // send response to the frontend

    const {email,password}=req.body
    if(
        [email,password].some((field)=> !field || field.trim() === "")
    ){
        throw new ApiError(400,"Please provide all the required fields")
    }

    const user=await User.findOne({email:email})
    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid password")
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)

    const loggedInUser=await User.findById(user._id).select(
        "-password -refreshtoken "
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToke",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
        response: new ApiResponse(
            "User logged in successfully",
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            true,
            200
        )
    })

})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{refreshtoken:null}
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken","",options)
    .cookie("refreshToken","",options)
    .json({
        response: new ApiResponse(
            "User logged out successfully",
            null,
            true,
            200
        )
    })

})



export {
    reqisterUser,
    loginUser,
    logoutUser,
}