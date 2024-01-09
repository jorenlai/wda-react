import JGrid from './JGrid'
import JSubmit from './JSubmit'
import { po } from './Util'

export default class JPanel extends JSubmit {
    setValue(value){
        this.setState({readyState:true,value})
    }

    children(children, allChildren, key) {
        return (Array.isArray(children)
            ? children
            : children
                ? [children]
                : []
            ).map((child,i) => {
                if(typeof child ==='function'){
                    return child.bind(this)({value:this.state?.value,index:1})
                }else{
                    const {type:Type, children,key,ref,props}=child
                    if(props.name || props.colSpan){
                        return <Type {...props} value={this.state?.value?.[props.name]} ref={ref} key={key??`jp${i}`}>{children}</Type>
                    }else {
                        return child
                    }
                }
            }
        ,allChildren)
    }

    renderer(){
        return (this.props.waitForReadState===true &&  this.state.readyState) || this.props.waitForReadState!==true
            ?<JGrid 
                style={this.props.style}
                className={this.props.className}
                cols={this.props.cols}
            >
                {this.children(this.props.children, [],'')}
            </JGrid>
            :null
    }
}