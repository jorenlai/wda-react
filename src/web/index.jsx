import { Routes, Route,useNavigate, useParams } from 'react-router-dom'
import Menu from './menu'
import WebRouteConfig from './route'
import { useSelector , useDispatch } from 'react-redux'
import { adminActions } from '../redux/exercise/admin'
import { po } from '../jrx/Util'

import styled from 'styled-components'
import Header from './header'
const StyledWebApp=styled.div`
    display: flex;
    gap: 22px;
`

const loop=(notes,path,key,level,paths,menus,navigate,dispatch,exercise,type)=>{
    // po('exercise.type',exercise.type,type)
    notes?.forEach((record,i)=>{
        const _path=`${path}${record.path}`
        const _key=`${key}${i}`

        const menuParams={
            key:_key
        }

        if(record.element){
            menuParams.style={
                cursor: 'pointer'
            }

            menuParams.onClick=()=>{
                navigate(_path)
                const nav=exercise.nav ? exercise.nav.indexOf(_path)===-1 ? [...exercise.nav,_path]: exercise.nav: [_path]
                dispatch(adminActions.setState({nav}))
            }

            const pathParams={
                key:_path
                ,path:_path
                ,element:<record.element/>
            }
            paths.push(<Route {...pathParams}/>)
        }

        menus.push(<div title={_path} style={{background:`${record.element==null?'#515151':'red'}`}} {...menuParams} >
            {record.label}
        </div>)

        if(record.items){
            loop(record.items,`${_path}/`,`${_key}-`,level+1,paths,menus,navigate,dispatch,exercise,type)
        }
    })
}

export default function WebApp(props){
    const { type } = useParams()
    po('web type',type)
    const dispatch = useDispatch()
    const exercise = useSelector((state) => state.exercise)

    const navigate = useNavigate()
    const routeConfig=WebRouteConfig()
    const routes=[]
    const menus=[]
    loop(routeConfig,'','',0,routes,menus,navigate,dispatch,exercise,type)

    return <StyledWebApp style={props.style} className={'web-app'}>
        <Header className={'web-header'}/>
        <div className={'middle'}>
            <Menu menu={menus} className={'menu'}/>
            <div className={'body'}>
            <Routes>
                {routes}
            </Routes>  
            </div>
        </div>
        <footer className={'footer'}></footer>
    </StyledWebApp>
}