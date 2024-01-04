import React, { useEffect ,useState} from 'react'
import styled from 'styled-components'
import { useSelector , useDispatch } from 'react-redux'
// import {   actions } from '../../../redux/exercise/administrator'
// import { findQuestion } from './administrator'
import { po } from '../jrx/Util'


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
`

export default function QuestionPanel({value,actions,selectorName}){
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

            selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex

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

    const selectedQuestion=findQuestion(value?.questions,selector.selectedIndex)
    return <StyledQuestionPanel
        className={'question-panel'}
    >
        <button>Start</button><button>Stop</button><br/>

        <button onClick={()=>navSub(-1)} disabled={!navigable(-1)||value==null}>pre</button>
        {currentSub()}
        <button onClick={()=>navSub(1)} disabled={!navigable(1)||value==null}>next</button><br/>
        <ShowQuestion questions={selectedQuestion!=null?[selectedQuestion]:null}/>
    </StyledQuestionPanel>
}