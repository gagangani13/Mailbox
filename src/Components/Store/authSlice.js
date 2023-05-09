import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={login:null,idToken:''}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        loginHandler(state,action){
            state.login=action.payload    
        },
        setToken(state,action){
            state.idToken=action.payload
        }
    }
})
export const authAction=authSlice.actions
export const authReducer=authSlice.reducer
export default authSlice;
