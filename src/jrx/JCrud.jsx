import styled from 'styled-components'
import { po } from './Util'
import JForm from './JForm'
import { useRef } from 'react'
const StyledJCrud=styled.div`
    display: flex;
    flex-direction: column;
`



export function SearchPanel({children}){
    return <div>
        SearchPanel {children}
    </div>
}

export function ResultPanel({children}){
    return <div>
        ResultPanel {children}
    </div>
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
    po('items',items)
    /////////////////////////////////////////////////////////////////////////
    const searchPanelFormRef=useRef()
    const {
        children:searchChildren
    }=items.SearchPanel?.props ?? {}


    /////////////////////////////////////////////////////////////////////////
    const resultPanelFormRef=useRef()
    const {
        children:resultChildren
        ,get:resultGet
    }=items.ResultPanel?.props ?? {}




    return <StyledJCrud>
        {
            items.SearchPanel!=null &&
            <JForm cols={1} gap={0} ref={searchPanelFormRef}>
                <JForm.Grid cols={4}>
                    {searchChildren}
                </JForm.Grid>
                <JForm.Grid>
                    <button>Reset</button>
                    <button onClick={()=>{
                        po(searchPanelFormRef.current.getValue())
                        resultPanelFormRef.current.get()
                    }}>Search</button>
                </JForm.Grid>
            </JForm>
        }

        {
            items.ResultPanel!=null &&
            <JForm cols={1} gap={0} ref={resultPanelFormRef}
                get={{
                    ...resultGet
                }}
            >
                ResultPanel
                <JForm.Grid>
                {resultChildren}
                </JForm.Grid>
            </JForm>
        }
    </StyledJCrud>
}