import JSubmit from './JSubmit'

export default class JPanel extends JSubmit {
    renderer(){
        return <div className={this.props.className}>JPanel {this.props.children}</div>
    }
}