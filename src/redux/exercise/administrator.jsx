import { createSlice } from '@reduxjs/toolkit'


const initialState={
    administrator: JSON.parse(localStorage.getItem('administrator')||'{}')
}

const administratorSlice = createSlice({
    name:'administrator'
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

export const administratorActions = administratorSlice.actions;
export default administratorSlice.reducer;