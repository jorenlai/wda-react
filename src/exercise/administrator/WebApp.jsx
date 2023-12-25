import { Routes, Route,useNavigate } from 'react-router-dom'
import Menu from './menu'
import WebRouteConfig from './route'
import { useSelector , useDispatch } from 'react-redux'
import { exerciseActions } from '../../redux/exercise'
import { po } from '../../jrx/Util'

import styled from 'styled-components'
const StyledWebApp=styled.div`
    display: flex;
    gap: 22px;
`

const loop=(notes,path,key,level,paths,menus,navigate,dispatch,exercise)=>{
    notes?.forEach((record,i)=>{
        const _path=`${path}${record.path}`
        const _key=`${key}${i}`

        const menuParams={
            key:_key
        }

        if(record.component){
            menuParams.style={
                cursor: 'pointer'
            }

            menuParams.onClick=()=>{
                navigate(_path)
                const nav=exercise.nav ? exercise.nav.indexOf(_path)===-1 ? [...exercise.nav,_path]: exercise.nav: [_path]
                dispatch(exerciseActions.setAdministrator({nav}))
            }

            const pathParams={
                key:_path
                ,path:_path
                ,element:<record.component/>
            }
            paths.push(<Route  {...pathParams}  />)
        }

        menus.push(<div {...menuParams} >
            {record.label}
        </div>)

        if(record.items){
            loop(record.items,`${_path}/`,`${_key}-`,level+1,paths,menus,navigate,dispatch,exercise)
        }
    })
}

export default function WebApp(){
    const dispatch = useDispatch()
    const exercise = useSelector((state) => state.exercise)['administrator']

    const navigate = useNavigate()
    const routeConfig=WebRouteConfig()
    const routes=[]
    const menus=[]
    loop(routeConfig,'','',0,routes,menus,navigate,dispatch,exercise)
    return <StyledWebApp>
        <Menu menu={menus}/>
        <Routes>
            {routes}
        </Routes>  
        {JSON.stringify(exercise.nav)}
    </StyledWebApp>
}