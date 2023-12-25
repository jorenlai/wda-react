import { createSlice } from '@reduxjs/toolkit'
import { po } from '../jrx/Util'


const initialState={
    administrator: JSON.parse(localStorage.getItem('administrator')||'{}')
}

const exerciseSlice = createSlice({
    name:'exercise'
    ,initialState
    ,reducers: Object.entries(initialState).reduce((aco,[exerciseName])=>{
        aco[`set${exerciseName.charAt(0).toUpperCase()}${exerciseName.slice(1)}`]=(state, action) => {
            Object.entries(action.payload).forEach(([key,value])=>{
                state[exerciseName][key]=value
            })
            localStorage.setItem(exerciseName, JSON.stringify(state[exerciseName]))
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