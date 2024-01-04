import React, { useEffect } from 'react'
import {   administratorActions } from '../../redux/exercise/administrator'

import styled from 'styled-components'

import WebApp from './WebApp'
import { po } from '../../jrx/Util'
import { useState } from 'react'
import JPanel from '../../jrx/JPanel'
import QuestionPanel,{getQuestionParams} from '../questionPanel'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ControllPanel from '../controllPanel'

const StyledAdministratorApp=styled(JPanel)`
    > div > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
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
        <ControllPanel value={value} actions={administratorActions} selectorName={'administrator'}/>
        <PanelGroup direction="horizontal">
            <Panel minSize={10} defaultSizePercentage={25}>
                <QuestionPanel value={value} actions={administratorActions} selectorName={'administrator'}/>
            </Panel>    
            <PanelResizeHandle/>
            <Panel minSize={30} style={{display:'flex'}}>
                <WebApp/>
            </Panel>   
        </PanelGroup>
    </StyledAdministratorApp>

} 