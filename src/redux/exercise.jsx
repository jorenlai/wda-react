import { createSlice } from '@reduxjs/toolkit'
import { po } from '../jrx/Util'


const name='exercise'
const initialState={
    selectedIndex:0
    ,startTime:null
    ,completed:null
    ,timeUp:null
}

const initialStateWithStore={
    ...initialState,...JSON.parse(localStorage.getItem(name)||'{}')
}


const exerciseSlice = createSlice({
    name
    ,initialState:initialStateWithStore
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
        ,reset(state){
            po('reset',name)
            localStorage.removeItem('exercise')
            Object.entries(initialState).forEach(([key,value])=>{
                state[key]=value
                localStorage.setItem(name, JSON.stringify(state))
            })
        }
    })
});

export const exerciseActions = exerciseSlice.actions;
export default exerciseSlice.reducer;