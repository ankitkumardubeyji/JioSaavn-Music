import mongoose, { isValidObjectId } from "mongoose";
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


const getYourSongs = asyncHandler(async(req,res)=>{
    
    const songs = await Song.find({owner:req.user._id})
    let Songs = []

    if(songs.length==0){
        throw new ApiError(400,"You have not uploaded Any Song")
    }

    songs.map((song)=>{
        Songs.push({owner:req.user.username,thumbnail:song.thumbnail,songFile:song.songFile,title:song.title,description:song.description})
    })

    return res.status(200)
    .json(new ApiResponse(200,Songs,"Your songs successfully fetched "))


})

const getAllSongs = asyncHandler(async(req,res)=>{
    console.log("vabbbbbbb");
   // checking if any of the below has been passed by the user as query params otherwise assigning the below with the default values  
    let {page=1,limit=12,query,sortBy,sortType,userId} = req.query;

    // parsing the page and the limit
    page = parseInt(page,10); // here 10 denotes the decimal 
    limit = parseInt(limit); 

    // validating the page and the limit values
    page = Math.max(1,page); // ensuring the page is atleast 1
    limit = Math.min(20,Math.max(1,limit)); // ensuring the limit is between 1 and 10

    const pipeline = [];

    // match songs by song userId if provided
    if(userId){
        if(!isValidObjectId(userId)){
            throw new ApiError(400,"userId is invalid")
        }

        pipeline.push({
            // filtering forthe songs that has userId as the owner 
            $match:{
                owner: new mongoose.Types.ObjectId(userId),
            }
        });
    }

        // Match the songs based on the search query passed by the user
        if(query){
            pipeline.push({
       // filtering all the song docs whose title or description matches with the provided text         
                $match:{
                    $text:{
                        $search:query 
                    }
                }
            });
        }

        // sorting the pipeline based on the sortBy and sortType

        const sortCriteria = {};
        if(sortBy && sortType){
            sortCriteria[sortBy] = sortType === "asc" ? 1 :"-1";
            pipeline.push({
                $sort:sortCriteria 
            })
        }

        // sorting in descending order based on createdAt time ie the song uploaded latest will  be at the top 
        else{
            sortCriteria["createdAt"] =-1;
            pipeline.push({
                $sort:sortCriteria 
            })
        }

        // Applying pagination using the skip and limit
        pipeline.push({
            $skip:(page-1)*limit
        });

        pipeline.push({
            $limit:limit 
        });

        pipeline.push({
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            _id:0
                           
                        }
                    }
                ]
            },
        })

        pipeline.push({
            $addFields:{
                owner:{
                    $first:"$owner"
                }
            }
        })

    
        // executing the aggregation pipeline
        const songs = await Song.aggregate(pipeline)
            songs.map((song)=>{
                song.owner = song.owner.fullName
            })
        if(!songs || songs.length === 0){
            throw new ApiError(404,"songs not found ");
        }

        return res.status(200)
        .json(new ApiResponse(200,songs,"songs fetched successfully"));


    });


export {publishSong,getAllSongs,getYourSongs}
