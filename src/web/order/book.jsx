import JCrud, { ResultPanel, SearchPanel } from '../component/JCrud'
import styled from 'styled-components'
import JPanel from '../../jrx/JPanel'
import JForm from '../../jrx/JForm'
import { Input } from 'antd'

const StyledJCrud=styled(SearchPanel)`
    display: flex;
    flex-direction: column;
`
export default function OrderBook(){
    return <JCrud>
        <SearchPanel>
            <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/>
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
