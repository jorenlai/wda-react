import { createSlice } from "@reduxjs/toolkit";
import { po } from "../jrx/Util";


const name='user'
const initialState={
    name:null
    ,id:null
    ,token:null
}

const initialStateWithStore={
    fontSize:'medium'
    ,...initialState
    ,...JSON.parse(localStorage.getItem(name)||'{}')
}

const userSlice = createSlice({
    name: 'user'
    ,initialState:initialStateWithStore
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
        ,setFontSize(state, action){
            po('setFontSize',action.payload)
            state.fontSize=action.payload
            localStorage.setItem(name, JSON.stringify(state))
        }
        ,reset(state, action){
            po('reset',name,action)
            localStorage.removeItem(name)
            Object.entries({...initialState,...action.payload}).forEach(([key,value])=>{
                state[key]=value
                localStorage.setItem(name, JSON.stringify(state))
            })
        }
    })
});

export const userActions = userSlice.actions;
export default userSlice.reducer;