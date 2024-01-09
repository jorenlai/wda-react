import { useSelector , useDispatch } from 'react-redux'

import styled from 'styled-components'
import { po } from '../jrx/Util'
const StyledAnswerOrder=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;  
    
    .buttons{
        display:flex;
    }
`

export default function AnswerOrder({style,value,selectorName,actions}){
    const dispatch = useDispatch()
    const selector = useSelector((state) => state[selectorName])
    const answerOrder=selector.answers.length
    // po('answerOrder',answerOrder)
    const shouldAnswer=value?.keys[answerOrder]??[]

    const nav=(num)=>{
        console.clear()
        if(value){
            let selectIndex=selector.selectedIndex+num 
            selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex
                dispatch(actions.setSelectedIndex(selectIndex))
        }
    }

    return <StyledAnswerOrder style={style}>
        <div>請按試題順序作答 主問題{shouldAnswer[0]+1} {`${shouldAnswer[0,1]!=null?`子問題${shouldAnswer[0,1]+1}`:''}`} </div>
        <div className={'buttons'}>
            <button onClick={()=>nav(-1)}>
                pre
            </button>
            <button disabled={selector.selectedIndex!==answerOrder}
                        onClick={()=>{
                            dispatch(actions.setStarted(true))
                        }} 
            >
                {selector.selectedIndex<answerOrder?'Done':'Start'}
            </button>
            <button onClick={()=>nav(1)}>
                next
            </button>
        </div>
    </StyledAnswerOrder>
}