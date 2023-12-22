import { createSlice } from "@reduxjs/toolkit";
// import Cookies from 'universal-cookie'
// import { po } from "../jrx/Util";
// const cookies = new Cookies();
const initialState={
    details:null
    ,name:null
    ,token: null
    ,refreshToken: null
    ,langs:[
        {value:'tw',label:'繁體中文'}
        ,{value:'cn',label:'简体中文'}
        ,{value:'en',label:'English'}
    ]
}

const userSlice = createSlice({
    name: "user"
    ,initialState:{
        ...initialState
        // ,locale:storage.getItem('locale') ?? 'tw'
        // ,area:storage.getItem('area') ?? 'T'
    }
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
        // ,setArea(state, action){
        //     // cookies.set('area', action.payload, { path: '/',secure: true,sameSite :true} );
        //     storage.setItem('area', action.payload)
        //     state.area=action.payload
        // }
        // ,setLocale(state, action){
        //     // cookies.set('locale', action.payload, { path: '/',secure: true,sameSite :true} );
        //     storage.setItem('locale', action.payload)
        //     state.locale=action.payload
        // }
    })
});

export const userActions = userSlice.actions;
export default userSlice.reducer;