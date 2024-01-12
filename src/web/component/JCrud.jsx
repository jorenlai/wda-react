import styled from 'styled-components'
import { po } from '../../jrx/Util'
import JForm from '../../jrx/JForm'
import { useRef } from 'react'
import JXTable from '../../jrx/JXTable'
import ITable from '../../jrx/ITable'
import { Button } from 'antd'
import JPath from '../path'
import { PlusCircleOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
const StyledJCrud=styled.div`
    display: flex;
    flex-direction: column;
`

export function AddForm(){
}

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
    .filter((child)=>[AddForm,SearchPanel,ResultPanel].indexOf(child.type)>-1)
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

    /////////////////////////////////////////////////////////////////////////////////
    const searchButtons=[
        <Button className={'convex'} key={'sbr'}
        icon={<RedoOutlined/>}
        onClick={()=>{
            searchPanelFormRef.current.resetFields()
        }}
    >重設</Button>
    ,<Button type={'primary'} className={'convex'} key={'sbs'}
        icon={<SearchOutlined/>}
        onClick={()=>{
            resultPanelFormRef.current.get({
                value:searchPanelFormRef.current.getValue()
            })
        }}
    >查詢</Button>
]    
    //Add Form///////////////////////////////////////////////////////////////////////
    const {children:addFormChildren
        ,title:addFormTitle
        ,url:addUrl
        ,post:addPost
        ,cols:addCols=1
        ,...addFormProps
    }=items.AddForm?.props ?? {}

    if(items.AddForm){
        searchButtons.unshift(
            <Button type={'primary'} className={'convex'}
                icon={<PlusCircleOutlined/>}
                onClick={()=>{
                }}
            >
                新增
            </Button>
        )
    }
    /////////////////////////////////////////////////////////////////////////////////
    return <StyledJCrud className={'jr-crud'}>
        <JPath/>
        {
            items.SearchPanel!=null &&
            <JForm  
                doNotShowErrorMessage={true}
                className={'search-panel'}
                cols={1} gap={0} {...searchProps} ref={searchPanelFormRef}
            >
                <JForm.Grid cols={4} className={'inputs'}>
                    {searchChildren}
                </JForm.Grid>
                <JForm.Grid className={'buttons'}>
                    {searchButtons}
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