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
            requied:[true,"password is required"]
        },
        refreshtoken:{
            type:String
        }
    },{timestamps:true}
)

userSchema.pre('save' ,async function(next){
    if(!this.isModified("password")) return next();
    
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email:this.email,
            username:this.username
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
}
userSchema.methods.generateRefreshToken=function(){
     return jwt.sign(
        {
            _id:this._id

        },REFRESH_TOKEN_SECRET,
        {
            expIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)