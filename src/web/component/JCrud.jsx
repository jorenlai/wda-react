import styled from 'styled-components'
import { po } from '../../jrx/Util'
import JForm from '../../jrx/JForm'
import { useRef } from 'react'
import JXTable from '../../jrx/JXTable'
import ITable from '../../jrx/ITable'
import { Button } from 'antd'
import JPath from '../path'
import { PlusCircleOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import JModal from '../../jrx/JModal'
import { useState } from 'react'
const StyledJCrud=styled.div`
    display: flex;
    flex-direction: column;
`
export function Description(){
}
export function AddForm(){
}
export function UpdateForm(){
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
    .filter((child)=>[Description,AddForm,UpdateForm,SearchPanel,ResultPanel].indexOf(child.type)>-1)
    .reduce(( aco,child) => {
        aco[child.type.name]=child
        return aco;
    },{})
}

export default function JCrud({children}){
    const items=getChildren(children)

    /////////////////////////////////////////////////////////////////////////
    const {
        children:descriptionChildren
        ,...descriptionProps
    }=items.Description?.props ?? {}

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
    const [isAddOpen, setIsAddOpen] = useState(false)
    const addFormRef=useRef()

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
                    setIsAddOpen(true)
                }}
            >
                新增
            </Button>
        )
    }
    //Update Form///////////////////////////////////////////////////////////////////////

    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const updateFormRef=useRef()
    const {
        children:updateFormChildren
        ,title:updateFormTitle
        ,setRef:setUpdateFormRef
        ,get:updateGet
        ,put:updatePut
        ,width:updateWidth='800px'
        ,remove:updateRemove
        ,cols:updateCols=1
        ,submit:updateSubmit
        ,saveButtonProps:updateSaveButtonProps
        ,rightBar:updateRightBar
        ,...updateFormProps
    }=items.UpdateForm?.props ?? {}

    /////////////////////////////////////////////////////////////////////////////////

    return <StyledJCrud className={'jr-crud'}>
        <JPath>
            {descriptionChildren}
        </JPath>
        {
            items.SearchPanel!=null &&
            <JForm  
                doNotShowErrorMessage={true}
                className={'search-panel'}
                cols={1} gap={0} {...searchProps} ref={searchPanelFormRef}
            >
                <JForm.Grid className={'inputs'}>
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
                    mask:'載入中...'
                    ,...resultGet
                }}
                onClick={items.UpdateForm!=null?()=>{
                    po('setIsUpdateOpen')
                    setIsUpdateOpen(true)
                }:undefined}
            >
                <JForm.Grid>
                {resultChildren}
                </JForm.Grid>
            </ResultType>
        }

        {
            items.AddForm!=null 
            && <JModal
                title={addFormTitle}
                okText={'新增'}
                destroyOnClose={true}
                closable={false}
                open={isAddOpen}
                onCancel={() => {
                    setIsAddOpen(false)
                }}
                onSave={()=>{
                    addFormRef.current.post()

                }}
            >
                <JForm ref={addFormRef}
                    post={{
                        mask:'新增中...'
                        ,successMessage:'新增成功'
                        ,failedMessage:'新增失敗'
                        ,callback(success){
                            if(success){
                                resultPanelFormRef.current.reload({
                                    mask:'重新載入中...'
                                })
                                setIsAddOpen(false)
                            }
                        }   
                        ,response(){
                            return {
                                status:200
                            }
                        }
                        ,...addPost                 
                    }}
                    {...addFormProps}
                >
                    {addFormChildren}
                </JForm>
            </JModal>
        }

        {
            items.UpdateForm!=null 
            && <JModal
                title={updateFormTitle}
                okText={'修改'}
                destroyOnClose={true}
                closable={false}
                open={isUpdateOpen}
                onCancel={() => {
                    setIsUpdateOpen(false)
                }}
                onSave={()=>{
                    updateFormRef.current.put()

                }}
            >
                <JForm ref={updateFormRef}
                    get={{
                        extraValue:{
                        }
                        ,autoRun:true
                        // ,mask:i18n({id:'msg_loading'})
                        // ,failedMessage:i18n({id:'msg_failed_to_load_data'})
                        // ,callback(success,res){
                        //     if(!success){
                        //         navigate(-1)
                        //     }
                        // }
                        ,...updateGet
                    }}                 
                    post={{
                        mask:'修改中...'
                        ,successMessage:'修改成功'
                        ,failedMessage:'修改失敗'
                        ,callback(success){
                            if(success){
                                resultPanelFormRef.current.reload({
                                    mask:'重新載入中...'
                                })
                                setIsAddOpen(false)
                            }
                        }   
                        ,response(){
                            return {
                                status:200
                            }
                        }
                    }}
                    {...updateFormProps}
                >
                    {updateFormChildren}
                </JForm>
            </JModal>
        }        

    </StyledJCrud>
}