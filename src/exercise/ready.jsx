import { Link } from 'react-router-dom'
import JPanel from '../jrx/JPanel'



export default function ReadyApp(){
    return <JPanel>Ready
        <Link to={'/exercise/anp/administrator'}>Administrator</Link>
        <Link to={'/exercise/anp/plan'}>Plan</Link>
    </JPanel>
}