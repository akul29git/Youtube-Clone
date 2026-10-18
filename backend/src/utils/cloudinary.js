import { v2 } from "cloudinary";
import fs from 'fs'

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloud_apiKey:process.env.CLOUDINARY_API_KEY,
    cloud_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadCloud=async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        const response=await v2.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        if(response) return console.log("file uploaded successfully")
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        console.log("file upload was unsuccesfull::ERROR",error)
        return null
    }
}

export {uploadCloud}