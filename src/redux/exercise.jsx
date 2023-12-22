import { createSlice } from "@reduxjs/toolkit";
import { po } from "../jrx/Util";


const initialState={
    shopkeeper: JSON.parse(localStorage.getItem('shopkeeper')||"{}")
}

const exerciseSlice = createSlice({
    name: "exercise"
    ,initialState
    ,reducers: Object.entries(initialState).reduce((aco,[exerciseName])=>{
        aco[`set${exerciseName.charAt(0).toUpperCase()}${exerciseName.slice(1)}`]=(state, action) => {
            const st=JSON.parse( localStorage.getItem(exerciseName))
            Object.entries(action.payload).forEach(([key,value])=>{
                state[exerciseName][key]=value
                // st[key]=value
            })
            localStorage.setItem(exerciseName, JSON.stringify(state[exerciseName]))
            // po('set storage',st)
            po('state[exerciseName]',state[exerciseName])
        }
        return aco;
    }
    ,{
        setState(state, action){
            Object.entries(action.payload).forEach(([key,value])=>state[key]=value)
        }
    })
})

export const exerciseActions = exerciseSlice.actions;
export default exerciseSlice.reducer;