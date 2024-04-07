import mongoose from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const createPlaylist = asyncHandler(async(req,res)=>{

    console.log("came here for uploading the file")
    const {name,description} = req.body
    
    console.log(req.files)
    console.log(req.file)

    const playlistLocalFile = req.files?.thumbnail[0]?.path
    
    const thumbnail = await uploadOnCloudinary(playlistLocalFile)
    console.log(thumbnail)
    if(!thumbnail.url){
        throw new ApiError("sorry the thumbnail couldnt be uploaded ")
    }

    const newPlaylist = await Playlist.create({
        name,
        description,
        owner:req.user?._id ,
        thumbnail:thumbnail?.url
    })

    const publishedPlaylist = await Playlist.findById(newPlaylist._id);


    res.status(200)
    .json(new ApiResponse(200,publishedPlaylist,"playlist successfully created "))
})

const getPlaylistById = asyncHandler(async(req,res)=>{
    const {PlaylistId} = req.params

    const playlist = await Playlist.findById(PlaylistId)

    if(!playlist){
        throw new ApiError("400","couldnt find playlist with the given id ")
    }

    return res.status(200)
    .json(new ApiResponse(200,playlist,"user playlist found  successfully"))
})



const addSongToPlaylist = asyncHandler(async(req,res)=>{
    const {playlistId,songId} = req.params
    const playlist = await Playlist.findById(playlistId)
    playlist.songs.push(songId);
    await playlist.save({validateBeforeSave:false})


    const newPlaylist = await Playlist.findById(playlistId)

    return res.status(200)
    .json(new ApiResponse(200,newPlaylist,"song got successfully added to the playlist"))
    
})

const getUserPlaylists = asyncHandler(async(req,res)=>{
    console.log("hine here ")
    
    const playlist = await Playlist.find({owner:req.user?._id})

    if(!playlist){
        throw new ApiError(400,"sorry no playlist exists")
    }

    return res.status(200)
    .json(new ApiResponse(200,playlist,"User playlist successfuly accessed"))
})

const removeSongFromPlaylist = asyncHandler(async(req,res)=>{
    const {playlistId,songId} = req.params

    const playlist = await Playlist.findById(playlistId)

    playlist.songs = playlist.songs.filter((song)=>song!=songId)

    await playlist.save({validateBeforeSave:false})

    const newPlaylist = await Playlist.findById(playlistId)

    res.status(200)
    .json(new ApiResponse(200,newPlaylist,"song successfully removed from the playlists"))    

})


const deletePlaylist = asyncHandler(async(req,res)=>{
    const {playlistId} = req.params
    const del = await Playlist.findByIdAndDelete(playlistId)

    if(!del){
        throw new ApiError(400,"no playlist with given id exists")
    }

    res.status(200)
    .json(new ApiResponse(200,del,"playlist got successfully deleted"))
})


 const getSongsInPlaylist = asyncHandler(async(req,res)=>{
    const {playlistId} = req.params

    const Songs = await Playlist.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },

        

        {
            $lookup:{
                from:"songs",
                localField:"songs",
                foreignField:"_id",
                as:"result",

                pipeline:[
                    {
                        $project:{
                            title:1,
                            thumbnail:1,
                            songFile:1,
                            owner:1,
                        }
                    },

                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",

                            pipeline:[
                            {
                                $project:{
                                    fullName:1,
                                }
                            },

                          
                            ]
                        },
                    },
                        {
                            $addFields:{
                                owner:{
                                    $first:"$owner.fullName"
                                }
                            }
                        }

                       
                    
                ]
            }

            
        }
    ])

    return res.status(200)
    .json(new ApiResponse(200,Songs,"songs successfully fetched from the playlist"))
})

export{
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
    getSongsInPlaylist
}

