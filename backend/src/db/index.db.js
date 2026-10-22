import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const dbConnect=async ()=>{
    const uri=`${process.env.DATABASE_URL}/${DB_NAME}`
    if(!uri){
        throw new Error("db/index.js::Mongoose connection failed: DATABASE_URL is not defined in .env file")
    }
    try{

        await mongoose.connect(uri)
        console.log("db/index.js::Mongoose connection was successful")   
        // console.log(connectionInstance.connect.host)             
    }
    catch(error){
        console.log("db/index.js::ERROR::Mongoose connection failed",error)
        process.exit(1)
    }
}

export default dbConnect;