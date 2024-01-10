import JCrud, { ResultPanel } from '../../../jrx/JCrud'
import JForm from '../../../jrx/JForm'

export default function OrderShort(){
    return <JCrud>
        <ResultPanel
            type={JForm}
        >
            OrderShort
        </ResultPanel>
    </JCrud>
}