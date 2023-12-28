import React from "react";
import styled from 'styled-components'
import {DatePicker, Pagination as APagination, Checkbox,Popconfirm ,Button  } from "antd";
import { CaretUpOutlined,CaretDownOutlined,DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import JSubmit from "./JSubmit";
// import { FormattedMessage } from "react-intl";
import dayjs from 'dayjs';
import { po } from "./Util";
const isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
const isLeapYear = require('dayjs/plugin/isLeapYear') 
const isoWeek = require('dayjs/plugin/isoWeek') 
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeek)
function* SortOrder() {
	while(true){
        yield 1;
		yield -1;
		yield 0;
	}
}
let sortOrder= SortOrder()

const StyledNoData = styled.div`
    grid-column: span ${({colSpan})=>colSpan};
    display: flex;
    justify-content: center;
    align-items: center;    
    color: gray;
    user-select: none;
`

const StyledHeader = styled.span`
    > b:not(:has(.no-padding)) {
        padding: 0 12px;
    }
    --header-border: 1px solid #fff6eb;
    z-index: 2;
    justify-content: space-between;
    align-items: center;
    display: flex;
    position :sticky;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; 
    color: white;
    font-weight: bold;
    
    background: linear-gradient(180deg, rgba(227,227,226,1) 0%, rgba(255,255,255,1) 25%, rgba(210,210,210,1) 100%);
    box-shadow: 2px 2px 2px 0 #ffffffd6 inset, -1px -1px 2px 0px #b28d60bf inset;

    color: #666666;
    
    border-right: var(--header-border);
    Xborder-top: var(--header-border);


    .ant-btn-link{
        padding: unset !important;
    }

    &.sort{
        cursor: pointer;
        &:hover{
            b{
                color: ${({theme})=>theme.colorPrimaryActive};
            }
            .buttons{
                XXbackground: linear-gradient(180deg, rgb(255 254 254) 0%, rgba(255,255,255,1) 35%, rgb(207 203 203) 100%);
            }
        }

        >.asc{
            .asc{
                color: ${({theme})=>theme.colorPrimaryActive};
            }   
        }
        >.desc{
            .desc{
                color: ${({theme})=>theme.colorPrimaryActive};
            }   
        }        
    }
`

const StyledSort = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding: 0 2px;
    justify-content: center;
    height: 100%;
    border-left: .01em solid;
    border-image: linear-gradient(to top, #e2e2e2, #cccccc) 1;

}
`

const StyledJRTable = styled.div`
    position: relative;

    .test{
        color:red !important;
        border: 2px solid red;
    }

    .holder{
        cursor: grab;
        &:active:hover {
            cursor: -webkit-grabbing;
        }
    }

    color: black;
    > main {
        /* Track */
        &::-webkit-scrollbar {
            position: sticky;
            background: transparent;
            margin-top: ${({headerHeight})=>headerHeight}px;
        }

        ${({scrollx})=>scrollx===undefined?'min-':'overflow: overlay; '}height: calc(100vh ${({paging})=>paging?'- 42px':''} - ${({float})=>float?.header?.top} - ${({float})=>float?.footer?.bottom});
    }


    ${({doubleClickable,theme})=>doubleClickable?`
        > main > main > *:hover > div{
            background-color: ${theme.colorPrimaryBg};
            transition: color .2s , background-color .2s;
            cursor: pointer;
            color:${theme.colorPrimaryActive};
        }
    `:`
        > main > main > *:hover > div{
            background-color: #f8f8f8;
            transition: color .2s , background-color .2s;
        }    
    `}

    .draging{
        .dropTop > div{
            border-top:1px solid ${({theme})=>theme.colorPrimaryActive};
        }
        .dropBottom > div{
            border-bottom:1px solid ${({theme})=>theme.colorPrimaryActive};
        }    
    }

    > footer {
        position: sticky;
        bottom: ${({float})=>float?.footer?.bottom};
        z-index: 2;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: antiquewhite;
    }
`

const StyledMainBody = styled.main`
    display: contents;
    > * {
        color:red !important;
        display: contents;
    }
`

const StyledNote = styled.div`
    background: #ffffff;
    padding: 4px 12px;
    border-top: 1px solid white;
    border-bottom: 1px solid #dfdfdf;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 1s , background-color 1s;
    transition-timing-function: ease;
`

const StyledMain = styled.main`
    background: white;
    display: grid;
    flex-direction: row;

    
    > header {
        display: contents;
        white-space: nowrap;
        gap: 10px;
    }

    > main {
        display: contents;
        > * {
            display: contents;
        }
    }

    > header.top, > footer.bottom {
        display: contents;

        >span{
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 4px 12px;
        }
    }

    .fixed{
        z-index:1;
        position:sticky;
        border-right:1px solid #dfdfdf;
    }
`

const StyledSh = styled(StyledHeader)`
    position: absolute;
    right: 0;
    width: 9px;
    height: 32px;
    box-shadow: unset;
    border-left: 1px solid #eaeaea;
`
const Holder=(table)=>{

    return {
        label:null
        ,style:{
            color:'red'
            ,position:'sticky'
            ,right:0                    
        }
        ,width:'50px'
        ,render({record,index,style}){
            style.userSelect='none'
            style.position='sticky'
            style.right='0'          
            return <HolderOutlined 
                draggable={"true"}
                className={'holder'}

                // onTouchMove={(e)=>{
                //     table.dragFrom=index
                //     // e.dataTransfer.setData("from", index);
                //     // e.dataTransfer.effectAllowed = "move";
                // }}
                // XonDragStart={(e)=>{
                //     po('e',e)
                //     po('e',e.currentTarget)
                //     table.dragFrom=index
                //     // e.dataTransfer.setData("from", index);
                //     // e.dataTransfer.effectAllowed = "move";
                // }}
            />
        }
    }
}

export default class JXTable extends JSubmit {
    headerHiehgt=32
    columns=[]
    columnsLeaf=[]
    headerDeep=0

    constructor(props){
        super(props)
        this.state={
            selectedIds:[]
            ,top:null
            ,columns:null
            ,footer:null
            ,bottom:null
            ,hidden:null
        }
    }

    get childrenName(){
        return this.props.childrenName ?? 'children'
    }
    
    get selectedIds(){
        return this.state?.selectedIds
    }

    set selectedIds(selectedIds){
        return this.setState({selectedIds})
    }



    setColumns(columns){
        this.initHeader(columns)
        this.setState({
            columns:this.columns
            ,columnsLeaf:this.columnsLeaf
            ,headerDeep:this.headerDeep
        })
    }

    setValue(res){
        const state={
            selectedIds:[]
            ,sort:null
            ,hidden:res.hidden
        }
        
        if(res?.columns){
            const {columns,...value}=res
            this.rawValue=[...value.dataSource]

            this.initHeader(columns)
            Object.assign(state,{
                columns:this.columns
                ,columnsLeaf:this.columnsLeaf
                ,headerDeep:this.headerDeep
                ,value
            })
        }else{
            this.rawValue=[...(res.dataSource??res)]
            Object.assign(state,{value:res})
        }

        if(res?.top){
            Object.assign(state,{top:res?.top})
        }

        if(res?.bottom){
            Object.assign(state,{bottom:res?.bottom})
        }

        if(res?.footer){
            Object.assign(state,{footer:res?.footer})
        }
        this.setState({...state})
    }    
    
    componentDidMount(){
        this.setColumns(this.props.columns)
        super.componentDidMount()
    }
    
    removeFromDataSources=()=>{
        const dataSource=this.dataSource
        this.selectedIds.forEach((id)=>{
            const index=dataSource.findIndex((record)=>record.id===id)
            dataSource.splice(index,1)
        })
        this.dataSource=[...dataSource]
        this.selectedIds=[]

    }
    removeCheckbox=({id='id',valueName='ids'})=>{
        return {
            name:'checked'
            ,label:this.props.remove
            ?<Popconfirm className={"no-padding"}
                title={'Remove'}//{<FormattedMessage id={'msg_confirm_remove'}/>}
                onConfirm={()=>{
                    if(this.selectedIds.length)
                    this.remove({
                        value:{
                            [valueName]:Array.isArray(id)
                                ?this.selectedIds?.map(id=>JSON.parse(id))
                                :this.selectedIds
                        }
                        ,updateValue:false
                    })
                }}>
                <Button type={'link'}><DeleteOutlined style={{fontSize:'24px',color:'#666666'}} /></Button>
            </Popconfirm>
            :<Button type={'link'}><DeleteOutlined style={{fontSize:'24px',color:'#666666'}} 
                onClick={this.removeFromDataSources}
            /></Button>
            ,fixed:true

            ,width:'40px'
            ,render({record,style}){
                style.textAlign= 'center'
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

    subHeader(column,level){
        let colSpan=0;
        let columns=[]
        if(this.headerDeep<level)this.headerDeep=level;
        if(column.columns?.length){
            columns=this.subHeaders(column.columns,level)
            colSpan+=columns.reduce((aco,item)=>{
                aco+=item.colSpan
                return aco
            },0)
        }else{
            this.columnsLeaf.push(column)
            colSpan=1;
        }
        return {
            ...column
            ,columns
            ,colSpan
        }
    }
    subHeaders(columns,level){
        return columns?.map(column => {
            return this.subHeader(column,level+1)
        })
    }

    initHeader(columns){
        this.headerDeep=0
        this.columns=[]
        this.columnsLeaf=[]

        if(this.props.removable!==undefined){
            columns?.unshift(this.removeCheckbox(this.props.removable))
        }

        if(this.props.onMove!==undefined){
            columns?.push(Holder(this))
        }        
        
        const _columns=this.subHeaders(columns,0)
        this.columns=Array(this.headerDeep).fill().map(a=>[])
        this.getComlumns(this.columns,_columns,0)
    }

    getComlumns(result,columns,level){
        columns?.forEach(column=>{
            result[level].push(column)
            if(column.columns?.length){
                this.getComlumns(result,column.columns,level+1)
            }
        })
    }



    createHeader({fixed,styleT,style={},colSpan,rowSpan,name,label,columns,sort},level,key){
        
        const _label = label===null?null:label//??<FormattedMessage id={`field_${name}`}/>
        const _style={
            ...style
        }
        
        if(fixed){
            _style.zIndex=3
            _style.position='sticky'
            _style.left=0
        }

        if (colSpan) _style.gridColumn = `span ${colSpan}`;
        if (columns.length==0 && level<this.state.headerDeep){
            _style.gridRow = `span ${this.state.headerDeep-level}`
        }
           
        if(columns.length){
            _style.height=`${this.state.headerHiehgt}px`
        }else if(level<this.state.headerDeep){
            _style.height=`${(this.state.headerDeep-level)*this.state.headerHiehgt}px`
        }
        _style.top=`calc(${ this.props.scrollx===undefined ? this.props.float? this.props.float.header.top :'0px' : '0px' } + ${((level)*this.headerHiehgt)}px)`
        return <StyledHeader style={_style} key={key}  
            className={`${sort!==undefined?'sort':''}`}
            onClick={sort!==undefined && name ?()=>{
                if(this.state?.sort?.name!==name){
                    sortOrder=SortOrder()
                }

                const order=sortOrder.next().value
                this.setState({sort:{
                    sort,name,order
                }})

                
                if(order===0){
                    this.dataSource=[...this.rawValue]
                }else if(this.dataSource?.[0]?.dataSource){
                    const dataSource=JSON.parse(JSON.stringify(this.rawValue)).map(parent=>{
                        parent.dataSource=[...parent.dataSource].sort((_a,_b)=>{
                            const a=_a[name],b=_b[name]
                            return (a===null)-(b===null) || (a==='')-(b==='') ||  order*(a>b)|| order*-(a<b)
                        })
                        return parent
                    })
                    this.dataSource=dataSource
                }else{
                    this.dataSource=[...this.rawValue].sort((_a,_b)=>{
                        const a=_a[name],b=_b[name]
                        return (a===null)-(b===null) || (a==='')-(b==='') ||  order*(a>b)|| order*-(a<b)
                    })
                }
            }:null}    
            
        >
            <div></div><b>{_label}</b>{this.sort(sort,name)}
        </StyledHeader>
    }



    sort(sort,name){
        const order=this.state?.sort?.name===name
            ? this.state.sort?.order
            : null

        const sortOrderName={
            [-1]:'desc'
            ,0:'none'
            ,1:'asc'
        }
        if(sort===undefined){
            return <div></div>
        }
        return <StyledSort className={`buttons ${sortOrderName[order] ?? 'none'}`}>
            <CaretUpOutlined className={'asc'}/>
            <CaretDownOutlined className={'desc'} />
        </StyledSort>
    }
    
    createHeaders(){
        const columns=this.state.columns
        if(columns){
            return <header >{ 
                columns?.reduce((aco,column,index)=>{
                    const columns2=column.map((column2,x)=>{
                        return this.createHeader(column2,index,`k${index}-${x}`)
                    })
                    return [...aco,...columns2];
                },[])
            }</header>
        }
    }

    createNoData(){
        return <StyledNoData colSpan={this.columnsLeaf.length}>No data</StyledNoData>
    }

    get page(){
        const from=this.props.onChange?"props":"state"
        const page=this[from]?.value?.page      
        return page
    }

    get dataSource(){
        const from=this.props.onChange?"props":"state"
        const dataSource=this[from]?.value?.dataSource ?? this[from]?.value        
        return dataSource
    }
    set dataSource(value){
        const from=this.props.onChange?"props":"state"
        
        if(from==="props"){
            this.props.onChange(
                this.props.value?.dataSource
                ?{
                    ...this[from]?.value
                    ,dataSource:value
                }
                :value
            )
        }else{
            this.setState(
                this.state.value?.dataSource
                ?{
                    value:{
                        ...this.state.value
                        ,dataSource:value
                    }
                }
                :{value}
            )
        }
    }    

    createRecord(record,index,dataSource, parent,pIndex){
        const me=this
        const onMoveEvents=this.props.onMove
            ?{
                onDragOver(e){
                    e.preventDefault()
                    e.stopPropagation()
                }
                ,onDragEnter(e){
                    e.preventDefault()
                    const [from,to]=[me.dragFrom,index]
                    if(from!=null && from!=to){
                        e.currentTarget.classList.add(from>to?'dropTop':'dropBottom');
                    }
                }
                ,onDragLeave(e){
                    //e.preventDefault()
                    const [from,to]=[me.dragFrom,index]
                    e.currentTarget.classList.remove(from>to?'dropTop':'dropBottom')
                }
                ,onDrop(e){
                    //e.preventDefault()
                    const [from,to]=[me.dragFrom,index]
                    if(from==null || from===to)return
                    e.currentTarget.classList.remove(from>to?'dropTop':'dropBottom')
                    
                    const dataSource=me.dataSource
                    const element = dataSource[from];
                    dataSource.splice(from, 1);
                    dataSource.splice(to, 0, element);

                    me.dataSource=[...dataSource]
                    // me.dragFrom = null;
                    if(typeof me.props.onMove ==='function') me.props.onMove.bind(me)(dataSource)
                }
                ,onDragStart(e){
                    e.currentTarget.parentNode.classList.add('draging')
                    me.dragFrom=index
                }
                ,onDragEnd(e){
                    e.currentTarget.parentNode.classList.remove('draging')
                    me.dragFrom = null;
                }
                // onDragStart={(e)=>{
                //     po('e',e)
                //     po('e',e.currentTarget)
                //     table.dragFrom=index
                //     // e.dataTransfer.setData("from", index);
                //     // e.dataTransfer.effectAllowed = "move";
                // }}
            }
            :{}

        return <span
            key={`s${index}`}
            {...onMoveEvents} 
            onDoubleClick={
                this.props.onDoubleClick
                ?()=>{
                    const onDoubleClick=this.props.onDoubleClick.bind(this)
                    onDoubleClick(record,index)
                }
                :null
            }
         >
            {this.state?.columnsLeaf?.map((column,x)=>{
                const from=this.props.onChange?"props":"state"
                const onChange=(value)=>{
                    dataSource[index][column.name]=value
                    if(from==="props"){
                        this.props.onChange(dataSource)
                    }else if(from==="state"){
                        this.dataSource=dataSource
                        this.props.onValueChange?.bind(this)({value:dataSource,index,name:column.name})
                    }
                }
                const style={}
                style.textAlign=column.align

                if(column.fixed){
                    style.left=0
                }
                
                const value=column.render 
                    ? column.render?.bind(this)({value:record[column.name],parent,record,dataSource,index,pIndex,style,onChange}) 
                    : record[column.name]
                return <StyledNote style={{...style}} className={column.fixed?'fixed':null} key={`d-${pIndex}-r${index}-${x}`}>{value}</StyledNote>
            })}
        </span>
    }    

    createContent(parent,dataSource,pIndex){
        return <StyledMainBody key={`dm${pIndex}`}>
            { parent[this.childrenName].map((record,index)=>{
                return this.createRecord(record,index, dataSource, parent,pIndex)
            }) }

        </StyledMainBody>
    }
    
    createData(dataSource,topCells,bottomCells){
        if(dataSource?.length){
            return (Array.isArray(dataSource[0][this.childrenName])
                ? dataSource : [{[this.childrenName]:dataSource}])
                .map((parent,index)=>{
                    const e=[]
                    if(this.state.top)e.push(this.createTop(parent,dataSource,index,topCells))
                    e.push(this.createContent(parent,dataSource,index))
                    if(this.state.bottom)e.push(this.createBottom(parent,dataSource,index,bottomCells))
                    return e
                })
        }else{
            return this.createNoData()
        }
    }   

    genSpanMap=(spanMap,cols ,_current, colSpan,rowSpan)=>
        Array((rowSpan??1)).fill().reduce((aco,f,i)=>
            spanMap[_current+((i)*cols)]=(colSpan??1))  
            
    getCurrent=(spanMap,current)=>{
        if(spanMap[current]!=null){
            const result=current+spanMap[current]
            delete spanMap[current]
            return result
        }
        return current
    }
    createTB(Type, parent, dataSource, index,columns,cells){
        const length=this.state?.columnsLeaf?.length??0
        const lack=length-(cells%length)
        return <Type className={`${Type==='header'?'top':'bottom'}`} key={`${Type}${index}`}>
            {
                columns?.map(({render,colSpan,rowSpan,align,fixed,name,style={}},sIndex)=>{
                    const _style={
                        gridColumn: colSpan?`span ${colSpan}`:null
                        ,gridRow: rowSpan?`span ${rowSpan}`:null
                        ,textAlign:align
                        ,...style
                    }

                    if(fixed){
                        _style.left=0
                    }

                    const value=render 
                        ?render.bind(this)({value:parent[name],record:parent,index,dataSource,style: _style})
                        :parent[name]
                    const result=<span style={_style} className={fixed?'fixed':null} key={`b${index}-${sIndex}`}>{value}</span>
                    return result
                })
            }
            {
                lack!==length && <span style={{gridColumn:`span ${lack}`}}></span>
            }
        </Type>
    }
    createTop(parent, dataSource, index, cells){
        return this.createTB('header',parent, dataSource, index, this.state.top,cells)
    }
    createBottom(parent, dataSource, index,cells){
        return this.createTB('footer',parent, dataSource, index, this.state.bottom,cells)
    } 

    createFooter(dataSource){
        return <footer>{this.state.footer?.map(({render,colSpan,rowSpan,align,fixed})=>{
            const style={
                gridColumn: colSpan?`span ${colSpan}`:null
                ,gridRow: rowSpan?`span ${rowSpan}`:null
            }
            style.textAlign=align

            if(fixed){
                style.zIndex=1
                style.position='sticky'
                style.left=0
            }

            const value=render 
                ?render.bind(this)({dataSource,style})
                :null
            return <span style={style}>{value}</span>
        })}</footer>
    } 

    onPageChange(current, size){
        this.get({
            extraValue:{
                pageSize:size
                ,current
            }
            ,mask:`載入第 ${current} 頁中`
        });
    }

    pagination=(page)=>{
        const Pagination=this.props.pagination ?? APagination
        const onChange=this.props.pagination
            ?(week,year)=>{
                this.get({
                    extraValue:{
                        week
                        ,year
                    }
                    ,mask:`載入第 ${week} 周中`
                }); 
            }
            :(current, size)=>{
                this.get({
                    extraValue:{
                        pageSize:size
                        ,current
                    }
                    ,mask:`載入第 ${current} 頁中`
                })                
            }
        return <Pagination 
            showSizeChanger={false}
            {...page} 
            onChange={onChange}
        />
    }

    gridTemplateRows(dataSource,topRows,bottomRows){
        const rows=(Array.isArray(dataSource[0]?.[this.childrenName])?dataSource:dataSource.length?[{[this.childrenName]:dataSource}]:[])
            .reduce((aco,parent)=>{
                if(topRows)aco.push(`repeat(${topRows},minmax(min-content, max-content))`)
                if(parent[this.childrenName]?.length)aco.push(`repeat(${parent[this.childrenName].length},minmax(min-content, max-content))`)
                if(bottomRows)aco.push(`repeat(${bottomRows},minmax(min-content, max-content))`)
                return aco
            },[])
        ;
        return `repeat(${this.state?.headerDeep ?? 0}, ${this.headerHiehgt}px) ${rows.join(' ')} 1fr`
    }

    renderer(){
        const from=this.props.onChange?"props":"state"
        const dataSource=[...this.dataSource??[]]
        const page=this[from]?.value?.page

        const length=this.state?.columnsLeaf?.length||1
        const topCells=this.state?.top?this.state.top.reduce((aco,{colSpan=1,rowSpan=1})=>aco+colSpan*rowSpan,0,0):0
        const topRows=Math.ceil(topCells/length)
        const bottomCells=this.state?.bottom?this.state.bottom.reduce((aco,{colSpan=1,rowSpan=1})=>aco+colSpan*rowSpan,0,0):0
        const bottomRows=Math.ceil(bottomCells/length)

        return <StyledJRTable
            className={`jr-table ${this.props.className?this.props.className:''}`}
            scrollx={this.props.scrollx}
            float={this.props.float}
            doubleClickable={this.props.onDoubleClick!==undefined}
            paging={page!==undefined}        
        >
            {/* <StyledSh className={"sh"}>&nbsp;</StyledSh> */}
            {
                this.props.header!==undefined 
                ? <header>{this.props.header}</header>
                : ""
            }           
            <StyledMain
                headerHeight={(this.state.headerDeep*this.headerHiehgt )+30}
                style={{
                    gridTemplateColumns:`${this.state?.columnsLeaf?.map(({width,min='min-content',max='auto'})=>width??`minmax(${min}, ${max})`).join(" ")}`
                    ,gridTemplateRows:this.gridTemplateRows(dataSource,topRows,bottomRows)
                }}
            >
                {this.createHeaders()}
                {this.createData(dataSource,topCells,bottomCells)}
                <div style={{background: 'black !important',gridColumn: `span ${this.state?.columnsLeaf?.length ?? 1} / auto`}}></div>
            </StyledMain>

            {
                page!=null && <footer>{
                    <this.pagination {...page}/>
                }</footer>
            } 
            
        </StyledJRTable>
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
const StyledWeekPagination = styled.div`
display:flex;
gap:25px;
> * {
        padding: 2px 10px;
    }
    
    .ant-pagination-item{
        user-select: none;
        cursor: pointer;
        font-size: 14px;
        border-radius: 6px;
    }
    .ant-pagination-item-active{
        color: #fb8a04;
        border:1px solid #fb8a04;
    }
`


export const WeekPagination=(props)=>{
    const {week,year,onChange}=props
    const thisWeek=dayjs().isoWeek(week).year(year)
    const length=3
    let method='push'
    
    let y=year;

    const links=Array(length*2+1).fill(1).reduce((aco,f,i,a)=>{
        let w=week+i-length;
        if(w<1){
            method='unshift'
            y=year-1
            w=dayjs().year(y).isoWeeksInYear()-i
            
        } else if(w>thisWeek.isoWeeksInYear()){
            w-=thisWeek.isoWeeksInYear()
            y=year+1
            method='push'
        }else{
            y=year
            method='push'
        }
        const start=dayjs().isoWeek(w).year(y).day(0)
        const end=dayjs(start).add(6,'day')
        aco[method](
            <span key={`nv${i}`}  className={`ant-pagination ant-pagination-item ${week===w?'ant-pagination-item-active':''}`}
                title={`${start.format('YYYY/MM/DD')} ~ ${end.format('YYYY/MM/DD')}`}
                onClick={week===w
                    ?null
                    :()=>{
                        onChange(w,end.year())
                    }}                
            >W{w}</span>
        )
        
        return aco
    }
    // ,[<DatePicker onChange={(date)=>{
    //     onChange(date.week(),date.year())
    // }} picker="week" />]
    ,[]
    )
    return <StyledWeekPagination>
        {links}
    </StyledWeekPagination>
}