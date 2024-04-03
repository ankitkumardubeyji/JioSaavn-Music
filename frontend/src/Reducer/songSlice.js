import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {
    songsData:[],
    userSongsData:[],
}


export const publishSong = createAsyncThunk("/song/publishSong",async(data)=>{
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


export const getSongs = createAsyncThunk("song/getSong" ,async(data)=>{
    let result = {}
    console.log("came here for getting the songs ")
    try{
        const res = axios.get("/api/v1/songs/");
        toast.promise(res,{
            loading:"wait getting the songs!",
            success:(data)=>{
            result = data?.data?.data
                return data?.data?.message 
            }
        })

        await res;
        return  result;
    }
    catch(err){
        toast.error(err.response?.data?.message)
    }
});


const songSlice = createSlice({
    name:"song",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getSongs.fulfilled,(state,action)=>{
            state.songsData = action.payload;
            console.log(state.songsData)
        })

    }
})


export const {} = songSlice.actions;

export default songSlice.reducer;






