import  { useEffect,useState, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { exerciseActions } from '../redux/exercise'
import {   adminActions } from '../redux/exercise/admin'
import {   userActions } from '../redux/user'
import {   planActions } from '../redux/exercise/plan'
import {   webActions } from '../redux/web'
import  { useHistory,redirect, useNavigate, useParams   } from 'react-router-dom'
import JPanel from '../jrx/JPanel'
import { po } from '../jrx/Util'


export default function Init(){
	const { id,type } = useParams()
	const [isValidUser,setIsValidUser]=useState()
	const exercise = useSelector((state) => state.exercise)
	// po('Init exercise',exercise)
	const navigate=useNavigate()
	const dispatch = useDispatch()

	if(type!=='exercise'&&type!=='rehearsal')return
	if(exercise.startTime!=null){
		if(exercise.type!==type || exercise.startTime+exercise.time<Date.now()){//已過期 需更新
			// po('已過期 需更新+++++++++++++++++++')
			dispatch(userActions.reset())
			dispatch(exerciseActions.reset({type}))
			dispatch(adminActions.reset())
			dispatch(planActions.reset())
			dispatch(webActions.setThemeName(type))
			localStorage.removeItem('accessToken')
		}else{//未過期 不更新
			// po('未過期 不更新-------------------')
		}
	}else{
		// po('第一次....................')
		// dispatch(webActions.setThemeName(type))
	}
	
	
	
	return <JPanel
		className={'init-panel'}
		get={{
			url:'/token.json'
			,autoRun:true
			,value:{
				id
			}
			,XXXdataFormat(data){
				po('data',data)
				return data
			}
            ,callback(success,res){
				if(success){
					po('success res',res.data.token)
					localStorage.setItem('accessToken',res.data.token)
					navigate(`/${type}/ready`)
				}else{
					 setIsValidUser(false)
				}
            }
		}}
	>{isValidUser===false
		? <div>無效使用者</div>
		: <div>進入中...</div>
	}</JPanel>
}