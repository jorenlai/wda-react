import styled from 'styled-components'
import { po } from './Util'
import JForm from './JForm'
import { useRef } from 'react'
import JXTable from './JXTable'
import ITable from './ITable'
import { Button } from 'antd'
import JPath from './JPath'
const StyledJCrud=styled.div`
    display: flex;
    flex-direction: column;
`



export function SearchPanel(){
}

export function ResultPanel({children}){
}

const getChildren=(children) =>{
    return (Array.isArray(children)
        ? children
        : children
            ? [children]
            : []
    )
    .filter((child)=>[SearchPanel,ResultPanel].indexOf(child.type)>-1)
    .reduce(( aco,child) => {
        aco[child.type.name]=child
        return aco;
    },{})
}

export default function JCrud({children}){
    const items=getChildren(children)
    /////////////////////////////////////////////////////////////////////////
    const searchPanelFormRef=useRef()
    const {
        children:searchChildren
        ,...searchProps
    }=items.SearchPanel?.props ?? {}


    /////////////////////////////////////////////////////////////////////////
    const resultPanelFormRef=useRef()
    const {
        children:resultChildren
        ,get:resultGet
        ,type:resultType
        ,...resultProps
    }=items.ResultPanel?.props ?? {}

    const ResultType=resultType??JXTable




    return <StyledJCrud
        className={'jr-crud'}
    >
        <JPath/>
        {
            items.SearchPanel!=null &&
            <JForm  
                className={'search-panel'}
                cols={1} gap={0} {...searchProps} ref={searchPanelFormRef}
            >
                <JForm.Grid cols={4}>
                    {searchChildren}
                </JForm.Grid>
                <JForm.Grid style={{width:'400px'}}>
                    <Button onClick={()=>{
                        searchPanelFormRef.current.resetFields()
                    }}>Reset</Button>
                    <Button onClick={()=>{
                        resultPanelFormRef.current.get({
                            value:searchPanelFormRef.current.getValue()
                        })
                    }}>Search</Button>
                </JForm.Grid>
            </JForm>
        }

        {
            items.ResultPanel!=null &&
            <ResultType 
                className={'result-panel'}
                scrollx
                cols={1} 
                gap={0} 
                ref={resultPanelFormRef} 
                {...resultProps}

                get={{
                    mask:'Loading...'
                    ,...resultGet
                }}
            >
                <JForm.Grid>
                {resultChildren}
                </JForm.Grid>
            </ResultType>
        }
    </StyledJCrud>
}