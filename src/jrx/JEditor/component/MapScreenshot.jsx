import JSubmit from "../../JSubmit";
import styled from 'styled-components'
import { po } from "../../Util";
import testImg from "../../../exercise/plan/component/testImg";
import { toPng } from 'html-to-image'
import JMap from "../../../component/JMap";
import React, { useEffect, useRef } from "react";
import { Modal } from "antd";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const StyledMapScreenshot = styled.button`
`
const StyledMapContainer = styled(Modal)`
    .ant-modal-body{
        height: 400px;
        display:flex;
        .wapper{
            flex:1;
            display:flex;
        }
        .leaflet-container{
            flex:1;
            display:flex;
        }
    }
`
export default function MapScreenshot({getRange}){
    const mapRef=useRef()
    const position = [51.505, -0.09]
    const [map, setMap] = useState();
    const [range, setRange] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = async () => {
        
        console.clear()
        await toPng(mapRef.current, { cacheBust: false })
        .then((dataUrl) => {
                const oImg = document.createElement('img')
                oImg.src=dataUrl
                range.insertNode( oImg );
            setIsModalOpen(false);
        })
        .catch((err) => {
            console.log(err);
            setIsModalOpen(false);
        })

    };
    const handleCancel = () => {
        po("--------------------------------------")
        setIsModalOpen(false);
    };

    return <>
        <button
            onClick={()=>{
                po('++++++++++++++++++++++++++++++++++++++')
                setRange(getRange())
                showModal()
            }} 
        >
            MapScreenshot
        </button>
        <StyledMapContainer
                wrapClassName={'wrapClassName'}

                maskClosable={false}
                closeIcon={null}
                destroyOnClose={false}
                width={'800px'}
                height={'400px'}
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                afterOpenChange={(open)=>{
                    if(open && map==null){
                        setMap(
                            <MapContainer center={position} zoom={13} scrollWheelZoom={true}  >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        ) 
                    } else if(open==false){
                        // setMap(null)
                    }  
                }}
            >
                <div className={'wapper'} ref={mapRef}>
                {map}
                </div>
        </StyledMapContainer>
    </>
}