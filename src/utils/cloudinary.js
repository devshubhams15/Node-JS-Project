import {v2 as cloudinary} from 'cloudinary';

import fs from 'fs'


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET_KEY 
});



const uploadOnCloudinary = async (localpath) => {

    try {
        if(!localpath) return "Empty path !"
        const response=cloudinary.uploader.upload(localpath,{ resource_type: "auto" }) 
        console.log("File has been uploaded on cloudinary!",response.url)
        return response   
    } catch (error) {
        fs.unlinkSync(localpath)
        //remove the locally saved file as file upload got failed
        return "Failed"        
    }
};


export {uploadOnCloudinary}