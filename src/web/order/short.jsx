import JCrud, { AddForm, ResultPanel, SearchPanel, UpdateForm } from '../component/JCrud'
import JForm from '../../jrx/JForm'
import { Input } from 'antd'

export default function OrderShort(){
    return <JCrud>
        <SearchPanel>
            <Input name={'name'} label={'代碼'}/>
            <Input name={'address'} label={'名稱'}/>
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
        <AddForm
            title={'新增'}
            get={{
                url:'get'
            }}
            post={{
                url:'post'
            }}
        >
            <Input name={'name'} label={'代碼'} Xrequired/>
            <Input name={'address'} label={'名稱'}/>
        </AddForm>
        <UpdateForm    
            title={'修改'}        
            get={{
                url:'get'
                ,response(){
                    return {
                        status:200
                        ,data:{
                            id:'aaa'
                            ,name:'Name'
                        }
                    }
                }
            }}
            put={{
                url:'post'
            }}
        >
            <Input name={'name'} label={'名稱'} required/>

        </UpdateForm>
    </JCrud>
}