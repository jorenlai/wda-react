import { createSlice } from '@reduxjs/toolkit'
import { po } from '../jrx/Util'


const initialState={
    exercise: JSON.parse(localStorage.getItem('exercise')||'{}')
    ,administrator: JSON.parse(localStorage.getItem('administrator')||'{}')
    ,plan: JSON.parse(localStorage.getItem('plan')||'{}')
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
        ,reset(state, action){
            state[action.payload]={}
            localStorage.removeItem(action.payload)
        }
    })
})

export const exerciseActions = exerciseSlice.actions;
export default exerciseSlice.reducer;