import JCrud, { ResultPanel, SearchPanel } from '../../../jrx/JCrud'
import styled from 'styled-components'
import JPanel from '../../../jrx/JPanel'
import JForm from '../../../jrx/JForm'
import { Input } from 'antd'

const StyledJCrud=styled(SearchPanel)`
    display: flex;
    flex-direction: column;
`
export default function OrderBook(){
    return <JCrud>
        <SearchPanel>
            <Input name={'name'} label={'Name'}/>
            <Input name={'address'} label={'Address'}/>
            <Input name={'name'} label={'Name'}/>
            <Input name={'address'} label={'Address'}/>
        </SearchPanel>
        <ResultPanel
            get={{
                url:'/plan.json'
                ,dataFormat(data){
                    return data.questions
                }
            }}
            columns={[
                {name:'question',label:'Question',sort:true,width:'200px'}
                ,{name:'description',label:'Description',sort:true}
            ]}
        >
            OrderBook 
            <Input name={'name'}  />
        </ResultPanel>
    </JCrud>
}
