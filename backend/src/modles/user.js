import mongoose,{ Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            index:true,
            trim:true,
        },
        avatar:{
            type:String,  //using 3rd party storage to store image
            required:true,
        },
        coverimage:{
            type:String
        },
        watchhistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"videos"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshtoken:{
            type:String
        }
    },{timestamps:true}
)

// middleware to hash password before saving to database
userSchema.pre('save' ,async function(){
    if(!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password,10)
})

// instance method to compare password
userSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(password,this.password)
}

// generate access token using jwt
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email:this.email,
            username:this.username
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
            algorithm: "HS256",
        }

    )
}
userSchema.methods.generateRefreshToken=function(){
     return jwt.sign(
        {
            _id:this._id

        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)
