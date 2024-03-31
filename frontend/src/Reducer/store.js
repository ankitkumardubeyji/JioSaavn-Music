import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Reducer/authSlice.js";
import songSliceReducer from "../Reducer/songSlice.js";


const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        song:songSliceReducer,
    }
});


export default store;

