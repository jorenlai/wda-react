import  { useEffect,useState, useRef } from 'react'
// import { useLocation } from 'react-router-dom'
import { Routes, Route,useLocation,useParams } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { Button, Tabs } from 'antd'
import { userActions } from '../redux/user'
import { exerciseActions } from '../redux/exercise'
import dayjs from 'dayjs'

import AdministratorApp from './admin'
import { po } from '../jrx/Util'
import Timer from '../component/Timer'


import styled from 'styled-components'
import AnpExercise from './AnpExercise'
import JPanel from '../jrx/JPanel'

export default function InfoPanel({value}){
    const { type } = useParams()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const onComplete=(a,b,c)=>{
        if(exercise.timeUp===false){
            dispatch(exerciseActions.setTimeUp(true))
        }
    }

    const exercise = useSelector((state) => state.exercise)
    return <div className={'info-panel'}>
        <div>A</div>
        <div>{user.name}{exercise.timeUp+""}</div>
        <div>B</div>
        <a href={`/${type}/init/345345345-34-53-45-345`}>Init</a>
        <a href={`/${type}/reset`}>Reset</a>
        <Timer startTime={exercise.startTime} length={exercise.time} onComplete={onComplete} />
    </div>
}