import express from 'express'
import cors from 'cors'
// import cookieParser from 'cookie-parser'


const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.listen(process.env.PORT || 8000,(req,res)=>{
    console.log(`server is at port ${process.env.PORT || 8000}`);
    res.send("server is running")
    
})

export {app}