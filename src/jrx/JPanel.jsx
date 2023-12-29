import JGrid from './JGrid'
import JSubmit from './JSubmit'
import { po } from './Util'

export default class JPanel extends JSubmit {
    setValue(value){
        this.setState({value})
    }

    children(children, allChildren, key) {
        return (Array.isArray(children)
            ? children
            : children
                ? [children]
                : []
            ).map((child,i) => {
                const {type:Type, children,key,ref,props}=child
                if(props.name || props.colSpan){
                    return <Type {...props} value={this.state?.value?.[props.name]} ref={ref} key={key??`jp${i}`}>{children}</Type>
                }else {
                    return child
                }
            }
        ,allChildren)
    }

    tmp(children, allChildren, key){
        return (Array.isArray(children)
            ? children
            : children
                ? [children]
                : []
            ).map((child,i) => {
                const {type:Type, children,key,ref,props}=child
                if(props.colSpan){

                    return <div colSpan={props.colSpan}>{i}</div>
                }else{
                    return child
                }
            }
        ,allChildren)
        // return Array(4).fill().map((a,i)=><div colSpan={2}>{i}</div>)
    }

    renderer(){
        return <JGrid 
            className={this.props.className}
            cols={this.props.cols}
        >
            {/* { this.tmp(this.props.children, [],'') } */}
            {this.children(this.props.children, [],'')}
        </JGrid>
    }
}