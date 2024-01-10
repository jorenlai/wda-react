import JSubmit from "../JSubmit";
import styled from 'styled-components'
import { po } from "../Util";
import testImg from "../../exercise/plan/component/testImg";
import { toPng } from 'html-to-image'
import React, { useEffect, useRef } from "react";
import MapScreenshot from "./component/MapScreenshot";



const StyledJEditor = styled.div`
    xbackground: #111;
    color: black;
    display:flex;
    flex-direction:column;
    Xborder: 10px solid blue;
    overflow: hidden;
    flex:1;

`

const StyledTools = styled.div`
    display:flex;
    background: black;
    color: black;
    border:1px solid white;
    flex-wrap: wrap;
    padding: 6px;
    gap:6px ;
`

const StyledToolsGroup = styled.div`
    --b-size: 28px;

    display:flex;
    xborder:5px solid blue;
    button {
        border-radius: 0;
        border:1px solid gray;
        flex-wrap: nowrap;
        min-width:var(--b-size);
        min-height:var(--b-size);
        padding: 0 8px;
    }

    :first-child {
        border-radius: 6px 0 0 6px;
    }
    :last-child {
        border-radius: 0 6px 6px 0;
    }
`

const StyledEditorWapper = styled.div`
    xbackground: #666;
    flex:1;
    min-width: fit-content;
`

const StyledEditorScroll = styled.div`
    flex:1;
    xbackground: #aaa;
    color: black;
    display:flex;
    flex-direction:column;
    Xborder: 10px solid red;
    overflow: overlay;
`

const StyledEditor = styled.div`
    padding: 10px;
    background: #4a4a4a;
    color: white;
    flex:1;
    height:100%;
    outline: 0px solid transparent;

`




export default class JEditor extends JSubmit {
    constructor(props){
        super(props)
        this.editorRef=React.createRef()
    }

    componentDidMount() {
        super.componentDidMount();
    }

    setValue(value){
    }

    get value(){
        return this.state.value
    }

    getRange(){
        if (window.getSelection) {
            const sel=window.getSelection()
            if (sel.getRangeAt && sel.rangeCount) {
                const range = sel.getRangeAt(0);
                range.deleteContents();
                return range
            }
        }
    }

    addImg=()=>{
        console.clear()
        const range= this.getRange()
        // po(this.editorRef.current)
        // if (window.getSelection) {
        //     const sel=window.getSelection()
            if (range) {
                const oImg = document.createElement('img')
                oImg.src=testImg
        //         const range = sel.getRangeAt(0);
        //         range.deleteContents();
                range.insertNode( oImg );
            }
        // } else if (document.selection && document.selection.createRange) {
        //     po("xxxxxxxxxxxxx")
        // }
    }

    async getImage(){
        let data;
        await toPng(this.editorRef.current, { cacheBust: false })
        .then((dataUrl) => {

            const link = document.createElement("a");
            link.download = "my-image-name.png";
            link.href = dataUrl;
            link.click();
            data=dataUrl
        })
        .catch((err) => {
            console.log(err);
        })
        return data
    }

    download(){
        let data;
        toPng(this.editorRef.current, { cacheBust: false })
        .then((dataUrl) => {

            const link = document.createElement("a");
            link.download = "my-image-name.png";
            link.href = dataUrl;
            link.click();
            data=dataUrl
        })
        .catch((err) => {
            console.log(err);
        })
        return data
    }

    async getBase64(){
        let data;
        await toPng(this.editorRef.current, { cacheBust: false })
        .then((dataUrl) => {
            data= dataUrl
        })
        .catch((err) => {
            console.log(err);
        })
        return data
    }  
    
    addMap=(mapBase64)=>{
        po('adding map..........',mapBase64)
    }

    render(){
        return <StyledJEditor className={'jr-editor'}>

            <StyledTools>
                <StyledToolsGroup>
                    <button>A</button>
                    <button>B</button>
                    <button>C</button>
                </StyledToolsGroup>

                <StyledToolsGroup>
                    <button>X</button>
                    <button>Y</button>
                </StyledToolsGroup>

                <StyledToolsGroup>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                </StyledToolsGroup>

                <StyledToolsGroup>
                    <button onClick={this.addImg}>Add logo</button>
                    <MapScreenshot getRange={this.getRange}/>
                </StyledToolsGroup>
            </StyledTools>

            <StyledEditorScroll className={'editor-scroll'}>
                <StyledEditorWapper className={'editor-wapper'}>
                    <StyledEditor className={'editor'} id={'jrEditor'} contentEditable={"true"} ref={this.editorRef}/>
                </StyledEditorWapper>
            </StyledEditorScroll>
        </StyledJEditor>
    }
}