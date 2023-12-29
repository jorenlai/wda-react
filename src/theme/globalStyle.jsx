import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,*,*:before,*:after {
        box-sizing: border-box;
    }

    .exercise{
        height: 100vh;
        border: 10px solid gray;
        display: flex;
        flex-direction: column;
    }

    .anp-panel{
        flex:1;
        display: flex;
        border: 10px solid blue;
    }

    .anp-tab{
        flex:1;
        border: 20px solid red;
        overflow: hidden;

        .ant-tabs-content{
            height: 100%;

            .ant-tabs-tabpane{
                height: 100%;
                display: flex;
            }
        }
    }

    .con-adm{
        flex:1;
        overflow: hidden;
        border: 10px solid yellow;
        grid: 100px 1fr/200px 1fr !important;
    }
    
    .web-app{
        display: flex;

        .body{
            flex:1;
            border: 10px solid green;
        }
    }
`

export default GlobalStyle