import 'dotenv/config'
import dotenv from 'dotenv'
import { app } from './app.js'
import dbConnect from './db/index.db.js'
dotenv.config({
    path: './.env'
})


dbConnect()
 .then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`src/index.js: server is running at port ${process.env.PORT}`);
        
    })
 })
 .catch((error)=>{
    console.log("db connection failed",error)
    app.on("error",(error)=>{
        console.log("ERROR/src/index.js",error)
        throw error
    })    
 })