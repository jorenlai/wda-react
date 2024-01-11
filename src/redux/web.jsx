import { createSlice } from "@reduxjs/toolkit";
import { po } from "../jrx/Util";

const name='web'
const initialState={
    name:null
    ,themeName:null
}

const initialStateWithStore={
    ...initialState,...JSON.parse(localStorage.getItem(name)||'{}')
}
const webSlice = createSlice({
    name
    ,initialState:initialStateWithStore
    ,reducers: Object.entries(initialState).reduce((aco,[key,value])=>{
        aco[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`]=(state, action) => {
            state[key] = action.payload;
            localStorage.setItem(name, JSON.stringify(state))
        }
        return aco;
    }
    ,{
        setState(state, action){
            Object.entries(action.payload).forEach(([key,value])=>state[key]=value)
        }
    })
});

export const webActions = webSlice.actions;
export default webSlice.reducer;