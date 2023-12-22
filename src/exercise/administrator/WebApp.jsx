import { Routes, Route,useNavigate } from 'react-router-dom'
import Menu from './menu'
import WebRouteConfig from './route'
import styled from 'styled-components'
import { po } from '../../jrx/Util'

const StyledWebApp=styled.div`
    display: flex;
`

const loop=(notes,path,key,level,paths,menus,navigate)=>{
    notes?.forEach((record,i)=>{
        const _path=`${path}${record.path}`
        const _key=`${key}${i}`

        const menuParams={
            key:_key
        }

        if(record.component){
            menuParams.onClick=()=>{
                navigate(_path)
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
            loop(record.items,`${_path}/`,`${_key}-`,level+1,paths,menus,navigate)
        }
    })
}

export default function WebApp(){
    const navigate = useNavigate()
    const routeConfig=WebRouteConfig()
    const routes=[]
    const menus=[]
    loop(routeConfig,'','',0,routes,menus,navigate)
    return <StyledWebApp>
        <Menu menu={menus}/>
        <Routes>
            {routes}
        </Routes>  
    </StyledWebApp>
}