import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect } from 'react'
import {pathActions} from '../redux/path'
import { po } from '../jrx/Util'
import WebRouteConfig from './route'
import { HomeOutlined } from '@ant-design/icons'

const StyledPath = styled.div`

`
export default function JPath({children}){
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

    po('paths',paths)
    return <StyledPath className={'jr-path'}>
        <div className={'path'}>
            <HomeOutlined className={'current'}/> : {
                paths?.map((record,index)=>{
                    return <div key={index} className={paths?.length===index+1?'current':null}> / {record.label} </div>
                })
            }
        </div>
        {children!=null && 
            <div className={'desc-p'}>
                <div className={'desc'}>
                    {children}
                </div>
            </div>
        }
    </StyledPath>
    
}