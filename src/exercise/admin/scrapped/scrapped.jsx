import styled from 'styled-components'
import JCrud, { ResultPanel } from '../../../jrx/JCrud'
import JForm from '../../../jrx/JForm'

const StyledScrapped=styled.div`
    display: flex;
`

export default function Scrapped(){
    return <JCrud>
        <ResultPanel
            type={JForm}
        >
            Scrapped
        </ResultPanel>
    </JCrud>
}