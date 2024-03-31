import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {
    songsData:[],
    userSongsData:[],
}


export const publishSong = createAsyncThunk("/video/publishSong",async(data)=>{
    console.log("came here for uploading the data")

    console.log(data)
    
    try{
        const res = axios.post("/api/v1/songs/",data);
        toast.promise(res,{
            loading:"wait publishing your song!",
            success:(data)=>{
                console.log(data)
                return data?.data?.message 
            }
        })

        await res;
        return res.data; 
    }

    catch(error){
        toast.error(error?.response?.data?.message)
    }
})


const songSlice = createSlice({
    name:"song",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder

    }
})


export const {} = songSlice.actions;

export default songSlice.reducers;






