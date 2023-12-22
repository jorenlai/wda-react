import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import exerciseReducer from "./exercise";

const store = configureStore({
    reducer: {
        user: userReducer
        ,exercise: exerciseReducer
    }
})

export default store