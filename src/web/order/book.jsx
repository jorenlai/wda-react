import JCrud, { AddForm, Description, ResultPanel, SearchPanel } from '../component/JCrud'
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
        <Description>
            Description
        </Description>
        <SearchPanel>
            <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/>
            {/* <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/> */}
        </SearchPanel>
        <ResultPanel
            XXtype={JForm}
            get={{
                url:'/data.json'
            }}
            columns={[
                {name:'id',label:'代碼',sort:true,width:'200px'}
                ,{name:'name',label:'名稱',sort:true}
            ]}
        >
            OrderBook 
            <Input name={'name'} label={'名稱'} />
        </ResultPanel>
        {/* <AddForm>
            <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/>
        </AddForm> */}
    </JCrud>
}
