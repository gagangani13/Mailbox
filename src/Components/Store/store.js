import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { welcomeReducer } from "./welcomeSlice";
const store=configureStore({
    reducer:{authenticate:authReducer,welcomeReducer:welcomeReducer}
})
export default store;