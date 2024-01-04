import React, { useEffect, useRef } from 'react'
import {   planActions } from '../../redux/exercise/plan'

import styled from 'styled-components'

import { po } from '../../jrx/Util'
import { useState } from 'react'
import JPanel from '../../jrx/JPanel'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ControllPanel from '../controllPanel'
import JForm from '../../jrx/JForm'
import { Input } from 'antd'
import JEditor from '../../jrx/JEditor'
import { toPng } from 'html-to-image'
import QuestionPanel,{getQuestionParams} from '../questionPanel'
import PlanForm from './planForm'

const StyledAdministratorApp=styled(JPanel)`
    > div > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    

export default function PlanApp(){
    const [value,setValue]=useState()
    return <StyledAdministratorApp
        className={'con-plan'}
        get={{
            url:'/question1.json'
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

        <ControllPanel value={value} actions={planActions} selectorName={'plan'}/>
        <PanelGroup direction="horizontal">
            <Panel minSize={10} defaultSizePercentage={25}>
                <QuestionPanel value={value}  actions={planActions} selectorName={'plan'}/>
            </Panel>    
            <PanelResizeHandle/>
            <Panel minSize={30} style={{display:'flex'}}>
                <PlanForm/>
            </Panel>   
        </PanelGroup>
    </StyledAdministratorApp>

} 