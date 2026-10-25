import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

// CORS configuration
const corsOrigin=(process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin)=>origin.trim())

app.use(cors({
    origin:corsOrigin,
    credentials:true
}))

// Express middleware for parsing JSON and URL-encoded data
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())


export {app}