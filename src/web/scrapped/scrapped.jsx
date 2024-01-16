import styled from 'styled-components'
import JCrud, { Description, ResultPanel } from '../component/JCrud'
import JForm from '../../jrx/JForm'

const StyledScrapped=styled.div`
    display: flex;
`

export default function Scrapped(){
    return <JCrud>
        <Description>
            庫存業務....
        </Description>
        <ResultPanel
            type={JForm}
        >
            Scrapped
        </ResultPanel>
    </JCrud>
}