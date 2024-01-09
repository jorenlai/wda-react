import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import WebRouteConfig from '../exercise/administrator/route'
import { useEffect } from 'react'
import {pathActions} from '../redux/path'
import { po } from '../jrx/Util'

const StyledPath = styled.div`
    .path{
        background: #535353;
        display:flex;
        gap:4px;
    }
    .desc{
        background: #434343;
    }
`
export default function JPath(){
    const dispatch = useDispatch()
    const location = useLocation()
    const path = useSelector((state) => state.path)
    
    let paths=[]
    let url=location.pathname
    const findPath=(routes,aco)=>{
        let found=false;
        for(var x=0;x<routes.length && !found;x++){
            const route=routes[x]
            const regRoute=`/${route.path.replaceAll(/:\w+/g,"([^/]+)")}$`
            if(new RegExp(regRoute).test(url)){
                found=true
                paths=[...aco,route]
                return true
            }else if(route.items && findPath(route.items,[...aco,route])){
                found=true
                return true;
            }
        }
  
    }
    findPath(WebRouteConfig(),[])

    useEffect(() => {
        const items= paths.map(path=>{
            return {
                title: path.label
                ,hidden:path.hidden
            }
        })
        dispatch(pathActions.setPaths(items))
        
    }, [location]);

    return <StyledPath>
        <div className={'path'}>
            Path:{
                paths?.map((record,index)=>{
                    return <div key={index}> / {record.label} </div>
                })
            }
        </div>
        <div className={'desc'}>
            Desc...
        </div>
    </StyledPath>
    
}