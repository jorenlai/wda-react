import React, { useEffect ,useState} from 'react'
import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector , useDispatch } from 'react-redux'
import {   adminActions } from '../../../redux/exercise/administrator'
import Select from '../../../jrx/ISelect'

const StyledControllPanel=styled.div`
`

export default function ControllPanel({value,...props}){
    const dispatch = useDispatch()
    const administrator = useSelector((state) => state.administrator)
    const [selectedQuestion,setSelectedQuestion]=useState()
    const getQNum=()=>{
        return parseInt(value.keyList[ administrator.selectedIndex]?.split('-')[0] ?? 0)
    }

    const selectQuestion=(num)=>{
        console.clear()
        let i= num   
        i=i<0?0:i>=value.level1QKeyList.length?value.level1QKeyList.length-1:i
        dispatch(adminActions.setSelectedIndex(value.level1QKeyList[i]))
    }

    const nav=(num)=>{
        if(value!=null){
            let i= getQNum()+num   
            i=i<0?0:i>=value.level1QKeyList.length?value.level1QKeyList.length-1:i
            dispatch(adminActions.setSelectedIndex(value.level1QKeyList[i]))
        }
    }

    useEffect(()=>{
        if(administrator && value){
            setSelectedQuestion(getQNum())
        }
    },[administrator.selectedIndex,value ])

    return <StyledControllPanel {...props}>
        Total:{value?.level1QKeyList?.length}
        <button  disabled={selectedQuestion===0 || value==null} onClick={()=>nav(-1)}>
            Pre
        </button>
        <Select showBlank={false} 
            options={
                Array(value?.level1QKeyList?.length??0).fill()
                .map((a,id)=>{
                    return{
                        name:id+1,id
                    }
                })
            }
            onChange={selectQuestion}
            value={selectedQuestion}
        />
        <button disabled={selectedQuestion+1===value?.level1QKeyList?.length || value==null}onClick={()=>nav(1)}>
            Next
        </button>
    </StyledControllPanel>
}