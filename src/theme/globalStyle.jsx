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

    * {
        &::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background: transparent;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 10px;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #aaa;
            border-radius: 10px;
            &:hover {
                xbackground: #d7d7d7;
            }
        }

        &::-webkit-scrollbar-corner  {
            background: transparent;
        }
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
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0 !important;
        background: black;
        
        .header{
            border-radius:0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
            padding: ${({theme})=>theme.pMargin};
            background:${({theme})=>theme.colorPrimary};
            margin-bottom:18px;
        }
        .footer{
            flex-basis: 20px;
            background:${({theme})=>theme.colorPrimary};
            border-radius: 0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
        }

        .middle{
            gap: 18px !important;
            flex: 1;
            display: flex;
            overflow: hidden;
    
            .body{
                display: flex;
                flex:1;
                border: var(--border-width) solid green;
                overflow: hidden;
            }
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
        margin-left: 1px;
        border:5px solid gray;
        xborder-radius: 100vh;
        xmargin:4px 1px;
    }

    .jr-crud{
        overflow: hidden;
        flex:1;

    }

    .jr-path{
        flex-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; 
        border-radius: ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius} 0 0;

        > :last-child{
            Xborder-radius: 0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
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
        .desc-p{
            background: ${({theme})=>theme.phBg};
            padding: 0 ${({theme})=>theme.plMargin} ${({theme})=>theme.plMargin} ${({theme})=>theme.plMargin};
            
            .desc{
                border-radius:0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
                padding:${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin};
                background: ${({theme})=>theme.colorPrimaryBg};
                box-shadow:${({theme})=>theme.phShadow};
                color: black;
            }  
        }
        > div{
            white-space: nowrap;
        }      
    }

    .jr-path:has(+ .search-panel){
        .desc-p{
            padding: 0 ${({theme})=>theme.plMargin} 1px ${({theme})=>theme.plMargin};
            .desc{
                border-radius: unset;
            }
        }
    }
    .ZZZjr-path:has(+ .jr-form .result-panel){
        .desc-p{
            padding: 0 ${({theme})=>theme.plMargin} 1px ${({theme})=>theme.plMargin};
            .desc{
                border-radius: unset;
            }
        }
    }    

    .search-panel{
        >div{
            background: ${({theme})=>theme.colorPrimaryBg}; 
            border-radius:0 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius};
            box-shadow:${({theme})=>theme.phShadow};
        }
        padding: 0 ${({theme})=>theme.plMargin} ${({theme})=>theme.plMargin} ${({theme})=>theme.plMargin};
        background: ${({theme})=>theme.phBg};
        flex-shrink: 0;

        .inputs{
            grid-template-columns: repeat(4, 1fr);
            transition: 300ms;
            padding: ${({theme})=>theme.phMargin} ${({theme})=>theme.pMargin} 6px ${({theme})=>theme.pMargin};
        }

        .buttons{
            gap:${({theme})=>theme.pMargin};
            padding:  ${({theme})=>theme.pMargin};
            justify-self: end;
            xborder: 1px solid red;
            
        }
    }
    @media (max-width: 1200px) {
        .search-panel{
            .inputs{
                transition: 300ms;
                grid-template-columns: repeat(3, 1fr) ;
            }
        }
    }
    @media (max-width: 800px) {
        .search-panel{
            .inputs{
                transition: 300ms;
                grid-template-columns: repeat(2, 1fr) ;
            }
        }
    }    

    .result-panel{
        background: ${({theme})=>theme.phBg};
        flex:1;
        overflow: hidden;
    }
    .jr-form.result-panel{
        padding: 0 ${({theme})=>theme.plMargin} ${({theme})=>theme.plMargin} ${({theme})=>theme.plMargin};
        color:black;
    }
    .jr-table.result-panel{
    }    

    .web-menu{
        flex-basis: 200px;
        padding-bottom: 12px;
        display: flex;
        flex-direction: column;
        .ant-menu{
            border-radius: 0 ${({theme})=>theme.pRadius} ${({theme})=>theme.pRadius} 0;
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