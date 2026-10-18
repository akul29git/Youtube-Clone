// import 'dotenv/config'
// import express from 'express'
// import { DB_NAME } from './constants.js'
// import dbConnect from './db/index.js'

// const app=express()

// dbConnect()
//  .then(()=>{
//     app.listen(process.env.PORT || 8000,(req,res)=>{
//         console.log(`server is running at port ${process.env.PORT}`);
        
//     })
//  })
//  .catch((error)=>{
//     console.log("db connection failed",error)
//     app.on("error",(error)=>{
//         console.log("ERROR/src/index.js",error)
//         throw error
//     })    
//  })