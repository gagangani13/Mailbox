import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={login:false,idToken:'',sentByEmail:''}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        loginHandler(state){
            state.login=true    
        },
        logoutHandler(state){
            state.login=false
        },
        setToken(state,action){
            state.idToken=action.payload
        },
        setSentByEmail(state,action){
            state.sentByEmail=action.payload
        }
    }
})
export const authAction=authSlice.actions
export const authReducer=authSlice.reducer
export default authSlice;
