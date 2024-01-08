import { createSlice } from "@reduxjs/toolkit";

const initialState={
    buttons:null
    ,rightButtons:null
    ,paths:[]
}

const pathSlice = createSlice({
    name: 'path',
    initialState,
    reducers: Object.entries(initialState).reduce((aco,[key,value])=>{
        aco[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`]=(state, action) => {
            state[key] = action.payload;
        }
        return aco;
    },{
        setState(state, action){
            Object.entries(action.payload).forEach(([key,value])=>state[key]=value)
        }
    })
});

export const pathActions = pathSlice.actions;
export default pathSlice.reducer;