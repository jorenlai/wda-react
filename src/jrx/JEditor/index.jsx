import JSubmit from "../JSubmit";
import styled from 'styled-components'
import { po } from "../Util";
import testImg from "../../exercise/plan/component/testImg";
import { toPng } from 'html-to-image'
import JMap from "../../component/JMap";
import React, { useEffect, useRef } from "react";
import { Modal } from "antd";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
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
    xbackground: #fb8a04;
    color: black;
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
    xbackground: #f8eee4;
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
        //     if (sel.getRangeAt && sel.rangeCount) {
                const oImg = document.createElement('img')
                oImg.src=testImg
        //         const range = sel.getRangeAt(0);
        //         range.deleteContents();
                range.insertNode( oImg );
        //     }
        // } else if (document.selection && document.selection.createRange) {
        //     po("xxxxxxxxxxxxx")
        // }
    }

    async getImage(){
        po('ref',this.editorRef)
        let data;
        await toPng(this.editorRef.current, { cacheBust: false })
        .then((dataUrl) => {
            // po('dataUrl',dataUrl)

            const link = document.createElement("a");
            link.download = "my-image-name.png";
            link.href = dataUrl;
            link.click();
            data=dataUrl
            po('then ++++++++++++++++++++++++++++++++++++++')
        })
        .catch((err) => {
            console.log(err);
        })
        po('return ---------------------------------------')
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
        // po('ref',this.editorRef)
        let data;
        await toPng(this.editorRef.current, { cacheBust: false })
        .then((dataUrl) => {
            // po('dataUrl',dataUrl)
            // const link = document.createElement("a");
            // link.download = "my-image-name.png";
            // link.href = dataUrl;
            // link.click();
            data= dataUrl
            // po('then ++++++++++++++++++++++++++++++++++++++')
        })
        .catch((err) => {
            console.log(err);
        })
        return data
        // po('return ---------------------------------------',data)
    }  
    
    addMap=(mapBase64)=>{
        po('adding map..........',mapBase64)
    }

    render(){
        return <StyledJEditor className={'jr-editor'}>
            <StyledTools>Tools
                <button
                    onClick={this.addImg}
                >
                    Add logo
                </button>
                <MapScreenshot getRange={this.getRange}/>

            </StyledTools>
            <StyledEditorScroll className={'editor-scroll'}>
                <StyledEditorWapper className={'editor-wapper'}>
                    <StyledEditor className={'editor'} contenteditable={"true"} ref={this.editorRef}/>
                </StyledEditorWapper>
            </StyledEditorScroll>
        </StyledJEditor>
    }
}