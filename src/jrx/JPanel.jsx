import JGrid from './JGrid'
import JSubmit from './JSubmit'

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

    renderer(){
        return <JGrid 
            className={this.props.className}
            cols={this.props.cols}
        >
            {this.children(this.props.children, [],'')}
        </JGrid>
    }
}