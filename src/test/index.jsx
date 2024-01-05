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
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const StyledTestApp=styled.div`
    flex:1;
    display: flex;
    .leaflet-container{
        flex:1;
    }
`

export default function TestApp(){
    const editorRef=useRef()
    const position = [51.505, -0.09]
    
    return <StyledTestApp>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true } >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </StyledTestApp>
}