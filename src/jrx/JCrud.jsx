import styled from 'styled-components'
import { po } from './Util'
const StyledJCrud=styled.div`
    display: flex;
`

export function SearchPanel({children}){
    return <div>
        SearchPanel {children}
    </div>
}


export default function JCrud({children}){
    return <StyledJCrud>
        JCrud {children}
    </StyledJCrud>
}