import { v2 } from "cloudinary";
import fs from 'fs'

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadCloud=async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        const response=await v2.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        if(response)  console.log("file uploaded successfully")
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(error){
        console.log("file upload was unsuccesfull::ERROR",error)
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadCloud }