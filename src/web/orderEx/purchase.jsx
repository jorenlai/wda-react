import styled from 'styled-components'
import JCrud, { ResultPanel, SearchPanel } from '../component/JCrud'
import JForm from '../../jrx/JForm'
import { Input } from 'antd'

const StyledPurchase=styled.div`
    display: flex;
`

export default function Purchase(){
    return <JCrud>
        {/* <SearchPanel>
            <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/>
        </SearchPanel>         */}
        <ResultPanel
            gridStyle={{
                flexDirection: 'row'
                ,display: 'flex'
            }}
            type={JForm}
        >
            <div style={{fontSize:'xx-small'}}>xx-small</div>
            <div style={{fontSize:'x-small'}}>x-small</div>
            <div style={{fontSize:'small'}}>small</div>
            <div style={{fontSize:'medium'}}>medium</div>
            <div style={{fontSize:'large'}}>large</div>
            <div style={{fontSize:'x-large'}}>x-large</div>
            <div style={{fontSize:'xx-large'}}>xx-large</div>
            <div style={{fontSize:'xxx-large'}}>xxx-large</div>
        </ResultPanel>
    </JCrud>
}
