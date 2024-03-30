
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast";


const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") || false,
    data: {},
}



export const createAccount = createAsyncThunk("auth/signup",async(data)=>{
    try{
        let result =""
        const res = axios.post("/api/v1/users/register",data)
        toast.promise(res,{
            loading:"wait! creating your account...",
            success:(data)=>{
                console.log(data)
                result = data?.data?.data.user 
                return data?.data?.message
            },
            error:"failed to create the account"
        })
        await res ;
        return result;
    }
    catch(err){
       toast.error(err?.response?.data?.message)
    }
})


export const validateAccount = createAsyncThunk("auth")


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    },

    extraReducers:(builder) =>{
        builder

        .addCase(createAccount.fulfilled,(state,action)=>{
            console.log(action.payload)
            localStorage.setItem("data",JSON.stringify(action?.payload))
            localStorage.setItem("isLoggedIn",true)
            state.isLoggedIn = true
            state.data = action?.payload 
        })
    }
    
})

export const {} = authSlice.actions
export default authSlice.reducer;

