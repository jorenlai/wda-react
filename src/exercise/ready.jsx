import { Link, useNavigate, useParams } from 'react-router-dom'
import JPanel from '../jrx/JPanel'
import { useEffect } from 'react'



export default function ReadyApp(){

    const { type } = useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        navigate(`/${type}/anp/web`)
    },[])
    return null
}