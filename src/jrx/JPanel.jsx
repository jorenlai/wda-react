import JSubmit from './JSubmit'

export default class JPanel extends JSubmit {
    renderer(){
        return <div className={this.props.className}>{this.props.children}</div>
    }
}