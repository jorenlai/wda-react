import { Routes, Route, useParams, useLocation,useNavigate, Link } from 'react-router-dom'
import { Menu as ADMenu} from 'antd'
import { po } from '../jrx/Util'
import WebRouteConfig from './route'
import styled from 'styled-components';

const StyledADMenu = styled(ADMenu)`
    overflow: auto;
    border-radius: 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius} 0;
`;

export default function Menu({menu}){
    const routeConfig=WebRouteConfig()
    const getMenu=(items,path,key)=>{
        const menu=items
            ?.reduce((aco,item,index)=>{
                const _path=`${path}${item.path}`
                const _key=`${key}${index}`
                const children=getMenu(item.items,`${_path}/`,`${_key}-`)
                aco.push({
                    key:_key
                    ,icon:item.icon
                    ,children
                    ,label:item.element
                        ?<Link to={_path} key={index}
                        >
                            {item.label}
                        </Link>
                        :item.label
                    ,type:null
                })
                return aco
            },[])
        return menu
    }
    const items=getMenu(routeConfig,'','')
    return <div className={'web-menu'}>
        <StyledADMenu items={items} mode={"inline"}/>
    </div>
}