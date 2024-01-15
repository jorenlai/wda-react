import React from "react";
// import {intlShape, injectIntl,FormattedMessage} from "react-intl";
import * as ReactIs from "react-is";
import styled from 'styled-components'
import { Button, Form as AForm, Input as AInput, Select as ASelect,Spin  } from "antd";

import JSubmit from "./JSubmit";
import JGrid from "./JGrid";
const po = console.debug;


const StyledFormItem = styled(AForm.Item)`
    &:has(.jr-table) {
        flex-wrap: unset !important;
        overflow: hidden;
    }
`
const StyledForm = styled(AForm)`
    label {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;         
    }

    .ant-form-item-control-input-content{
        .ant-picker{
            width: 100%;
        }
    }

    .ant-form-item:has(.auto-flex-item) {
        display: flex;
        flex-direction: column;

        .ant-form-item-row{
            flex: 1;

            .ant-form-item-control{
                display: flex;
                flex-direction: column;
                
                .ant-form-item-control-input{
                    flex: 1;
                    display: flex;
                    flex-direction: column;

                    .ant-form-item-control-input-content{
                        width: 100%;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
   
    ${(props) => {
        if (props.doNotShowErrorMessage === true) {
            return `
            .ant-form-item{
                margin-bottom: 0;
            }
            .ant-col.ant-form-item-control  {
                .ant-form-item-explain-error{
                    display: none;
                }
            }
            `;
        }
    }}    
`;

export default class JForm extends JSubmit {
    static Grid = JGrid;
    static Item = AForm.Item;

    #formRef = React.createRef();

    // constructor(props){
    //     super(props)
    //     this.i18n = this.props.intl.formatMessage;
    // }

    componentDidMount(){
        super.componentDidMount()
        if(this.props.value)this.#formRef.current.setFieldsValue(this.props.value)
    }

    get formRef() {
        return this.#formRef.current;
    }

    handleFailed(res,config) {
        if(res.response?.data?.errorFields){
            const errorFields=this.fields
                .filter(fieldName=>!res.response.data.errorFields.find((field)=>field.name===fieldName))
                .reduce((aco,name,index)=>{
                    aco.push({name,errors:null})
                    return aco;
                }
                ,res.response.data.errorFields 
            )
            this.formRef.setFields(errorFields)
            if(res.response.data.message)config.failedMessage=res.response.data.message
        }
        super.handleFailed(res,config)
    }

    callSuper(method, config) {
        
        super[method]({
            value() {
                return this.formRef.getFieldsValue()
            }
            ,...this.props[method]
            ,...config
        });
    }

    download(config) {
        this.callSuper("download", config)
    }    

    get(config) {
        this.callSuper("get", config)
    }

    put(config) {
        this.formRef.validateFields()
        .then((values) => {
            this.callSuper("put", config)
        })
        .catch((errorInfo) => {
        })
    }

    patch(config) {
        this.callSuper("patch", config)
    }    

    post(config) {
        this.formRef.validateFields()
        .then((values) => {
            this.callSuper("post", config)
        })
        .catch((errorInfo) => {
        })
    }

    remove(config) {
        this.callSuper("remove", config)
    }

    setValue(value){
        this.rawValue=value
        this.formRef.setFieldsValue(value)
    }

    getValue(){
        return this.formRef.getFieldsValue()
    }

    resetFields(fields){
        this.formRef.resetFields(fields)
    }

    reset(){
        this.formRef.setFieldsValue(this.rawValue)
    }    

    createElement(child, key) {
        if (child?.props.name) {
            this.fields.push(child?.props.name)
            const rules = [];
            if(child.props.rules)rules.push(...child.props.rules)
            if(child.type?.rule){
                const validator=child.type?.rule.validator.bind(this)
                rules.push({
                    message:'My validator'
                    ,validator
                })
            }
            
            const label = child.props.label===null?null:child.props.label
            ////////////////////////////////////////////////////////////////////////////////////////////////
            if (child.props.required) {
                rules.unshift({
                    required: true
                    // ,message: <FormattedMessage id={`msg_field_is_required`} values={{field:label}}/>
                    // ,whitespace:true
                    ,validator(rule, value, callback) {
                        if(Array.isArray(value)&&value.length==0){
                            return Promise.reject(label+"必填");
                         }else if(value){
                            return Promise.resolve();
                        }else{
                            return Promise.reject(label+"必填");
                        }
                    }
                });

            }

            ////////////////////////////////////////////////////////////////////////////////////////////////
            return <StyledFormItem
                className="jr-field"
                style={child.props.itemStyle}
                colSpan={child.props.colSpan}
                rowSpan={child.props.rowSpan}
                key={key}
                name={child.props.name}
                label={label}
                rules={rules}
                help={child.props.help}
                hidden={child.props.hidden}
            >
                {child}
            </StyledFormItem>;
        } else {
            return child;
        }
    }

    gridChild(child,key){
        const {type:Type,props:{children, ...props}}=child;
        return <Type key={key} {...props}>
            {this.children(children, [],key)}
        </Type>;
    }

    children(children, allChildren, key) {
        this.fields=[]
        return (Array.isArray(children)
            ? children
            : children
                ? [children]
                : []
        ).reduce((aco, child) => {
            ReactIs.isFragment(child)
                ? this.children(child.props.children, aco,key)
                : child.type === JGrid || child.type?.target === JGrid
                    ? aco.push( this.gridChild(child,key+"_"+aco.length))
                    : aco.push(child.type ? this.createElement(child,key+"_"+aco.length) : child);
            return allChildren;
        }, allChildren);
    }

    renderer() {
        po('this.props.children',this.props.children)
        return <StyledForm
            layout={this.props.layout ?? "vertical"}
            ref={this.#formRef}
            initialValues={this.props.initialValues}
            style={this.props.style}
            mask={this.state.mask ? this.state.mask : null}
            className={"jr-form "+this.props.className??""}
            id={this.props.id}
            onValuesChange={this.props.onValuesChange}
            doNotShowErrorMessage={this.props.doNotShowErrorMessage}
            labelCol={this.props.labelCol}
            colon={this.props.colon}
            scrollToFirstError={true}
            >
            <JGrid
                cols={this.props.cols}
                gap={this.props.gap}
                grid={this.props.grid}
                style={this.props.gridStyle}
                s={this.props.s}
                m={this.props.m}
                l={this.props.l}
            >
                {this.children(this.props.children, [],"1")}
            </JGrid>
        </StyledForm>
        ;
    }
}

// IForm=injectIntl(IForm, {withRef: true})

// export default IForm