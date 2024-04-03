import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"



const songSchema = new mongoose.Schema({
    songFile:{
        type:String, // cloduinary url 
        required:true, 
    },

    thumbnail:{
        type:String, // cloudinary url
        required:true, 
    },

    title:{
        type:String,
        required:true, 
    },

    description:{
        type:String,
        required:true , 
    },

    isPublished:{
        type:Boolean,
        default:false, 
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },



},{timestamps:true})


songSchema.plugin(mongooseAggregatePaginate)
songSchema.index({title:"text",description:"text"})

export const Song = mongoose.model("Song",songSchema)
