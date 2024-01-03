import React from "react";
import styled from 'styled-components'
import { Table as ATable, Pagination as APagination, Checkbox,Popconfirm ,Button ,Tooltip } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
// import { FormattedMessage } from "react-intl";
import JSubmit from "./JSubmit";

const po=console.debug


const StyledHeader = styled.span`
    
    --header-border: 1px solid ${({theme})=>theme.colorPrimaryTextActive};
    z-index: 0;
    justify-content: space-between;
    align-items: center;
    display: flex;
    position :sticky;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; 
    color: white;
    border-bottom: var(--header-border);
    font-weight: bold;
    padding-bottom: 8px;

    background: linear-gradient(180deg, rgba(227,227,226,1) 0%, rgba(255,255,255,1) 25%, rgba(210,210,210,1) 100%);
    
    xpadding: 0 12px;
    color: #666666;

    &:not(:last-child){
        border-right: var(--header-border);
    }

    .ant-btn-link{
        padding: unset !important;
    }
    
`

const StyledJRTable = styled.div`
    font-size: ${({theme})=>theme.pFontSize};
    color: white;
    flex: 1;
    border: 1px solid ${({theme})=>theme.colorPrimaryTextActive};
    border-top: 4px solid ${({theme})=>theme.colorPrimaryTextActive};
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: ${({theme})=>theme.pRadius};
    background: white;

    > header {
        background: ${({theme})=>theme.colorPrimaryTextActive};
        height: 32px;
        display: flex;
        align-items: center;
        xpadding: 0  ${({theme})=>theme.pMargin};
    }
    
    ${({hoverable,theme})=>hoverable?`
        main > *:hover > div{
            background-color: ${theme.colorPrimaryBg};
            cursor: pointer;
            color:${theme.colorPrimaryActive};
        }
    `:''}

    > footer {
        border-top: 1px solid #dfdfdf;
        height: 40px;
        background: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    @media (max-width: ${process.env.REACT_APP_MEDIA_S}px) and (max-height: ${process.env.REACT_APP_MEDIA_B}px){
        border: 0;
        border-radius: 0;
    }  
`

const StyledNoData = styled.div`
    grid-column: span ${({colSpan})=>colSpan};
    display: flex;
    justify-content: center;
    align-items: center;    
    color: gray;
`

const StyledMain = styled.main`
    
    /* Track */
    &::-webkit-scrollbar-track {
        position: absolute;
        background: transparent;
        margin-top: ${({headerHeight})=>headerHeight}px;
    }

    
    overflow: overlay;

    display: grid;
    flex: 0px;
    flex-direction: row;

    > header {
        display: contents;
        white-space: nowrap;
    }

    > main {
        display: contents;



        > * {
            display: contents;
        
            > div {
                // display: flex;
                // align-items: center;
                background: #ffffff;
                padding: 4px 12px;
                border-bottom: 1px solid #dfdfdf;
                color: black;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: color .3s , background-color .3s;
                transition-timing-function: ease;
            }
        }
    }
`




export default class ITable extends JSubmit {
    headerHiehgt=32
    columns=[]
    columnsLeaf=[]
    headerDeep=0
    
    constructor(props){
        super(props)
        this.initHeader()
        this.state={
            selectedIds:[]
        }
    }

    get selectedIds(){
        return this.state?.selectedIds
    }

    set selectedIds(selectedIds){
        return this.setState({selectedIds})
    }
    
    subHeader(column,level){
        let colSpan=0;
        let items=[]
        if(this.headerDeep<level)this.headerDeep=level;
        if(column.items?.length){
            items=this.subHeaders(column.items,level)
            colSpan+=items.reduce((aco,item)=>{
                aco+=item.colSpan
                return aco
            },0)
        }else{
            this.columnsLeaf.push(column)
            colSpan=1;
        }
        return {
            ...column
            ,items
            ,colSpan
        }
    }

    subHeaders(columns,level){
        return columns?.map(column => {
            return this.subHeader(column,level+1)
        })
    }

    removeCheckbox=({id='id',valueName='ids'})=>{
        // const [open, setOpen] = useState(false); 

        return {
            dataIndex:'checked'
            ,title:<Popconfirm 
                title={'msg_confirm_remove'}
                onConfirm={()=>{
                    if(this.selectedIds.length)
                    this.remove({value:{
                        [valueName]:Array.isArray(id)
                            ?this.selectedIds?.map(id=>JSON.parse(id))
                            :this.selectedIds
                    }})
                }}>
                <Tooltip title={'action_remove'}><Button type={'link'}><DeleteOutlined style={{fontSize:'24px',color:'#666666'}} /></Button></Tooltip>
            </Popconfirm>
            ,style:{
                zIndex:1
                ,position:'sticky'
                ,left:0
                ,padding:0
            }

            ,width:'40px'
            ,render({record,style}){
                style.textAlign= 'center'
                style.zIndex=0
                style.position='sticky'
                style.left=0
                style.padding=0


                const _id=Array.isArray(id)
                    ? JSON.stringify({...id.reduce((aco,id,index)=>{
                        aco[id]=record[id]
                        return aco
                    },{})})
                    :record[id]
                return <Checkbox key={_id}
                checked={this.selectedIds.indexOf(_id)>-1}
                onChange={(e)=>{
                    if(e.target.checked){
                        this.selectedIds=[_id,...this.selectedIds]
                    }else{
                        this.selectedIds=this.selectedIds.filter(e => e !== _id)
                    }
                }}
                />
            }
        }
    }

    initHeader(){
        this.headerDeep=0
        const allColumns=this.props.columns
        if(this.props.removable!==undefined){
            allColumns.unshift(this.removeCheckbox(this.props.removable))
        }
        const columns=this.subHeaders(this.props.columns,0)
        this.columns=Array(this.headerDeep).fill().map(a=>[])
        this.getComlumns(this.columns,columns,0)
    }

    getComlumns(result,columns,level){
        columns?.forEach(column=>{
            result[level].push(column)
            if(column.items?.length){
                this.getComlumns(result,column.items,level+1)
            }
        })
    }


    createHeader({styleT,style={},colSpan,rowSpan,title,items},level,key){
        const _style={
            ...style
        }

        if (colSpan) _style.gridColumn = `span ${colSpan}`;
        if (items.length==0 && level<this.headerDeep){
            _style.gridRow = `span ${this.headerDeep-level}`
        }
           
        if(items.length){
            _style.height=`${this.headerHiehgt}px`
        }else if(level<this.headerDeep){
            _style.height=`${(this.headerDeep-level)*this.headerHiehgt}px`
        }
        _style.top=`${(level)*this.headerHiehgt}px`
        return <StyledHeader style={_style} key={key}><div></div><b>{title}</b><div></div></StyledHeader>
    }

    createHeaders(columns){
        return <header >{ 
            columns?.reduce((aco,column,index)=>{
                const columns2=column.map((column2,x)=>{
                    return this.createHeader(column2,index,`k${index}-${x}`)
                })
                return [...aco,...columns2];
            },[])
        }</header>
    }



    setValue(res){
        this.setState({
            value:res
            ,selectedIds:[]
        })
    }

    createNoData(){
        return <StyledNoData colSpan={this.columnsLeaf.length}>No data</StyledNoData>
    }

    createRecord(record,index){
        return <span 
            onDoubleClick={
                this.props.onDoubleClick
                ?()=>{
                    const onDoubleClick=this.props.onDoubleClick.bind(this)
                    onDoubleClick(record,index)
                }
                :null
            }
         >{this.columnsLeaf.map((column,x)=>{
            const style={}
            const value=column.render 
                ? column.render?.bind(this)({value:record[column.dataIndex],record,index,style}) 
                : record[column.dataIndex]
            return <div style={{...style}} key={`k${index}-${x}`}>{value}</div>
        })}
        </span>
    }

    createData(dataSource){
        return dataSource?.length
            ? <main>{dataSource?.map((record,index)=>{
                return this.createRecord(record,index)
            })}</main> 
            : this.createNoData()
    }    

    onPageChange(current, size){
        po('current, size',current, size)
    }

    renderer(){
        const from=this.props.onChange?"props":"state"
        const dataSource=this[from]?.value?.dataSource ?? this[from]?.value
        const page=this[from]?.value?.page

        
        return <StyledJRTable
            style={this.props.style}
            className={`jr-table auto-flex-item ${this.props.className ?? ""}`}
            hoverable={this.props.onDoubleClick!==undefined}
        >
            {
                this.props.header!==undefined 
                ? <header>{this.props.header}</header>
                : ""
            }
            <StyledMain
                headerHeight={this.headerDeep*this.headerHiehgt}
                style={{
                    gridTemplateColumns:`${this.columnsLeaf.map(column=>column.width??'minmax(min-content, auto)').join(" ")}` //`repeat(${this.columnsLeaf?.length ?? 0}, minmax(50px, 1fr))`
                    ,gridTemplateRows:`repeat(${this.headerDeep ?? 0}, ${this.headerHiehgt}px) ${dataSource?.length?`repeat(${dataSource?.length??0}, 36px)`:''} 1fr`//`repeat(${this.headerDeep?.length ?? 0}, 50px) repeat(${dataSource?.length??0}, 30px) 1fr`
                }}
            >
                {this.createHeaders(this.columns)}
                {this.createData(dataSource)}
            </StyledMain>
            {
                page!=null && <footer>
                    onChange
                    <APagination {...page} 
                        onChange={(current, size)=>{
                            po('-------------------', current, size)
                            this.props.onPageChange?.(current, size)
                            this.onPageChange(current, size)
                        }}
                    ></APagination>
                </footer>
            }
        </StyledJRTable>
    }
}