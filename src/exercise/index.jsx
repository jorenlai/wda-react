import  { useEffect,useState, useRef } from 'react'
// import { useLocation } from 'react-router-dom'
import { Routes, Route,useLocation,useParams } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { Button, Tabs } from 'antd'
import { userActions } from '../redux/user'
import { exerciseActions } from '../redux/exercise'
import { webActions } from '../redux/web'
import dayjs from 'dayjs'

import AdministratorApp from './admin'
import { po } from '../jrx/Util'
import Timer from '../component/Timer'


import styled from 'styled-components'
import AnpExercise from './AnpExercise'
import JPanel from '../jrx/JPanel'
import InfoPanel from './infoPanel'




export default function  ExerciseApp(){
    const { type,topic} = useParams()
    const dispatch = useDispatch()
    const exercise = useSelector((state) => state.exercise)
    
    po('type',type,exercise.type,topic)
	if(
        (type!=='exercise'&&type!=='rehearsal')
        || (topic!=='anp')
        // || (exercise.type==='exercise' && type==='rehearsal')
    ){
		return
	};

    return <JPanel 
        className={'exercise'} gap={0} cols={1}
        waitForReadState={true}
        get={{
            url:`/${type}.json`
            ,autoRun:true
            ,dataFormat(data){
                return {exercise:data}
            }
            ,callback(success,res){
                if(success){
                    const {data:{exercise:{time}}}=res
                    if(exercise.startTime==null && !exercise.completed){
                        dispatch(webActions.setThemeName(type))
                        dispatch(exerciseActions.setState({
                            startTime:dayjs().valueOf()
                            ,timeUp:false
                            ,completed:false
                            ,type
                            ,time
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
            return exercise.timeUp 
                ?<div key={props.index}>Time's up</div>
                :<Routes key={props.index}>
                    <Route path='/*' element={<AnpExercise/>}/>
                </Routes>
        }}
    </JPanel>
} 