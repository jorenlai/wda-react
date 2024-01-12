import JCrud, { AddForm, ResultPanel, SearchPanel } from '../component/JCrud'
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
            {/* <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/> */}
        </SearchPanel>
        <ResultPanel
            get={{
                url:'/data.json'
            }}
            columns={[
                {name:'id',label:'代碼',sort:true,width:'200px'}
                ,{name:'name',label:'名稱',sort:true}
            ]}
        >
            OrderBook 
            <Input name={'name'}  />
        </ResultPanel>
        <AddForm>
            <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/>
        </AddForm>
    </JCrud>
}
