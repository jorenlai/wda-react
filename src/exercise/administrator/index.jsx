import React, { useEffect } from 'react'
import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {   administratorActions } from '../../redux/exercise/administrator'

import styled from 'styled-components'

import WebApp from './WebApp'
import JGrid from '../../jrx/JGrid'
import IQuestion, { ITitle, IDescription } from './component/IQuestion'
import { po } from '../../jrx/Util'
import { useState } from 'react'
import JPanel from '../../jrx/JPanel'
import Select from '../../jrx/ISelect'

const StyledAdministratorApp=styled(JPanel)`
    > div > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
const StyledControllPanel=styled.div`
    grid-column: span 2;
`


const findQuestion=(questions,selectedIndex)=>{
    let index=-1
    const findQ=(questions,selectedIndex,t)=>{
        for(var i=0;i<questions?.length ?? 0;i++){
            const question=questions[i]
            if(question.questions?.length>0){
                const foundQ=findQ(question.questions,selectedIndex,`${t}\t`)
                if(foundQ){
                    question.subQuestion=foundQ
                    return {
                        ...question
                        ,questions:[foundQ]
                    }
                }
            }else if(selectedIndex===++index){
                return question
            }
        }
    }     
    return findQ(questions,selectedIndex,'')
}

const getQuestionParams=(questions,t)=>{
    let length=-1
    const keyMap={}
    const keyList=[]
    const keys=[]
    const level1QKeyList=[]

    const countLength=(questions,level,level1Index,key,keyArray,t)=>{
        for(var i=0;i<questions?.length ?? 0;i++){
            if(level===0) level1Index=i
            
            const question=questions[i]
            const _key=`${key}${i}`
            const _keyArray=[...keyArray??[],i]
            if(question.questions?.length>0){
                countLength(question.questions,level+1,level1Index,`${_key}-`,_keyArray,`${t}\t`)
            }else{
                ++length
                if(level1QKeyList[level1Index]==null){
                    level1QKeyList.push(length)
                }
                keys.push(_keyArray)
                keyList.push(_key)
                keyMap[_key]=length
            }
        }
    }

    countLength(questions,0,null,'',[],'')
    return {
        length,level1QKeyList,keyMap,keyList,keys
    }
}

const ControllPanel=({value})=>{
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
        dispatch(administratorActions.setSelectedIndex(value.level1QKeyList[i]))
    }

    const nav=(num)=>{
        if(value!=null){
            let i= getQNum()+num   
            i=i<0?0:i>=value.level1QKeyList.length?value.level1QKeyList.length-1:i
            dispatch(administratorActions.setSelectedIndex(value.level1QKeyList[i]))
        }
    }

    useEffect(()=>{
        if(administrator && value){
            setSelectedQuestion(getQNum())
        }
    },[administrator.selectedIndex,value ])

    return <StyledControllPanel  colSpan={2}>
        Total:{value?.level1QKeyList?.length}<br/>


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
        </button><br/>
    </StyledControllPanel>
}

/////////////////////////////////////
const StyledQuestionPanel=styled.div`
`

const allQKey={}

const QQuestion=({question})=>{
    return <div>{question?.question}
        {
            question?.questions?.map((question,index)=>{
                return <QQuestion question={question} key={index}/>
            })
        }
    </div>
}

const ShowQuestion=({questions})=>{
    return <div>Question
        {
            questions?.map((question,index)=>{
                return <QQuestion question={question} key={index}/>
            })
        }
    </div>
}

const QuestionPanel=({value})=>{
    const dispatch = useDispatch()
    const administrator = useSelector((state) => state.administrator)

    const navQ=(_num)=>{
        let selectIndex=administrator.selectedIndex+_num 
        selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex
        dispatch(administratorActions.setState(
            {
                selectedIndex: selectIndex
                ,selectedQKey:allQKey[selectIndex]
            }
        ))
    }   
    
    const navSub=(num)=>{
        console.clear()
        if(value){
            let selectIndex=administrator.selectedIndex+num 
            selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex
            const currentKeys=value.keys[administrator.selectedIndex]
            const currentParrentKeys=[...value.keys[administrator.selectedIndex]].splice(0,currentKeys.length-1)
            const futureParrentKeys=[...value.keys[selectIndex]].splice(0,currentKeys.length-1)

            if(currentParrentKeys.toString()===futureParrentKeys.toString()){
                dispatch(administratorActions.setSelectedIndex(selectIndex))
            }
        }
    } 

    const navigable=(num)=>{
        if(value){
            let selectIndex=administrator.selectedIndex+num 
            selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex
            const currentKeys=value.keys[administrator.selectedIndex]
            const currentParrentKeys=[...value.keys[administrator.selectedIndex]].splice(0,currentKeys.length-1)
            const futureParrentKeys=[...value.keys[selectIndex]].splice(0,currentKeys.length-1)

            return currentParrentKeys.toString()===futureParrentKeys.toString()
        }else{
            return true
        }
    } 

    useEffect(()=>{
        if(administrator.selectedIndex==null){
            dispatch(administratorActions.setState(
                {selectedIndex:1,selectedQKey:allQKey[1]}
           ))
        }
    },[])

    const currentSub=()=>{

        const keys=value?.keys[administrator.selectedIndex]??[]
        const i=keys[keys.length-1]
        return i==null?null:i+1
    }

    const selectedQuestion=findQuestion(value?.questions,administrator.selectedIndex)
    return <StyledQuestionPanel>
        <button>Start</button><button>Stop</button><br/>

        {/* <button onClick={()=>navQ(-1)}>pre</button>
        {administrator.selectedIndex}
        <button onClick={()=>navQ(1)}>next</button><br/><br/> */}

        <button onClick={()=>navSub(-1)} disabled={!navigable(-1)||value==null}>pre</button>
        {currentSub()}
        <button onClick={()=>navSub(1)} disabled={!navigable(1)||value==null}>next</button><br/>
        <ShowQuestion questions={selectedQuestion!=null?[selectedQuestion]:null}/>
    </StyledQuestionPanel>
}

export default function AdministratorApp(){
    return <StyledAdministratorApp 
        get={{
            url:'/question3.json'
            ,autoRun:true
            ,dataFormat(data){
                return {
                    questionParams:{
                        ...getQuestionParams(data)
                        ,questions:data
                    }
                }
            }
        }}
        cols={2}
    >
        <ControllPanel name={'questionParams'} colSpan={2}/>
        <QuestionPanel name={'questionParams'} />
        <WebApp/>
    </StyledAdministratorApp>
} 