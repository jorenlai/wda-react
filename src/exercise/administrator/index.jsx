import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import WebApp from './WebApp'
import IGrid from '../../jrx/IGrid'

const StyledAdministratorApp=styled(IGrid)`
    > * {
        border: 1px solid gray;
    }
    gap: 20px;
`
    
const StyledControllPanel=styled.div`
`

const StyledQuestionPanel=styled.div`
`

export default function AdministratorApp(){

    return <StyledAdministratorApp grid={'auto / 200px 1fr'}>
        <StyledControllPanel colSpan={2}>Controll Panel</StyledControllPanel>
        <StyledQuestionPanel>Question</StyledQuestionPanel>
        <WebApp/>
    </StyledAdministratorApp>
} 