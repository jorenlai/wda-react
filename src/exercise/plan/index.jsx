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
import QuestionPanel from '../administrator/component/questionPanel'

const StyledAdministratorApp=styled(JPanel)`
    > div > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
// export const findQuestion=(questions,selectedIndex)=>{
//     let index=-1
//     const findQ=(questions,selectedIndex,t)=>{
//         for(var i=0;i<questions?.length ?? 0;i++){
//             const question=questions[i]
//             if(question.questions?.length>0){
//                 const foundQ=findQ(question.questions,selectedIndex,`${t}\t`)
//                 if(foundQ){
//                     question.subQuestion=foundQ
//                     return {
//                         ...question
//                         ,questions:[foundQ]
//                     }
//                 }
//             }else if(selectedIndex===++index){
//                 return question
//             }
//         }
//     }     
//     return findQ(questions,selectedIndex,'')
// }

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

export default function PlanApp(){
    const editorRef=useRef()
    const [value,setValue]=useState()
    return <StyledAdministratorApp
        XXclassName={'con-plan'}
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
                <JForm
                    cols={2}
                    initialValues={{
                        report:<div><a href="www.google.com">This is link to google</a> Yes
                        <br/><br/><br/><br/><br/><br/>
                        <img style={{width:"20px"}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                        <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                        <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                        <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                        <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                        </div>
                    }}                
                >
                    <Input name={'name'} label={'Name'}/>
                    <JEditor  name={'report'} label={'Report'} eRef={editorRef}/>
                    <JForm.Grid>
                    <button
                        onClick={()=>{
                            console.clear()
                            po('ref',editorRef)
                            toPng(editorRef.current, { cacheBust: false })
                            .then((dataUrl) => {
                                po('dataUrl',dataUrl)
                            const link = document.createElement("a");
                            link.download = "my-image-name.png";
                            link.href = dataUrl;
                            link.click();
                            })
                            .catch((err) => {
                            console.log(err);
                            })

                        }}
                    >Submit</button>
                    </JForm.Grid>
                </JForm>  
            </Panel>   

        </PanelGroup>
    </StyledAdministratorApp>

} 