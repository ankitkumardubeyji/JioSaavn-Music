import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// function to genrate the accessToken and refreshToken for the user with the given id and store it in the database.
const generateAccessRefreshToken = async(userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ValidateBeforeSave:false})

        return {accessToken,refreshToken}
    }

    catch(err){
        throw new ApiError(400,err.message)
    }
}


const registerUser = asyncHandler(async(req,res,next)=>{

    const {fullName,username,email,password} = req.body;
   
// 1.  checking if all the fields are provided 
    if(!fullName || !username || !email || !password){
        throw new ApiError(400,"All fields are required ");
    }


 // 2.  checking if the user with given email or username already exists     
    const existedUser = await User.findOne({
        $or:[{username},{email}] 
    }
    )

    if(existedUser){
        throw new ApiError(400,"User already exists")
    }

 // 3.  extracting  files localstorage path from the req.files 

    const avatarLocalPath = req.files.avatar[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required ")
    }

    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.file.coverImage[0]?.path 
    }

    // 4.  uploading the images in the cloudinary 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400,"avatar file is required ");
    }

  
    // 5.  creating the user with all above properties
    const createdUser = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url|| "",
        email,
        password,
        username,
    })

    if(!createdUser){
        throw new ApiError(400,"some error occured in creating the user")
    }
  

    const {accessToken,refreshToken} = await generateAccessRefreshToken(createdUser._id)

    return res.status(200)
    .cookie("accessToken",accessToken)
    .cookie("refreshToken",refreshToken)
    .json(
        new ApiResponse(
            200,
            {
                user:createdUser,
                accessToken,
                refreshToken 
            },
            "User registered successfully"
        )
    )
})

const loginUser = asyncHandler(async(req,res,next)=>{
    const {email,password,username} = req.body;
    if(!email || !password || !username){
        throw new ApiError(400,"All fields are required")
    }
    
    const user = await  User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"User doesnt exists")
    }

    const isPasswordValid = user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400,"Please enter the valid password")
    }

    const {accessToken,refreshToken} = await generateAccessRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select('-password')
    return res.status(200)
    .cookie("accessToken",accessToken)
    .cookie("refreshToken",refreshToken)
    .json(new ApiResponse(200,{
        user:loggedInUser,
        accessToken,
        refreshToken 
    }, "User logged in successfully "));
})


const logOut = asyncHandler(async(req,res,next)=>{
    console.log("came to the backend for the logout")
    // finding the user logged in , and unsetting its refreshToken
    await User.findByIdAndUpdate(req.user?._id,{
        $unset:{
            refreshToken:1,
        }
    },
    
    {
        new : true, 
    }
    )

    const options = {
        httpOnly:true,
        secure:true, 
    }
    console.log("here");
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully "))
})

const getUserChannelProfile = asyncHandler(async(req,res)=>{
    const {username} = req.params

    if(!username?.trim()){
        throw new ApiError("Please provide the username ")
    }

    // values returned from the aggragtion pipeline are arrays 
    await User.aggregate([
        {
            $match:{
                username:username?.toLowerCase() // filtering out the document from the User that has the username as mentioned in the Query
            }
        },  // at the end of this we have the single document that has the username say yoyo passed in the req.params 
        
        
        // selecting all the documents where the username yoyo is the artist, to find the no of followers of yoyo
        // here we are joing the follower with the user hence the localfield becomes _id of  user and the foreign field artist of followers model 

        {

            $lookup:{
                from:"followers",
                localField:"_id", // id of the selected user passed as the local field 
                foreignField:"artist",
                as:"Followers"

            }
        },

        // selecting all the documents where the username yoyo is the follower, to find no of artists yoyo following
        // joining follower with user hence localfield id of user and foreignfield follower of followers
        {

            $lookup:{
                from:"followers",
                localField:"_id", // id of the selected user passed as the local field 
                foreignField:"follower",
                as:"Following"

            }
        },


    ])


    
})

export {registerUser,loginUser,logOut,getUserChannelProfile};