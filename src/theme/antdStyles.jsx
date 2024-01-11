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
`
export default AntdStyles