import React from 'react'
import axios from 'axios'
import { Spin  } from 'antd'
import msg from './IMessage'
import { displaySpinner } from './LoadingBar'
import { po } from "./Util";

const colonValueString=(string,value)=>{
    const get=typeof value.get ==='function'
        ? (value,name)=>{
            return  value?.get(name.slice(1)) ?? name
        }
        : (value,name)=>{
            return  value?.[name.slice(1)] ?? name
        }
    return Array.from(string.match(/\:\w+/g)??[])
        .reduce((aco,name)=>{
            return aco.replace(new RegExp(name, "g"), get(value,name) );
        },string)
    ; 
}

const submit = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL,
    timeout: 120000,
});

submit.interceptors.request.use((request) => {
    return request;
});

submit.interceptors.response.use(
    (Response) => {
        return Promise.resolve(Response);
    },
    (Error) => {
        return Promise.reject(Error);
    }
);

export class JRX extends React.Component {
    componentDidMount() {
        this.props.onRendered?.(this);
    }

    render() {
        return <></>;
    }
}

class MapData extends Object {
    append(key, value) {
        this[key] = value;
        return this;
    }
};

export default class JSubmit extends JRX {
    #methods = ["get", "post", "put","patch","download","remove"]

    constructor(props) {
        super(props);
		this.state={
			mask:props.mask??false
		}
    };


    componentDidMount() {
        super.componentDidMount();
        this.#methods
            .filter((method) => this[method] && this.props[method] && this.props[method].autoRun)
            .forEach((method) => {
                this[method](this.props[method].initialValues?{value:this.props[method].initialValues}:null)
            });
    }
    
    formatData( data ) {
        return data;
    }

    dataFormat({ data }) {
        return data;
    }

    setValue(){
        
    }

    setRes(res) {
        this.setValue(res);
    }

    handleSuccess(res,config) {
        const message =config.successMessage
        if (message) {
            msg.success({ message });
        }
        if(config.updateValue===undefined || config.updateValue)
            this.setRes(this.props.dataFormat?.(res) ?? this.dataFormat?.(res) ?? res);
        this.handleEnd()
    }

    handleFailed(res,config) {
        if(parseInt(res?.response?.status)===401){
            window.location.href='/';
        }  
        const message =res?.response?.data.message ?? config.failedMessage
        if (message) {
            msg.error({ message });
        }
        this.handleEnd()
    }

    handleEnd(){
        clearTimeout(this.timeout)
        this.setState({mask:false})
        displaySpinner({mask:false})
    }

    download(config = {}) {
        config = Object.assign({}, this.props["download"], config);

        const extraValue={
            ...config.extraValue
            ,fileName:config.fileName
        }
        config.extraValue=extraValue
        config.method = "get";
        config.responseType='blob'
        config.handleSuccess=(res)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(new Blob([res.data]));
            link.setAttribute("download", config.fileName);
            link.click();

            const message =config.successMessage
            if (message) {
                msg.success({ message });
            }
            this.handleEnd()
        }
        this.submit(config);
    }

    get(config = {}) {
        config = Object.assign(this.props["get"], config);
        config.method = "get";
        this.submit(config);
    }

    put(config = {}) {
        config = Object.assign(this.props["put"], config);
        config.method = "put";
        this.submit(config);
    }

    patch(config = {}) {
        config = Object.assign(this.props["patch"], config);
        config.method = "patch";
        this.submit(config);
    }

    post(config = {}) {
        config = Object.assign(this.props["post"], config);
        config.method = "post";
        this.submit(config);
    }

    remove(config = {}) {
        config = Object.assign(this.props["remove"], config);
        config.method = "delete";
        this.submit(config);
    }

    reload(config={}){
        config = Object.assign({value:this.payload,extraValue:null}, config);
        this.get(config);
    }



    submit(_config) {
        const { url, method, value, extraValue, excludeValue, dataFormat,formatData, response,responseType, withFile,sendValue=true } = _config;

        const handleResponse = (res,payload) => {
            if(Array.isArray(res))res=res.map(re=>re.value)
            try {
                res = response?.(res) ?? res;
                const isSuccess = res.status >= 200 && res.status <= 299;
                if (isSuccess) {
                    res.data = dataFormat?.(res.data,payload) ?? res.data;
                    _config.handleSuccess? _config.handleSuccess.bind(this)( res,_config) : this.handleSuccess(res,_config);
                } else {
                    _config.handleFailed? _config.handleFailed.bind(this)( res,_config) : this.handleFailed(res,_config);
                }
                _config.callback?.bind(this)(isSuccess, res,this,payload);
                this.props.callback?.bind(this)(isSuccess, res, this,payload);
            } catch (error) {
                console.error(error);
                _config.failedMessage='Something wrong on page!'
                _config.handleFailed? _config.handleFailed.bind(this)( res,_config) : this.handleFailed(res,_config);
            }
        };

        if (url) {
            // this.timeout=setTimeout(()=>{
                displaySpinner({mask:_config.mask})
            // } ,200)
            
            const config = {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    ..._config.headers
                }
                ,responseType
            };
            
            if (withFile) {
                config.headers["Content-Type"] = "multipart/form-data";
            }
            
            let payload = Array.isArray(value)
                ?value
                : [
                        ...Object.entries(typeof value === "function" ? value.bind(this)() : value ?? {}),
                        ...Object.entries(typeof extraValue === "function" ? extraValue.bind(this)() : extraValue ?? {})
                    ]
                    .filter(([key]) => excludeValue == null || excludeValue.indexOf(key)==-1)
                    .reduce((aco, [key, value]) => {
                        aco.append(key, value);
                        return aco;
                    }, withFile || _config.formData? new FormData() : new MapData())
                

            if(method === 'get'){
                this.payload=payload
            }

            
            if(formatData){
                payload=formatData.bind(this)(payload) 
            };
            // }

            const preParams=(method,payload,config)=>{
                return method === "get"
                    ? sendValue
                        ? { params: payload,...config } 
                        : config
                    : method === "delete"
                        ? sendValue
                            ? {data: payload,...config }
                            : config                        
                        : sendValue
                            ? payload
                            : null
            }
           
            ;(()=>{
                if (Array.isArray(url)) {
                    return Promise.allSettled(
                        url.map((url) => {
                            if(typeof url === 'object'){
                                const {url:url2,method:method2,value:payload2}=url
                                const params=preParams(method2,payload2,config)
                                return submit[method2](colonValueString(url2,payload2), params, config);
                            }else{
                                const params=preParams(method,payload,config)
                                return submit[method](colonValueString(url,payload), params, config);
                            }
                        })
                    );
                } else {
                    const params=preParams(method,payload,config)
                    return submit[method](colonValueString(url,payload), params, config);
                }
            })()
                .then((res)=>handleResponse(res,payload))
                .catch((res)=>handleResponse(res,payload))
            ;
        }
    }

    renderer(){
        return this.props.children
    }

    xrender() {
        return <Spin spinning={false}>{this.renderer()}</Spin>
    }    

    render() {
        return this.renderer()
    }   
}