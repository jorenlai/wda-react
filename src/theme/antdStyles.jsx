import { createGlobalStyle } from "styled-components";

const AntdStyles = createGlobalStyle`
    html,*,*:before,*:after {
        box-sizing: border-box;
    }

    .ant-tabs{
        font-size:100%;
    }

    .ant-tabs-tab{
        color: white;
        margin: unset !important;
        font-size: unset !important;
        font-weight: bold;
    }

    .ant-tabs-tab-btn{
        xxfont-size: ${({theme})=>theme.fontSize}  !important;
        xxfont-weight: bold;
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

    // Message
    .ant-message-top{
        top: 1px !important;
    }
    .ant-message-notice-content {
        border-radius: 8px;
        background: #6e6e6ebb !important;
        color: white;
        padding: 0 !important;
        min-width: 300px;
    }
    .ant-message-custom-content {
        border-radius: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 16px;
        font-size: 18px;

        &> span:nth-child(2) {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        svg {
            width: 12px;
            height: 12px;
        }

        .message {
            margin-right: 8px;
        }

        .anticon-close {
            color: #fff;
        }
    }
    .info, .warning {
        & .ant-message-custom-content {
            background: #fbc74b3c;
            border: 2px solid #fbc74b;
        }
    }
    .success {
        & .ant-message-custom-content {
            background: #87d06836;
            border: 2px solid #87d068;
        }
    }
    .error {
        & .ant-message-custom-content {
            background: hsl(1deg 76% 43% / 31%);
            border: 2px solid #C11D1A;
        }
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