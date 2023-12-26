import JCrud, { ResultPanel, SearchPanel } from '../../../jrx/JCrud'


export default function OrderBook(){
    return <JCrud>
        <SearchPanel>
            <input name={'name'} label={'Name'}/>
            <input name={'address'} label={'Address'}/>
        </SearchPanel>
        <ResultPanel
            get={{
                url:'/plan.json'
            }}
        >
            OrderBook 
            <input name={'name'}  />
        </ResultPanel>
    </JCrud>
}