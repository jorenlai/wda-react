import  { useEffect,useState, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { exerciseActions } from '../redux/exercise'
import {   administratorActions } from '../redux/exercise/administrator'
import {   userActions } from '../redux/user'
import {   planActions } from '../redux/exercise/plan'
import  { useHistory,redirect, useNavigate   } from 'react-router-dom'
import JPanel from '../jrx/JPanel'
import { po } from '../jrx/Util'


export default function Init(){
    const navigate=useNavigate()
    const dispatch = useDispatch()
    dispatch(userActions.reset())
    dispatch(exerciseActions.reset())
    dispatch(administratorActions.reset())
    dispatch(planActions.reset())


	localStorage.removeItem('accessToken')
	return <JPanel
		get={{
			url:'/token.json'
			,autoRun:true
			,value:{
				id:'839202334-g-eg34-w345'
			}
			,dataFormat(data){
				po('data',data)
				return data
			}
            ,callback(success,res){
				if(success){
					po('res',res.data.token)
					localStorage.setItem('accessToken',res.data.token)
					navigate('/exercise/ready')
				}
            }
		}}
	/>
}