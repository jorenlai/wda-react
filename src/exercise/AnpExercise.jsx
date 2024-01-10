import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { po } from '../jrx/Util';
import PlanApp from './plan';
import {   webActions } from '../redux/exercise/web'
import {   planActions } from '../redux/exercise/plan'
import { useSelector , useDispatch } from 'react-redux'
import AdministratorApp from './admin';
import { useEffect, useState } from 'react';

export default function AnpExercise(){
    // const selectors ={
    //     administrator:useSelector((state) => state.administrator)
    //     ,plan:useSelector((state) => state.plan)
    // } 
    const p=useParams()
    const navigate = useNavigate()


    const operations = <div><Button>Done</Button></div>;
    const items = [
        {
            key: 'admin'
            ,label: 'Test 1'
            ,children: <Routes>
                <Route path='/admin/*' element={<AdministratorApp/>}/>
            </Routes>
        },
        {
            key: 'plan'
            ,label: 'Test 2'
            ,children:<Routes>
                <Route path='/plan' element={<PlanApp/>}/>
            </Routes>
        }
    ]

    const navigateTo=(key,b,c)=>{
        console.clear()
        // const selector=selectors[key==='plan'?'web':'plan']
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
            activeKey={p['*']==='plan'?'plan':'admin'} 
            items={items}
        />
    </div>
}