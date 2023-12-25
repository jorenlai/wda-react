import  { useEffect,useState, useRef } from 'react'
// import { useLocation } from 'react-router-dom'
import { Routes, Route,useLocation,useParams } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { Button, Tabs } from 'antd'
import { userActions } from '../redux/user'
import { exerciseActions } from '../redux/exercise'
import dayjs from 'dayjs'

import AdministratorApp from './administrator'
import { po } from '../jrx/Util'
import Timer from '../component/Timer'


import styled from 'styled-components'
import AnpExercise from './AnpExercise'


export default function ExerciseApp(){

    const topic={
        name:'administrator'
        ,time:1000 * 60 * 100 
    }

    const set=`set${topic.name.charAt(0).toUpperCase()}${topic.name.slice(1)}`
    const dispatch = useDispatch()
    const exercise = useSelector((state) => state.exercise)[topic.name]
    
    
    const onComplete=(a,b,c)=>{
        if(exercise.timeUp===false){
            dispatch(exerciseActions[set]({
                timeUp:true
                ,completed:true
                ,startTime:null
            }))
        }
    }



    useEffect(()=>{
        if(exercise==null 
            || exercise.startTime==null 
            || exercise.completed 
            || exercise.startTime+topic.time<Date.now()
        ){
            dispatch(exerciseActions[set]({
                startTime:dayjs().valueOf()
                ,timeUp:false
                ,completed:false
            }))
        }
    },[])


    return <div>
        [{JSON.stringify(exercise)}]<br/>
        <Timer startTime={exercise.startTime} length={topic.time} onComplete={onComplete} />
        <Routes>
            <Route path='/anp/*' element={<AnpExercise/>}/>
        </Routes>
    </div>
} 