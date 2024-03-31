import { Song } from "../models/song.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const publishSong = asyncHandler(async(req,res,next)=>{
    console.log("came to the backend for uploading the song ")
    const {title,description} = req.body;

    if(!title || !description){
        throw new ApiError(400,"title and description functionality is required");
    }
    console.log(req.files)
    const songLocalFile = req.files?.songFile[0]?.path;
    const thumbnailLocalFile = req.files?.thumbnail[0].path;


    


    if(!songLocalFile){
        console.log("yaha mara ya");
        throw new ApiError(400,"thumbnail is required")
    }

    if(!thumbnailLocalFile){
        console.log("waha maraya");
        throw new ApiError(400,"thumbnail is required ")
    }

    const song = await uploadOnCloudinary(songLocalFile)
    if(!song.url){
        throw new ApiError(400,"song file couldnt be uploaded try again!")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalFile)
    if(!thumbnail.url){
        throw new ApiError(400,"thumbnail couldnt be uploaded ");
    }
    console.log("yha tak kam hua hai")
    const newSong = await Song.create({
        title,
        description,
        songFile:song.url,
        thumbnail:thumbnail?.url,
        isPublished:true,
        owner:req.user?._id, 
    })

    console.log(newSong)
    const publishedSong = await Song.findById(newSong?._id)

    return res.status(200)
    .json(new ApiResponse(200,publishedSong,"song got uploaded successfully"))
})

export {publishSong}
