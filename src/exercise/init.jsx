import  { useEffect,useState, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { exerciseActions } from '../redux/exercise'
import {   webActions } from '../redux/exercise/web'
import {   userActions } from '../redux/user'
import {   planActions } from '../redux/exercise/plan'
import  { useHistory,redirect, useNavigate, useParams   } from 'react-router-dom'
import JPanel from '../jrx/JPanel'
import { po } from '../jrx/Util'


export default function Init(){
	const { id,type } = useParams()
    const navigate=useNavigate()
    const dispatch = useDispatch()
    dispatch(userActions.reset())
    dispatch(exerciseActions.reset())
    dispatch(webActions.reset())
    dispatch(planActions.reset())
	
	localStorage.removeItem('accessToken')
	
	if(type!=='exercise'&&type!=='rehearsal')return
	

	return <JPanel
		get={{
			url:'/token.json'
			,autoRun:true
			,value:{
				id
			}
			,dataFormat(data){
				po('data',data)
				return data
			}
            ,callback(success,res){
				if(success){
					po('res',res.data.token)
					localStorage.setItem('accessToken',res.data.token)
					navigate(`/${type}/ready`)
				}
            }
		}}
	/>
}