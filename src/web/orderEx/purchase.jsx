import styled from 'styled-components'
import JCrud, { ResultPanel } from '../component/JCrud'
import JForm from '../../jrx/JForm'

const StyledPurchase=styled.div`
    display: flex;
`

export default function Purchase(){
    return <JCrud>
        <ResultPanel
            type={JForm}
        >
            Purchase
        </ResultPanel>
    </JCrud>
}
