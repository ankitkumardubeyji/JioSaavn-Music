import { Follower } from "../models/follower.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";



const toggleFollowing = asyncHandler(async(req,res)=>{
    console.log("apne yha aaya")
    const {username} = req.params

    const user = await User.findOne({username:username})
    const userId = user._id;
    console.log(user)

    const follow = await Follower.find({follower:req.user?._id,artist:userId})

    if(follow.length==0){
        const newfollow = await Follower.create({
            follower:req.user?._id,
            artist:userId
        })
        console.log(newfollow)
      const PublishedFollower = await Follower.findById(newfollow._id)  
        return res.status(200).json
        (new ApiResponse(200,PublishedFollower,"follower toggled user successfully followed "))
    }

    else{
        console.log(follow+" "+"is the follow")
        const del = await Follower.findByIdAndDelete(follow[0]._id)
        return res.status(200).json(new ApiResponse(200,{},"follower toggled follower successfully unsubscribed "))
    }
})


const artistFollowing = asyncHandler(async(req,res)=>{
   // const art = Follower.find({follower:req.user?._id})

    const artists = await Follower.aggregate([
        {
            $match:{
              follower:new mongoose.Types.ObjectId('660f35e0a68418bd624a11f5'),
             
            }
          },
            {
              $lookup: {
                from: "users",
                localField: "artist",
                foreignField: "_id",
                as: "artists",

                pipeline:[
                    {
                        $project:{
                            username:1,
                            email:1,
                            fullName:1,
                            avatar:1,
                            _id:1, 
                        }
                    }
                ]
              }
            },
          
           {
             $addFields: {
               artists: {
                 $first:"$artists"
               }
             }
           }
    ])

    console.log(artists)
    res.status(200)
    .json(new ApiResponse(200,artists,"user following artists fetched successfully "))
})

export {toggleFollowing,artistFollowing}