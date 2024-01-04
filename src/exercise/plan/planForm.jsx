import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Input } from "antd"
import JForm from "../../jrx/JForm"
import JEditor from "../../jrx/JEditor"
import { toPng } from 'html-to-image'
import { po } from '../../jrx/Util'

const StyledPlanForm=styled.div`
    border: 4px solid #aaa;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex:1;

    .jr-form{
        flex:1;
        overflow: hidden;
    }
`

export default function PlanForm(){
    const editorRef=useRef()
    return <StyledPlanForm
        cols={1}
        initialValues={{
            report:<div><a href="www.google.com">This is link to google</a> Yes
            <br/><br/><br/><br/><br/><br/>
            <img style={{width:"20px"}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
            {/* <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
            <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
            <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
            <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA */}
            </div>
        }}                
    >
        <JForm doNotShowErrorMessage={true} gridStyle={{height:'100%'}}>
            <JEditor xname={'report'} eRef={editorRef}/>
        </JForm>
        <button
            onClick={()=>{
                console.clear()
                po('ref',editorRef)
                toPng(editorRef.current, { cacheBust: false })
                .then((dataUrl) => {
                    po('dataUrl',dataUrl)
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
                })
                .catch((err) => {
                console.log(err);
                })

            }}
        >Submit</button>
    </StyledPlanForm>  

}