import mongoose, { connection } from 'mongoose'
import { DB_NAME } from '../constants.js'

const dbConnect=async ()=>{
    try{
        await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        console.log("db connection was successful")   
        // console.log(connectionInstance.connect.host)             
    }
    catch(error){
        console.log("ERROR::",error)
        process.exit()
    }
}

export default dbConnect;