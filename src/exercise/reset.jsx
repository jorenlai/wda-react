import  { useEffect,useState, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { exerciseActions } from '../redux/exercise'
import  { useHistory,redirect   } from 'react-router-dom'

export default function ResetApp(){

    const topic={
        name:'administrator'
        ,time:1000 * 60 * 100 
    }


    const set=`set${topic.name.charAt(0).toUpperCase()}${topic.name.slice(1)}`
    const dispatch = useDispatch()
    const exercise = useSelector((state) => state.exercise)[topic.name]

    useEffect(()=>{
        // dispatch(exerciseActions.reset(topic.name))
        localStorage.removeItem('exercise')
        localStorage.removeItem('administrator')
        localStorage.removeItem('plan')
        redirect("/ready");
    },[])

    return <div>Resetting</div>
}