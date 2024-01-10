import  { useEffect,useState, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { exerciseActions } from '../redux/exercise'
import {   adminActions } from '../redux/exercise/admin'
import {   planActions } from '../redux/exercise/plan'
import  { useHistory,redirect   } from 'react-router-dom'

export default function ResetApp(){
    const dispatch = useDispatch()
    useEffect(()=>{
        console.clear()
        dispatch(exerciseActions.reset())
        dispatch(adminActions.reset())
        dispatch(planActions.reset())
    },[])
    return <div>Resetting</div>
}