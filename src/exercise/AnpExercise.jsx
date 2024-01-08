import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { po } from '../jrx/Util';
import PlanApp from './plan';
import {   administratorActions } from '../redux/exercise/administrator'
import {   planActions } from '../redux/exercise/plan'
import { useSelector , useDispatch } from 'react-redux'
import AdministratorApp from './administrator';
import { useEffect, useState } from 'react';

export default function AnpExercise(){
    const selectors ={
        administrator:useSelector((state) => state.administrator)
        ,plan:useSelector((state) => state.plan)
    } 
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
    ]

    const navigateTo=(key,b,c)=>{
        console.clear()
        const selector=selectors[key==='plan'?'administrator':'plan']
        po('key,b,c',key,b,c)
        po('selector[key]',selector)
        // if(selector.started){
        //     alert('Stop answering?')
        // }else{
            navigate(key)
        // }
    }
    return <div className={'anp-panel'}>
        <Tabs className={'anp-tab'} 
            onChange={navigateTo} 
            tabBarExtraContent={operations} 
            activeKey={p['*']==='plan'?'plan':'administrator'} 
            items={items}
        />
    </div>
}