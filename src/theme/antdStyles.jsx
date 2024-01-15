import { createGlobalStyle } from "styled-components";

const AntdStyles = createGlobalStyle`
    html,*,*:before,*:after {
        box-sizing: border-box;
    }

    .ant-tabs-tab{
        color: white;
    }
    .ant-tabs-content{
        color: white;
    }
    .ant-tabs-extra-content{
        color: white;
    }

    .ant-form{
        .ant-form-item-label{
            padding:unset;
            label{
                color: black;
            }
        }
        color: white;
    }

    .jr-modal{
        .ant-modal-content{
            padding:0;
            background: ${({theme})=>theme.colorPrimaryBg};
            
            > * {
                padding: 0 ${({theme})=>theme.plMargin};
            }
            .ant-modal-header{
                background: ${({theme})=>theme.colorPrimary};
                padding: ${({theme})=>theme.phMargin} ${({theme})=>theme.plMargin};
                .ant-modal-title{
                    color: white;
                }
            }
            .ant-modal-body{
            }
            .ant-modal-footer{
                margin-top: unset;
                padding: 0 ${({theme})=>theme.plMargin} ${({theme})=>theme.pMargin} ${({theme})=>theme.plMargin};
            }
        }
    }
`
export default AntdStyles