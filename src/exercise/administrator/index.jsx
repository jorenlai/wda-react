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
    const firstQKeyMap={}
    const level1QKeyList=[]
    const firstQKeyNav=[]

    const countLength=(questions,level,key,t)=>{
        for(var i=0;i<questions?.length ?? 0;i++){
            const question=questions[i]
            const _key=`${key}${i}`
            if(question.questions?.length>0){
                countLength(question.questions,level+1,`${_key}-`,`${t}\t`)
            }else{
                ++length
                if(i===0 || level===0){
                    firstQKeyMap[_key]=length
                    level1QKeyList.push(length)
                }
                keyList.push(_key)
                keyMap[_key]=length
            }
        }
    }

    countLength(questions,0,'','')
    return {
        firstQKeyNav,length,firstQKeyMap,level1QKeyList,keyMap,keyList
    }
}

const ControllPanel=({questions,questionParams})=>{
    const dispatch = useDispatch()
    const administrator = useSelector((state) => state.administrator)
    const [selectedQuestion,setSelectedQuestion]=useState()
    const getQNum=()=>{
        return parseInt(questionParams.keyList[ administrator.selectedIndex]?.split('-')[0] ?? 0)

    }
    const nav=(num)=>{
        let i= getQNum()+num   
        i=i<0?0:i>=questionParams.level1QKeyList.length?questionParams.level1QKeyList.length-1:i
        dispatch(administratorActions.setSelectedIndex(questionParams.level1QKeyList[i]))
    }

    useEffect(()=>{
        if(administrator && questionParams){
            setSelectedQuestion(getQNum())
        }
    },[administrator.selectedIndex,questionParams ])

    return <StyledControllPanel  colSpan={2}>
        Total:{questionParams?.level1QKeyList?.length}<br/>
        <button  disabled={selectedQuestion===0}
            onClick={()=>nav(-1)}
        >
            Pre
        </button>
            {selectedQuestion+1}
        <button disabled={selectedQuestion+1===questionParams?.level1QKeyList?.length}
            onClick={()=>nav(1)}
        >
            Next
        </button><br/>

        {administrator.selectedIndex}
    </StyledControllPanel>
}


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

const QuestionPanel=({questions,questionParams})=>{
    const dispatch = useDispatch()
    const administrator = useSelector((state) => state.administrator)

    const navQ=(_num)=>{
        const sum=administrator.selectedIndex+_num 
        const selectedIndex=sum<=0 ? 0:sum>questionParams.length?questionParams.length:sum
        dispatch(administratorActions.setState(
            {
                selectedIndex
                ,selectedQKey:allQKey[selectedIndex]
            }
        ))
    }   
    
    const nav=(num)=>{
        console.clear()
        po('questionParams',questionParams)
        po('index',administrator.selectedIndex)
        po('key',questionParams.keyList[administrator.selectedIndex])
        const keys=questionParams.keyList[administrator.selectedIndex]?.split('-').map((i)=>parseInt(i))
        
        
        po('keys',keys)
        let i=keys[keys.length-1]+num
        keys[keys.length-1]=i
        po('keys',keys)
        po('index',i)
        const joinKeys=keys.join('-')
        po('joinKeys ?',joinKeys)
        if(i>-1 && keys.length>1 &&questionParams.keyMap[joinKeys]!=null){
            dispatch(administratorActions.setSelectedIndex(administrator.selectedIndex+num))
        }
    } 

    useEffect(()=>{
        if(administrator.selectedIndex==null){
            dispatch(administratorActions.setState(
                {selectedIndex:1,selectedQKey:allQKey[1]}
           ))
        }
    },[])

    const selectedQuestion=findQuestion(questionParams?.questions,administrator.selectedIndex)
    return <StyledQuestionPanel>
        <button>Start</button><button>Stop</button><br/>
        <button onClick={()=>navQ(-1)}>pre</button>
        {administrator.selectedIndex}
        <button onClick={()=>navQ(1)}>next</button><br/><br/>

        <button onClick={()=>nav(-1)}>pre</button>
        <button onClick={()=>nav(1)}>next</button><br/>
        <ShowQuestion questions={selectedQuestion!=null?[selectedQuestion]:null}/>
    </StyledQuestionPanel>
}

export default function AdministratorApp(){
    const [question,setQuestion]=useState()
    const [questionParams,setQuestionParams]=useState()

    return <StyledAdministratorApp 
        get={{
            url:'/question3.json'
            ,autoRun:true
            ,callback(success,res){
                if(success){
                    setQuestionParams({
                        ...getQuestionParams(res.data)
                        ,questions:res.data
                    })
                    setQuestion(res.data)
                }
            }
        }}
    >
        <JGrid grid={'auto / 200px 1fr'}>
            <ControllPanel questions={question} questionParams={questionParams}/>
            <QuestionPanel questions={question} questionParams={questionParams}/>
            <WebApp/>
        </JGrid>
    </StyledAdministratorApp>
} 