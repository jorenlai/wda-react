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
        gap: 0px !important;
    }
    

    .info-panel {
        > * {
            border:1px solid gray;
        }
        padding:6px 0;
        display:flex;
        justify-content: space-between;
    }





    .con-admin, .con-plan{
        flex:1;
        overflow: hidden;
        border: var(--border-width) solid yellow;
        grid: min-content 1fr/ 1fr !important;
        gap:0 !important;
    }

    .controll-panel {
        padding: 6px 0;
        display:flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .web-app{
        background: black;
        gap: 18px !important;
        flex: 1;
        display: flex;
        border-top:3px solid ${({theme})=>theme.colorPrimary};
        border-bottom:20px solid ${({theme})=>theme.colorPrimary};
        border-left:1px solid ${({theme})=>theme.colorPrimary};
        border-radius: 0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
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

    .anp-panel{
        flex:1;
        display: flex;
        border: var(--border-width) solid blue;
        overflow: hidden;

        .ant-tabs-nav{
            margin-bottom:unset;
            Xbackground: #575757;
        }
    }

    .anp-tab{
        flex:1;
        border: var(--border-width) solid red;
        overflow: hidden;

        .ant-tabs-tab{
            color: white;
        }
        .ant-tabs-tab-btn{
            font-size: large;
            font-weight: bold;
        }
        .ant-tabs-content{
            height: 100%;

            .ant-tabs-tabpane{
                padding:0px;
                height: 100%;
                xdisplay: flex;
                border: var(--border-width) solid purple;
            }
        }
        .ant-tabs-nav-wrap{
            .ant-tabs-tab{
                padding: 0px !important;
            }
        }
        .ant-tabs-extra-content{
            padding-bottom:6px;
        }
    }

    .ant-tabs-tabpane-active{
        display: flex;
    } 

    .question-panel{
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        .button-panel{
            display: flex;
            gap:6px;
            flex-wrap: wrap;
        }  
        .question{
            padding: 0 24px;
            overflow: auto;
            flex:1;
            
            h1,h2{
                display:flex;
                :first-child{
                    padding-right:14px;
                }
            }

            h2{
                margin-left:40px;
                font-weight: normal;
            }
        }      
    }
    
    .answer-order{
        background: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;  
        border: 1px solid gray;
        .buttons{
            display:flex;
        }
    }

    .resizer{
        border:4px solid gray;
        xborder-radius: 100vh;
        xmargin:4px 1px;
    }

    .jr-crud{
        overflow: hidden;
        flex:1;

    }

    .search-panel{
        border-top: 4px solid ${({theme})=>theme.colorPrimary};
        border-radius: ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius} 0 0;
        background: ${({theme})=>theme.colorPrimaryBg};
        Xoverflow: scroll;
        xborder: 2px solid red;
        flex-shrink: 0;

        .inputs{
            xborder: 1px solid red;
            padding: ${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin} 6px ${({theme})=>theme.pMargin};
        }

        .buttons{
            xwidth: 500px;
            border-radius: ${({theme})=>theme.pRadius} 0 0 ${({theme})=>theme.pRadius};
            xbackground: ${({theme})=>theme.colorPrimaryBorderHover};
            gap:${({theme})=>theme.pMargin};
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
        padding: 12px 0;
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
        margin-bottom: 20px;

        > :last-child{
            border-radius: 0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
        }

        .path{
            display:flex;
            background: ${({theme})=>theme.colorPrimary};
            padding: ${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin};
            gap:4px;
            color: #dddddd;
            .current{
                color: white;
                font-weight: bold;
            }
        }
        .desc{
            padding:${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin};
            background: ${({theme})=>theme.colorPrimaryBg};
            color: black;
        }  
        > div{
            white-space: nowrap;
        }      
    }
    

    //Button
    .ant-btn-default {
        background-color: #f0f0f0;
        border-color: #f0f0f0;
    }
    .convex{
        box-shadow: -3px -3px 3px 0 #ffffffd6, 2px 2px 3px 0px #b28d60bf;
        transition: box-shadow .2s,background-color .2s;
    }
    
    //input
    .ant-form-item-control-input{
        border-radius: 8px;
        background-color: #f4f4f4;
        box-shadow: inset 3px 3px 3px 0px rgba(0, 0, 0, 0.2), inset -3px -3px 3px 0px rgb(255 255 255);

        .ant-radio-group{
            margin: 0 11px;
        }

        .ant-tree-list{
            background: transparent !important;
        }
        .ant-tree{
            background: transparent !important;
        }
        .ant-input-group-addon{
            xbackground: transparent !important;
        }

        .ant-input-affix-wrapper{
            background-color: transparent !important;
        }
        .ant-select-selector{
            background-color: transparent !important;
        }
        
        .ant-form-item-control-input-content{
            > input{
                background-color: transparent;
                background: transparent !important;
            }

            > .ant-input-number{
                background-color: transparent !important;
            }
            
            // > .jr-field{
            //     min-height:30px;
            //     > * {
            //         padding: 5px 11px;
            //     }
            //     border-radius: 8px;
            //     border: 1px solid #d9d9d9;
            //     &:hover{
            //         border-color: ${({theme})=>theme.colorPrimaryHover};
            //     }            
            // }
            // .jr-field-status-error{
            //     &:hover{
            //         border-color: #ffa39e;
            //     }
            //     border-color: #ff4d4f;
            // }
        }
    }
`

export default GlobalStyle