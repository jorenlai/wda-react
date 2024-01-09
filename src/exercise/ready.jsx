import { Link, useNavigate } from 'react-router-dom'
import JPanel from '../jrx/JPanel'
import { useEffect } from 'react'



export default function ReadyApp(){
    const navigate=useNavigate()
    useEffect(()=>{
        navigate('/exercise/anp/administrator')
    },[])
    return null
}