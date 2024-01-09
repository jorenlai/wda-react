import { createSlice } from "@reduxjs/toolkit";
import { po } from "../jrx/Util";
const initialState={
    name:null
    ,id:null
    ,token: null
}

const userSlice = createSlice({
    name: 'user'
    ,initialState
    ,reducers: Object.entries(initialState).reduce((aco,[key,value])=>{
        aco[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`]=(state, action) => {
            state[key] = action.payload;
        }
        return aco;
    }
    ,{
        setState(state, action){
            Object.entries(action.payload).forEach(([key,value])=>state[key]=value)
        }
        ,reset(state){
            po('reset user')
            localStorage.removeItem('user')
            state=null
        }
    })
});

export const userActions = userSlice.actions;
export default userSlice.reducer;