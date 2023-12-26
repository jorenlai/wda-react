import JCrud, { ResultPanel, SearchPanel } from '../../../jrx/JCrud'
import styled from 'styled-components'
import JPanel from '../../../jrx/JPanel'

const StyledJCrud=styled(SearchPanel)`
    display: flex;
    flex-direction: column;
`
export default function OrderBook(){
    return <JCrud>
        <SearchPanel>
            <input name={'name'} label={'Name'}/>
            <input name={'address'} label={'Address'}/>
        </SearchPanel>
        <ResultPanel
            // type={JPanel}
            get={{
                url:'/plan.json'
            }}
        >
            OrderBook 
            <input name={'name'}  />
        </ResultPanel>
    </JCrud>
}