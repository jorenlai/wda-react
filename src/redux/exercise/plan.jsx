import { createSlice } from '@reduxjs/toolkit'
import { po } from '../../jrx/Util';


const name='plan'
const initialState={
    selectedIndex:0
    ,started:false
    ,answers:[]
}

const initialStateWithStore={
    ...initialState,...JSON.parse(localStorage.getItem(name)||'{}')
}

const planSlice = createSlice({
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
            localStorage.removeItem('plan')
            Object.entries(initialState).forEach(([key,value])=>{
                state[key]=value
                localStorage.setItem(name, JSON.stringify(state))
            })            
            state=null
        }
    })
});

export const planActions = planSlice.actions;
export default planSlice.reducer;