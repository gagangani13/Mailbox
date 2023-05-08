import { createSlice } from "@reduxjs/toolkit";

const welcomeSlice=createSlice({
    name:'Welcome page',
    initialState:{options:'compose'},
    reducers:{
        setOptions(state,action){
            state.options=action.payload
        }
    }
})
export const welcomeAction=welcomeSlice.actions
export const welcomeReducer=welcomeSlice.reducer
export default welcomeSlice;