import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --border-width: 0;
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
        overflow: hidden;
        grid: min-content 1fr / 1fr !important;

    }
    

    .info-panel {
        display:flex;
        justify-content: space-between;
    }

    .controll-panel {
        
    }

    .anp-panel{
        flex:1;
        display: flex;
        border: var(--border-width) solid blue;
        overflow: hidden;

        .ant-tabs-nav{
            background: #575757;
        }
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
        border-radius:  ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius} 0 0;
        background: ${({theme})=>theme.colorPrimaryBg};
        Xoverflow: scroll;
        xborder: 2px solid red;
        flex-shrink: 0;

        .inputs{
            xborder: 1px solid red;
            padding: ${({theme})=>theme.pMargin} ${({theme})=>theme.pMargin} 0 ${({theme})=>theme.pMargin};
        }

        .buttons{
            padding: ${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin} ${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin};
            justify-self: end;
            xborder: 1px solid red;
        }
    }

    .jr-table.result-panel{
        flex:1;
        overflow: hidden;
    }

    .web-menu{
        flex-basis: 200px;

        display: flex;
        flex-direction: column;


        .ant-menu{
            border-radius: 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius} 0;
        }
    }

    .jr-path{
        flex-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; 
        margin-bottom: 24px;

        .path{
            display:flex;
            background: ${({theme})=>theme.colorPrimary};
            padding: ${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin};
            gap:4px;
        }
        .desc{
            border-radius: 0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
            padding:${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin};
            background: ${({theme})=>theme.colorPrimaryBg};
            color: black;
        }  
        > div{
            white-space: nowrap;
        }      
    }

`

export default GlobalStyle