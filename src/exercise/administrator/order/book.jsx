import JCrud, { ResultPanel, SearchPanel } from '../../../jrx/JCrud'
import styled from 'styled-components'
import JPanel from '../../../jrx/JPanel'
import JForm from '../../../jrx/JForm'

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
            get={{
                url:'/plan.json'
                ,dataFormat(data){
                    return data.questions
                }
            }}
            columns={[
                {name:'question',label:'Question',sort:true}
                ,{name:'description',label:'Description',sort:true}
            ]}
        >
            OrderBook 
            <input name={'name'}  />
        </ResultPanel>
    </JCrud>
}
