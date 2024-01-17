import React, { useEffect ,useState} from 'react'
import styled from 'styled-components'
import { useSelector , useDispatch } from 'react-redux'
import Select from '../jrx/ISelect'
import { po } from '../jrx/Util'
import SizeSelector from '../component/SizeSelector'
import Button from '../component/Button'

const StyledControllPanel=styled.div`
`

export default function ControllPanel({value, actions,selectorName,...props}){
    const dispatch = useDispatch()
    const selector = useSelector((state) => state[selectorName])
    const [selectedQuestion,setSelectedQuestion]=useState()
    const getQNum=()=>{
        return parseInt(value.keyList[ selector.selectedIndex]?.split('-')[0] ?? 0)
    }

    const selectQuestion=(num)=>{
        console.clear()
        let i= num   
        i=i<0?0:i>=value.level1QKeyList.length?value.level1QKeyList.length-1:i
        dispatch(actions.setSelectedIndex(value.level1QKeyList[i]))
    }

    const nav=(num)=>{
        if(value!=null){
            let i= getQNum()+num   
            i=i<0?0:i>=value.level1QKeyList.length?value.level1QKeyList.length-1:i
            dispatch(actions.setSelectedIndex(value.level1QKeyList[i]))
        }
    }

    useEffect(()=>{
        if(selector && value){
            setSelectedQuestion(getQNum())
        }
    },[selector.selectedIndex,value ])

    return <StyledControllPanel className={'controll-panel'} {...props}>
        <div>
            <button  disabled={selectedQuestion===0 || value==null || selector.started} onClick={()=>nav(-1)}>
                Pre
            </button>
            <div>
            <Select showBlank={false} disabled={selector.started}
                options={
                    Array(value?.level1QKeyList?.length??0).fill()
                    .map((a,id)=>{
                        return{
                            name:id+1,id
                        }
                    })
                }
                onChange={selectQuestion}
                value={selectedQuestion}
            />
            </div>
            <button disabled={selectedQuestion+1===value?.level1QKeyList?.length || value==null || selector.started}onClick={()=>nav(1)}>
                Next
            </button>
        </div>

        <div>Total:{value?.level1QKeyList?.length}</div>

        <div><SizeSelector/></div>
    </StyledControllPanel>
}