import React from "react";
import { Select as ADSelect} from "antd";
import JSubmit from "./JSubmit";

export default class Select extends JSubmit {
    componentDidMount() {
        super.componentDidMount();
        if (this.props.options) {
            this.setOptions(this.props.options);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.options!=this.props.options)
        this.setOptions(this.props.options)
    }

    getOptions=()=>{
        return this.state.options
    }

    setOptions(options) {
        if(this.props.selectFirst===true && this.props.value===undefined && this.props.onChange){
            this.props.onChange?.(options[0][this.props.valueName ?? "id"])
        }
        this.setState({ options });
    }

    setRes = this.setOptions;

    renderer() {
        const {fieldNames,readOnly,onDeselect,onSearch, defaultActiveFirstOption,defaultValue, value, onChange,onSelect , valueName = "id", labelName = "name", showBlank ,mode, required} = this.props;
        return readOnly
            ?<div style={{padding: '0 11px'}}>{this.state?.options?.find((option)=>option[valueName]===this.props.value)?.[labelName]}</div>
            :<ADSelect 
            style={this.props.style}
            options={this.state?.options?.filter((filter) => {
                return typeof this.props.filter == "function" ? this.props.filter(filter) : true;
            }).reduce(
                (aco, option) => {
                    aco.push({
                        ...option
                        ,value: option[valueName]
                        ,label: typeof labelName === "function" ? labelName(option) : option[labelName]
                    });
                    return aco;
                },
                (showBlank === undefined) && (mode !== "multiple" && (required === undefined || !required)) || showBlank
                    ? [{ value: null, label: "" }]
                    : []
            )}
            onSearch={onSearch}
            onDeselect={onDeselect}
            mode={mode}
            defaultValue={defaultValue}
            defaultActiveFirstOption={defaultActiveFirstOption}
            value={value!==null ? value:  mode === "multiple"?[]:null}
            onChange={onChange?.bind(this)}
            onSelect={onSelect}
            fieldNames={fieldNames}
        />
    }
}