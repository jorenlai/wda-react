import styled from 'styled-components'
import { toPng } from 'html-to-image'
import JForm from '../jrx/JForm'
import { Input } from 'antd'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { Component, useRef } from 'react'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JEditor from '../jrx/JEditor';
import { po } from '../jrx/Util';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const StyledTestApp=styled.div`
`

export default function TestApp(){
    const editorRef=useRef()

    return <StyledTestApp>
        <JForm
            initialValues={{
                report:<div><a href="www.google.com">This is link to google</a> Yes
                <br/><br/><br/><br/><br/><br/>
                <img style={{width:"20px"}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                <br/><br/><br/><br/><br/><br/>AAAAAAAAAAAAAAAA
                </div>
            }}
        >
            <JEditor name={'report'} label={'Report'} eRef={editorRef} />
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
    </StyledTestApp>
}