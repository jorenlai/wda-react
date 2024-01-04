import JSubmit from "./JSubmit";
import styled from 'styled-components'

const StyledJEditor = styled.div`
    background: white;
    color: black;
    display:flex;
    flex-direction:column;
    Xborder: 10px solid blue;
    overflow: hidden;

`

const StyledTools = styled.div`
    background: gray;
    color: black;
`

const StyledEditorWapper = styled.div`
`

const StyledEditorScroll = styled.div`
    flex:1;
    background: white;
    color: black;
    display:flex;
    flex-direction:column;
    Xborder: 10px solid red;
    overflow: overlay;
`

const StyledEditor = styled.div`
    padding: 10px;
    background: white;
    color: black;
    flex:1;
    height:100%;
    outline: 0px solid transparent;

`


export default class JEditor extends JSubmit {
    componentDidMount() {
        super.componentDidMount();
    }

    setValue(value){
    }

    get value(){
        return this.state.value
    }

    render(){
        return <StyledJEditor className={'jr-editor'}>
            <StyledTools>Tools</StyledTools>
            <StyledEditorScroll>
                <StyledEditorWapper>
                    <StyledEditor contenteditable={"true"} ref={this.props.eRef}>
                    <img style={{width:"120px"}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                        AAAAAAA<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        A<br/><br/><br/><br/><br/>
                        ABBBBBB
                    </StyledEditor>
                </StyledEditorWapper>
            </StyledEditorScroll>
        </StyledJEditor>
    }
}