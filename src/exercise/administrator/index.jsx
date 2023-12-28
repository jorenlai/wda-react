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
import  questionsf  from './Question'
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


const indexByMain=(i,question)=>{
    return 5
}

const findQuestion=(questions,selectedIndex)=>{
    let index=0
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
    // console.clear()

    let length=0
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

    // const nav_=(num)=>{
    //     let i= (selectedQuestion??0)+num   
    //     i=i<=0?0:i>=questionParams.level1QKeyList.length?questionParams.level1QKeyList.length-1:i
    //     setSelectedQuestion(i)
    // }

    const getQNum=()=>{
        return parseInt(questionParams.keyList[ administrator.selectedIndex-1]?.split('-')[0] ?? -1)

    }
    const nav=(num)=>{
        // const level1QIndex=parseInt(questionParams.keyList[ administrator.selectedIndex-1]?.split('-')[0] ?? -1)
        let i= getQNum()+num   
        i=i<=0?0:i>=questionParams.level1QKeyList.length?questionParams.level1QKeyList.length-1:i
        dispatch(administratorActions.setSelectedIndex(questionParams.level1QKeyList[i]))
    }

    useEffect(()=>{
        if(administrator && questionParams){
            // const level1QIndex=parseInt(questionParams?.keyList[ administrator.selectedIndex-1]?.split('-')[0] ?? -1)
            setSelectedQuestion(getQNum())
        }
    },[administrator.selectedIndex,questionParams ])

    return <StyledControllPanel  colSpan={2}>
        Total:{questionParams?.level1QKeyList?.length}<br/>
        <button
            onClick={()=>nav(-1)}
        >Pre</button>
            {selectedQuestion+1}
        <button
            onClick={()=>nav(1)}
            >Next</button><br/>

            {administrator.selectedIndex}
    </StyledControllPanel>
}


const StyledQuestionPanel=styled.div`
`

const allQKey={}
let leafNum=0
const getLeafLength=(question,length,keys)=>{
    const children= (Array.isArray(question.props.children)
        ? question.props.children
        : question.props.children
            ? [question.props.children]
            : []
    )
    .filter((child)=>{
        return child.type===IQuestion
    })

    if(children.length>0){
        children.forEach((child,i)=>{
            length+= getLeafLength(child,0,[...keys,i+1])
        })
        return length
    }else{
        allQKey[++leafNum]=keys
        return length+1
    }
}
const leafLenght=getLeafLength(questionsf,0,[])

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
    po('ShowQuestion',questions)
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
    let leafIndex=0

    const thisQ=(question,keys)=>{
        const a= (Array.isArray(question.props.children)
            ? question.props.children
            : question.props.children
                ? [question.props.children]
                : []
        )
        .filter((child)=>[ITitle,IDescription].indexOf(child.type)>-1)
        .reduce((aco,child) => {
            aco[child.type.name]=child
            return aco;
        },{keys})
        return a;
    }

    const selectQues=(question,selectedIndex,keys)=>{
        const children=Array.from(Array.isArray(question.props.children)
                ? question.props.children
                : question.props.children
                    ? [question.props.children]
                    : []
            )
            .filter((child)=>{
                return child.type===IQuestion
            })

        if(children.length>0){
            for(var i=0;i<children.length;i++){
                const child=children[i]
                const result=selectQues(child,selectedIndex,[...keys,i+1])
                if(result!=null) {
                    result.push(thisQ(question,keys))
                    return result
                }
            }
        }else if(++leafIndex===selectedIndex){
            return [thisQ(question,keys)]
        }
    }
    
    const navQ=(_num)=>{
        const sum=administrator.selectedIndex+_num 
        const selectedIndex=sum<=1 ? 1:sum//>leafLenght?administrator.selectedIndex:sum
        dispatch(administratorActions.setState(
            {
                selectedIndex
                ,selectedQKey:allQKey[selectedIndex]
            }
        ))
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
        <button onClick={()=>navQ(-1)}>Pre</button>
        {administrator.selectedIndex}
        <button onClick={()=>navQ(1)}>next</button><br/>
        <ShowQuestion questions={selectedQuestion!=null?[selectedQuestion]:null}/>
    </StyledQuestionPanel>
}

export default function AdministratorApp(){
    const [question,setQuestion]=useState()
    const [questionParams,setQuestionParams]=useState()

    return <StyledAdministratorApp 
        get={{
            url:'/question.json'
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