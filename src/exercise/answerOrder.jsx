import { useSelector , useDispatch } from 'react-redux'

import styled from 'styled-components'
import { po } from '../jrx/Util'
const StyledAnswerOrder=styled.div`

`

export default function AnswerOrder({style,value,selectorName,actions}){
    const dispatch = useDispatch()
    const selector = useSelector((state) => state[selectorName])
    const answerOrder=selector.answers.length
    const shouldAnswer=value?.keys[answerOrder]??[]

    const nav=(num)=>{
        console.clear()
        if(value){
            let selectIndex=selector.selectedIndex+num 
            selectIndex=selectIndex<=0 ? 0:selectIndex>value.length?value.length:selectIndex
                dispatch(actions.setSelectedIndex(selectIndex))
        }
    }

    return <StyledAnswerOrder style={style} className={'answer-order'}>
        <div>依序作答 主題{shouldAnswer[0]+1} {`${shouldAnswer[0,1]!=null?`子題${shouldAnswer[0,1]+1}`:''}`} </div>
        <div className={'buttons'}>
            {/* <button onClick={()=>nav(-1)}>
                pre
            </button> */}
            <button xxdisabled={selector.selectedIndex!==answerOrder}
                onClick={()=>{
                    dispatch(actions.setState({started:true,selectedIndex:answerOrder}))
                    
                }} 
            >
                {selector.selectedIndex<answerOrder?'Done':'Start'}
            </button>
            {/* <button onClick={()=>nav(1)}>
                next
            </button> */}
        </div>
    </StyledAnswerOrder>
}