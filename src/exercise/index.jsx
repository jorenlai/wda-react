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
import JPanel from '../jrx/JPanel'


export function InfoPanel({value}){
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const onComplete=(a,b,c)=>{
        if(exercise.timeUp===false){
            dispatch(exerciseActions.setTimeUp(true))
        }
    }

    const exercise = useSelector((state) => state.exercise)
    return <div className={'info-panel'}>
        <Timer startTime={exercise.startTime} length={value.time} onComplete={onComplete} />
        <div>{user.name}{exercise.timeUp+""}</div>
        <a href={'/init/345345345-34-53-45-345'}>Init</a>
        <a href={'/exercise/reset'}>Reset</a>
    </div>
}

export default function ExerciseApp(){
    const topic={
        name:'exercise'
        ,time:1000 * 5
    }

    const dispatch = useDispatch()
    const exercise = useSelector((state) => state.exercise)
    

    // useEffect(()=>{
    //     po('exercise',exercise)
        
    //     if(exercise.startTime==null && !exercise.completed){
    //         dispatch(exerciseActions.setState({
    //             startTime:dayjs().valueOf()
    //             ,timeUp:false
    //             ,completed:false
    //         }))
    //     }else if(exercise.startTime+topic.time<Date.now()){
    //         dispatch(exerciseActions.setTimeUp(true))
    //     }
    // },[])


    return <JPanel 
        className={'exercise'} gap={0} cols={1}
        waitForReadState={true}
        get={{
            url:'/exercise.json'
            ,autoRun:true
            ,dataFormat(data){
                return {exercise:data}
            }
            ,callback(success,res){
                po('res',res)
                po('callback',this)
                if(success){
                    const {data:{exercise:{time}}}=res
                    if(exercise.startTime==null && !exercise.completed){
                        dispatch(exerciseActions.setState({
                            startTime:dayjs().valueOf()
                            ,timeUp:false
                            ,completed:false
                        }))
                    }else if(exercise.startTime+time<Date.now()){
                        dispatch(exerciseActions.setTimeUp(true))
                    }
                }else{
                    alert('Failed to load exercise')
                }
            }
        }}
    >
        <InfoPanel name={'exercise'}/>
        {function(props){
            po('props',props)
            po('func',this)
            return exercise.timeUp 
                ?<div key={props.index}>Time's up</div>
                :<Routes key={props.index}>
                    <Route path='/anp/*' element={<AnpExercise/>}/>
                </Routes>
        }}
    </JPanel>
} 