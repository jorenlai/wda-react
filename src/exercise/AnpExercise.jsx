import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { po } from '../jrx/Util';
import PlanApp from './plan';
import AdministratorApp from './administrator';

export default function AnpExercise(){
    const location = useLocation();
    const p=useParams()
    const navigate = useNavigate()


    const operations = <div><Button>Extra Action</Button></div>;
    const items = [
        {
            key: 'administrator'
            ,label: 'Tab 1'
            ,children: <Routes>
                <Route path='/administrator/*' element={<AdministratorApp/>}/>
            </Routes>
        },
        {
            key: 'plan'
            ,label: 'Tab 2'
            ,children:<Routes>
                <Route path='/plan' element={<PlanApp/>}/>
            </Routes>
        }
    ];
    return <div>
        <Tabs onChange={navigate} tabBarExtraContent={operations} defaultActiveKey={p['tab']==='plan'?'plan':'administrator'} items={items}/>
    </div>
}