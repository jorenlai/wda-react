import JSubmit from "./JSubmit";
import styled from 'styled-components'

const StyledJEditor = styled.div`
    background: white;
    color: black;
`

const StyledEditor = styled.div`
    background: white;
    color: black;
`

const StyledTools = styled.div`
    background: gray;
    color: black;
`

export default class JEditor extends JSubmit {
    get value(){
        return this.props.value
    }

    render(){
        return <StyledJEditor >
            <StyledTools>TTTTTTTTTTTTTT</StyledTools>
            <div>
            <StyledEditor contenteditable={"true"} ref={this.props.eRef}>{this.value}</StyledEditor>
            </div>
        </StyledJEditor>
    }
}