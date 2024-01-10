import React, { useEffect } from 'react'
import {   adminActions } from '../../redux/exercise/admin'
import { useSelector , useDispatch } from 'react-redux'
import styled from 'styled-components'

import { po } from '../../jrx/Util'
import { useState } from 'react'
import JPanel from '../../jrx/JPanel'
import QuestionPanel,{getQuestionParams} from '../questionPanel'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ControllPanel from '../controllPanel'
import AnswerOrder from '../answerOrder'
import WebApp from '../../web'

const StyledAdministratorApp=styled(JPanel)`
    > div > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
export default function AdministratorApp(){
    const [value,setValue]=useState()
    const selector = useSelector((state) => state.administrator)

    const doneCallback=()=>{
        po('AdministratorApp doneCallback')
        return 
    }

    return <StyledAdministratorApp
        className={'con-adm'}
        get={{
            url:'/question.json'
            ,autoRun:true
            ,callback(success,res){
                setValue(res.data.questionParams)
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
        <ControllPanel value={value} actions={adminActions} selectorName={'administrator'}/>
        <PanelGroup direction="horizontal">
            <Panel minSize={10} defaultSize={25}>
                <QuestionPanel value={value} actions={adminActions} selectorName={'administrator'} doneCallback={doneCallback}/>
            </Panel>    
            <PanelResizeHandle/>
            <Panel minSize={30} defaultSize={75} style={{display:'flex'}}>
                <WebApp style={selector.started?null:{display:'none'}}/>
                <AnswerOrder value={value} style={selector.started?{display:'none'}:null} actions={adminActions} selectorName={'administrator'}/>
            </Panel>   
        </PanelGroup>
    </StyledAdministratorApp>

} 