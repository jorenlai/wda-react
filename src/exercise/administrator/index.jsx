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
import  question  from './Question'

const StyledAdministratorApp=styled(JGrid)`
    > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
const StyledControllPanel=styled.div`
`

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
const leafLenght=getLeafLength(question,0,[])




const QuestionPanel=()=>{
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
        const selectedIndex=sum<=1 ? 1:sum>leafLenght?administrator.selectedIndex:sum
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

    const selectedQuestion=selectQues(question,administrator.selectedIndex,[])
    return <StyledQuestionPanel>
        <button>Start</button><button>Stop</button>
        <button onClick={()=>navQ(-1)}>Pre</button>
        {administrator.selectedIndex}
        <button onClick={()=>navQ(1)}>next</button><br/>
        {
            selectedQuestion
            ?.filter(q=>q.keys.length>0)
            .reduce((aco,q)=><IQuestion>
                    {q.ITitle}
                    {q.IDescription}
                    {aco}
                </IQuestion>
            ,null)
        }
        <br/>
    </StyledQuestionPanel>
}

export default function AdministratorApp(){

    return <StyledAdministratorApp grid={'auto / 200px 1fr'}>
        <StyledControllPanel colSpan={2}>Controll Panel</StyledControllPanel>
        <QuestionPanel/>
        <WebApp/>
    </StyledAdministratorApp>
} 