import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import exerciseReducer from "./exercise";
import planReducer from "./exercise/plan";
import administratorReducer from './exercise/admin'
const store = configureStore({
    reducer: {
        user: userReducer
        ,plan:planReducer
        ,administrator:administratorReducer
        ,exercise: exerciseReducer
    }
})

export default store