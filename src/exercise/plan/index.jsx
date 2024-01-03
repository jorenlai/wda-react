import styled from 'styled-components'
import JGrid from '../../jrx/JGrid'
import JPanel from '../../jrx/JPanel'
import JForm from '../../jrx/JForm'
import { useEffect, useState } from 'react'
import { po } from '../../jrx/Util'
import { useSelector , useDispatch } from 'react-redux'
import { planActions } from '../../redux/exercise/plan'
import ControllPanel from '../controllPanel'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import JEditor from '../../jrx/JEditor'
import { useRef } from 'react'
import { Input } from 'antd'
import { toPng } from 'html-to-image'

const StyledPlanApp=styled(JPanel)`
`

const StyledControllPanel=styled.div`
     > * {
        border: 1px solid gray;
    }
    grid-column: span 2;
`

// const ControllPanel=({questions})=>{
//     const plan = useSelector((state) => state.plan)
//     const dispatch = useDispatch()

//     const nav=(num)=>{
//         dispatch(planActions.setSelectedIndex(plan.selectedIndex+num))
//     }
//     return <StyledControllPanel>StyledControllPanel
//         <button onClick={()=>nav(-1)}>pre</button>
//         {plan.selectedIndex}
//         <button onClick={()=>nav(1)}>next</button>
//     </StyledControllPanel>
// }

const QuestionPanel=({questions})=>{
    
    const plan = useSelector((state) => state.plan)
    const dispatch = useDispatch()
    
    const nav=(num)=>{
        dispatch(planActions.setSelectedIndex(plan.selectedIndex+num))
    }


    return <div style={{border:'1px solid blue'}}>QuestionPanel ({plan.selectedIndex})
        <button onClick={()=>nav(-1)}>pre</button>
        <button onClick={()=>nav(1)}>next</button>
        <br/>{JSON.stringify(questions)}
    </div>
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

export default function PlanApp(){
    const editorRef=useRef()
    const [value,setValue]=useState()
    const [questions,setQuestions]=useState()
    const dispatch = useDispatch()
    const plan = useSelector((state) => state.plan)

  
    return <StyledPlanApp
        className={'plan-panel'}
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
            <ControllPanel name={'questionParams'}  actions={planActions} selectorName={'plan'}/>
            <PanelGroup direction="horizontal">
                <Panel minSize={10} defaultSizePercentage={25}>
                    <QuestionPanel value={value} name={'questionParams'}/>
                </Panel>    
                <PanelResizeHandle/>
                <Panel minSize={30} style={{display:'flex'}}>
                    AAAAAAAAAAAA
                </Panel>   
            </PanelGroup>

            {/* <PanelGroup direction="horizontal">
            <Panel minSize={10} defaultSizePercentage={25}>
                <QuestionPanel value={value} name={'questionParams'}/>
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
        </PanelGroup> */}
    </StyledPlanApp>
}