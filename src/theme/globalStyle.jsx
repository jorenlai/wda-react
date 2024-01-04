import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --border-width: 1px;

      }
    
    #root{
        height: 100vh;
        display: flex;
    }

    html,*,*:before,*:after {
        box-sizing: border-box;
    }

    .exercise{
        flex:1;
        height: 100vh;
        border: var(--border-width) solid gray;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .anp-panel{
        flex:1;
        display: flex;
        border: var(--border-width) solid blue;
        overflow: hidden;
    }

    .anp-tab{
        flex:1;
        border: var(--border-width) solid red;
        overflow: hidden;

        .ant-tabs-content{
            height: 100%;

            .ant-tabs-tabpane{
                height: 100%;
                xdisplay: flex;
                border: var(--border-width) solid purple;
            }
        }
    }

    .ant-tabs-tabpane-active{
        display: flex;
    }

    .con-adm, .con-plan{
        flex:1;
        overflow: hidden;
        border: var(--border-width) solid yellow;
        grid: 60px 1fr/ 1fr !important;
    }
    
    .web-app{
        flex: 1;
        display: flex;
        border: var(--border-width) solid white;
        overflow: hidden;
        .body{
            display: flex;
            flex:1;
            border: var(--border-width) solid green;
            overflow: hidden;
        }
    }

    .plan-panel{
        flex:1;
        border: var(--border-width) solid orange;
    }

    .jr-crud{
        overflow: hidden;
        flex:1;
    }

    .search-panel{
        overflow: scroll;
        border: 2px solid red;
        flex-shrink: 0;
    }

    .jr-table.result-panel{
        flex:1;
        overflow: hidden;
    }


`

export default GlobalStyle