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
    const keys=[]
    // const firstQKeyMap={}
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
                    // firstQKeyMap[_key]=length
                    level1QKeyList.push(length)
                }
                keys.push(_keyArray)
                keyList.push(_key)
                keyMap[_key]=length
            }
        }
    }

    countLength(questions,0,null,'',[],'')
    // po('firstQKeyMap',firstQKeyMap)
    po('level1QKeyList',level1QKeyList)
    return {
        length,level1QKeyList,keyMap,keyList,keys
    }
}

const ControllPanel=({questions,questionParams})=>{
    const dispatch = useDispatch()
    const administrator = useSelector((state) => state.administrator)
    const [selectedQuestion,setSelectedQuestion]=useState()
    const getQNum=()=>{
        return parseInt(questionParams.keyList[ administrator.selectedIndex]?.split('-')[0] ?? 0)

    }

    const selectQuestion=(num)=>{
        console.clear()
        po('questionParams',questionParams)
        let i= num   
        i=i<0?0:i>=questionParams.level1QKeyList.length?questionParams.level1QKeyList.length-1:i
        dispatch(administratorActions.setSelectedIndex(questionParams.level1QKeyList[i]))
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

        <button onClick={()=>selectQuestion(0)}>1</button>
        <button onClick={()=>selectQuestion(1)}>2</button>

        <br/>
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
/////////////////////////////////////
const QuestionPanel=({questions,questionParams})=>{
    const dispatch = useDispatch()
    const administrator = useSelector((state) => state.administrator)

    const navQ=(_num)=>{
        let selectIndex=administrator.selectedIndex+_num 
        selectIndex=selectIndex<=0 ? 0:selectIndex>questionParams.length?questionParams.length:selectIndex
        dispatch(administratorActions.setState(
            {
                selectedIndex: selectIndex
                ,selectedQKey:allQKey[selectIndex]
            }
        ))
    }   
    
    const navSub=(num)=>{
        console.clear()
        po('questionParams',questionParams)
        po('index',administrator.selectedIndex)

        let selectIndex=administrator.selectedIndex+num 
        selectIndex=selectIndex<=0 ? 0:selectIndex>questionParams.length?questionParams.length:selectIndex
        const currentKeys=questionParams.keys[administrator.selectedIndex]
        po('selectIndex',selectIndex)
        po('current key',currentKeys)
        const currentParrentKeys=[...questionParams.keys[administrator.selectedIndex]].splice(0,currentKeys.length-1)
        po('currentParrentKeys',currentParrentKeys)
        const futureParrentKeys=[...questionParams.keys[selectIndex]].splice(0,currentKeys.length-1)
        po('futureParrentKeys',futureParrentKeys)

        if(currentParrentKeys.toString()===futureParrentKeys.toString()){
            dispatch(administratorActions.setSelectedIndex(selectIndex))
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

        <button onClick={()=>navSub(-1)}>pre</button>
        <button onClick={()=>navSub(1)}>next</button><br/>
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