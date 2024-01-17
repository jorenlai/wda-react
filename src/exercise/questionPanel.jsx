import React, { useEffect ,useState} from 'react'
import styled from 'styled-components'
import { useSelector , useDispatch } from 'react-redux'
import { po } from '../jrx/Util'
import { Button } from 'antd'
import large from '../theme/large.json'

const QQuestion=({question,keys,qkey,level})=>{
    po('question',question)
    po('key',qkey)
    const Tag=`h${level+1}`
    return <div key={qkey} className={'sub-question'}>
    <Tag>
        <div>{keys?.[level]+1}) </div>
        <div>{question?.question}</div>
    </Tag>
        {
            question?.questions?.map((question,index)=>{
                
                return <QQuestion question={question} keys={keys} key={`s${qkey}`} qkey={`${qkey}-${index}`} level={level+1}/>
            })
        }
    </div>
}

const ShowQuestion=({questions,keys,value,selector,actions,selectorName})=>{
    po('selector',selector)
    po('value',value)
    po('keys',keys)
    return <div className={'question'}>Question
        {
            questions?.map((question,index)=>{
                return <QQuestion keys={keys} question={question} key={`m${index}`} qkey={index} level={0}/>
            })
        }
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

const StyledQuestionPanel=styled.div`
    button{
        color: ${({theme})=>theme.color};
        size: ${({theme})=>theme.size};
    }


`

export default function QuestionPanel({doneCallback,value,actions,selectorName}){
    const dispatch = useDispatch()
    const selector = useSelector((state) => state[selectorName])

    const navSub=(num)=>{
        console.clear()
        if(value){
            let selectIndex=selector.selectedIndex+num 
            selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex
            const currentKeys=value.keys[selector.selectedIndex]
            const currentParrentKeys=[...value.keys[selector.selectedIndex]].splice(0,currentKeys.length-1)
            const futureParrentKeys=[...value.keys[selectIndex]].splice(0,currentKeys.length-1)

            if(currentParrentKeys.toString()===futureParrentKeys.toString()){
                dispatch(actions.setSelectedIndex(selectIndex))
            }
        }
    } 

    const navigable=(num)=>{
        if(value){
            let selectIndex=selector.selectedIndex+num 
            if(selectIndex===-1 || selectIndex>value.length){
                return false
            }

            const currentKeys=value.keys[selector.selectedIndex]
            const currentParrentKeys=[...value.keys[selector.selectedIndex]].splice(0,currentKeys.length-1)
            const futureParrentKeys=[...value.keys[selectIndex]].splice(0,currentKeys.length-1)

            return currentParrentKeys.toString()===futureParrentKeys.toString()
        }else{
            return true
        }
    } 

    const currentSub=()=>{

        const keys=value?.keys[selector.selectedIndex]??[]
        const i=keys[keys.length-1]
        return i==null?null:i+1
    }

    const hasSubQ=()=>{
        const key=value?.keys[selector.selectedIndex]
        
        return key?.length>1
    }

    const submitAnswer=()=>{
        const answers=[...selector.answers]
        answers.push(true)
        doneCallback?.()
        dispatch(actions.setState({
            selectedIndex:selector.selectedIndex+1
            ,started:false
            ,answers
        }))
    }

    const selectedQuestion=findQuestion(value?.questions,selector.selectedIndex)
    const answerOrder=selector.answers.length


    return <StyledQuestionPanel className={'question-panel'} theme={large}>
        <div className={'button-panel'}>
                {
                    hasSubQ()
                    && <div>
                        <button xsize={'small'} xstyle={{fontSize:'14px'}} onClick={()=>navSub(-1)} disabled={!navigable(-1)||value==null || selector.started}>A pre</button>
                        {currentSub()}
                        <button xsize={'large'} xstyle={{fontSize:'20px'}} onClick={()=>navSub(1)} disabled={!navigable(1)||value==null || selector.started}>Next</button>
                        <button xsize={'middle'} xstyle={{fontSize:'18px'}}>middle</button>
                    </div>
                }
                {
                    selector.started
                        ?<div>
                            <button
                                onClick={()=>{
                                    dispatch(actions.setStarted(false))
                                }}        
                            >
                                Stop
                            </button>
                            <button
                                onClick={submitAnswer}        
                            >
                                Done
                            </button>                
                        </div>
                        :        
                            selector.selectedIndex<=answerOrder
                            && <div><button disabled={selector.selectedIndex!==answerOrder}
                                        onClick={()=>{
                                            dispatch(actions.setStarted(true))
                                        }} 
                            >
                                {selector.selectedIndex<answerOrder?'Done':'Start'}
                            </button></div>
                    
                }

        </div>
        <ShowQuestion questions={selectedQuestion!=null?[selectedQuestion]:null} key={''}
            keys={value?.keys[selector.selectedIndex]} value={value} selector={selector} actions={actions} selectorName={selectorName}
        />
    </StyledQuestionPanel>
}