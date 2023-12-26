import styled from 'styled-components'
import JGrid from '../../jrx/JGrid'
import JPanel from '../../jrx/JPanel'
import JForm from '../../jrx/JForm'
import { useEffect, useState } from 'react'
import { po } from '../../jrx/Util'
import { useSelector , useDispatch } from 'react-redux'
import { planActions } from '../../redux/exercise/plan'

const StyledPlanApp=styled(JPanel)`
`

const StyledControllPanel=styled.div`
    grid-column: span 2;
`

const ControllPanel=({questions})=>{
    const plan = useSelector((state) => state.plan)
    const dispatch = useDispatch()

    const nav=(num)=>{
        dispatch(planActions.setSelectedIndex(plan.selectedIndex+num))
    }
    return <StyledControllPanel>StyledControllPanel
        <button onClick={()=>nav(-1)}>pre</button>
        {plan.selectedIndex}
        <button onClick={()=>nav(1)}>next</button>
    </StyledControllPanel>
}

const QuestionPanel=({questions})=>{
    
    const plan = useSelector((state) => state.plan)
    const dispatch = useDispatch()
    
    const nav=(num)=>{
        dispatch(planActions.setSelectedIndex(plan.selectedIndex+num))
    }


    return <div>QuestionPanel ({plan.selectedIndex})
        <button onClick={()=>nav(-1)}>pre</button>
        <button onClick={()=>nav(1)}>next</button>
        <br/>{JSON.stringify(questions)}
    </div>
}

export default function PlanApp(){
    const [questions,setQuestions]=useState()
    const dispatch = useDispatch()
    const plan = useSelector((state) => state.plan)

  
    return <StyledPlanApp
        get={{
            url:'/plan.json'
            ,autoRun:true
            ,callback(success,res ){
                if(success){
                    po(res)
                    setQuestions(res.data.questions)
                }
            }
        }}
    >
        <JGrid grid={'auto / 1fr 4fr'}>
            <ControllPanel colSpan={2}/>
            <QuestionPanel questions={questions} />
            <JForm>
                <input name={'name'} label={'Name'}/>
            </JForm>
        </JGrid>
    </StyledPlanApp>
}