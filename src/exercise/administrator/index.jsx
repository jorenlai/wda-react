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
// import ControllPanel from './component/controllPanel'
import QuestionPanel from './component/questionPanel'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ControllPanel from '../controllPanel'

const StyledAdministratorApp=styled(JPanel)`
    > div > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
export const findQuestion=(questions,selectedIndex)=>{
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

export const getQuestionParams=(questions,t)=>{
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

export default function AdministratorApp(){
    const [value,setValue]=useState()
    return <StyledAdministratorApp
        className={'con-adm'}
        get={{
            url:'/question.json'
            ,autoRun:true
            ,callback(success,res){
                setValue(res.data.questionParams)
                po(success,res.data.questionParams
                    )
            }
            ,dataFormat(data){
                return {
                    questionParams:{
                        ...getQuestionParams(data)
                        ,questions:data
                    }
                }
            }
        }}
        cols={1}
    >
        {/* <ControllPanel name={'questionParams'} colSpan={2} />
        <QuestionPanel name={'questionParams'} />
        <WebApp/> */}

        <ControllPanel value={value} name={'questionParams'} actions={administratorActions} selectorName={'administrator'}/>
        <PanelGroup direction="horizontal">
            <Panel minSize={10} defaultSizePercentage={25}>
                <QuestionPanel value={value} name={'questionParams'}/>
            </Panel>    
            <PanelResizeHandle/>
            <Panel minSize={30} style={{display:'flex'}}>
                <WebApp/>
            </Panel>   
        </PanelGroup>
    </StyledAdministratorApp>

} 