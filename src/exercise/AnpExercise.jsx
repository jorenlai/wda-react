import { Routes, Route, useParams, useLocation,useNavigate } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { po } from '../jrx/Util';
import PlanApp from './plan';
import {   adminActions } from '../redux/exercise/admin'
import {   planActions } from '../redux/exercise/plan'
import { useSelector , useDispatch } from 'react-redux'
import AdministratorApp from './admin';
import { useEffect, useState } from 'react';

export default function AnpExercise(){
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
        navigate(key)
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