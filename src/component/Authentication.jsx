import { useEffect, useRef, useState } from "react"
import { userActions } from "../redux/user"
import JSubmit from "../jrx/JSubmit"
import { useDispatch, useSelector } from "react-redux"

export default function Authentication({ children}){
    const [stateReady, setStateReady] = useState(false)
    const submitRef=useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return <JSubmit
        ref={submitRef}
        get={{
            url:'/me.json'
            ,autoRun:true
            ,callback(success,res){
                if(success){
                    dispatch(userActions.setState(res.data))
                }
                setStateReady(true)
            }
        }}
    >{
        stateReady
        ? user.name===null
            ? <div>Invalid user</div>
            : children
        : null    
    }</JSubmit>
}