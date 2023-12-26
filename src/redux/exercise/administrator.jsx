import { createSlice } from '@reduxjs/toolkit'


const name='administrator'
const initialState={
    selectedIndex:1
    ,...JSON.parse(localStorage.getItem(name)||'{}')
}


const administratorSlice = createSlice({
    name
    ,initialState
    ,reducers: Object.entries(initialState).reduce((aco,[key,value])=>{
        aco[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`]=(state, action) => {
            state[key] = action.payload
            localStorage.setItem(name, JSON.stringify(state))
        }
        return aco;
    }
    ,{
        setState(state, action){
            Object.entries(action.payload).forEach(([key,value])=>{
                state[key]=value
                localStorage.setItem(name, JSON.stringify(state))
            })
        }
    })
});

export const administratorActions = administratorSlice.actions;
export default administratorSlice.reducer;