import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Input } from "antd"
import JForm from "../../jrx/JForm"
import JEditor from "../../jrx/JEditor"
import { toPng } from 'html-to-image'
import { po } from '../../jrx/Util'
import JPanel from '../../jrx/JPanel'

const StyledPlanForm=styled(JPanel)`
    xborder: 4px solid #aaa;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex:1;

`

export default function PlanForm(props){
    const formRef=useRef()
    const editorRef=useRef()
    const jrEditorRef=useRef()
    return <StyledPlanForm style={props.style} ref={formRef} cols={1}
        post={{
            url:'/api/file/test'
        }}
    >
        <JEditor xname={'report'} eRef={editorRef} ref={jrEditorRef}/>
        <button
            onClick={()=>{
                po(formRef)
                jrEditorRef.current.download()
                jrEditorRef.current.getBase64().then((base64)=>{
                    formRef.current.post({
                        value:{
                            base64//:'base64'
                        }
                    })
                })
            }}
        >Submit</button>
    </StyledPlanForm>  

}