// utility for 


import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null;
        }

        // upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log("file has been successfully uploaded on the cloudinary ")
        fs.unlinkSync(localFilePath) // deleting the file from the local storage 
    }
    catch(error){
        fs.unlinkSync(localFilePath)
    }
}

