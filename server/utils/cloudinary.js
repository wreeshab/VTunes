import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  console.log("uploadToCloudinary");
  console.log(filePath);
  try {
    if (!filePath) {
      console.log("No file path provided");
      return null;
    }
    const fileType = filePath.split('.').pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "bmp"].includes(fileType);

    let options = {
      resource_type: "auto",
    };
    if(isImage){
      options = {
        ...options,
        transformation:[
          {
            width: 800,
            height: 800,
            crop: "fill",
            gravity:"center"
          }
        ]
      }
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log(result.url);

    return result;
  } catch (err) {
    fs.unlinkSync(filePath); // unlinkSync--> only after this line will it go to the next line
    console.log(err);
    
  }

};
export default uploadToCloudinary;
