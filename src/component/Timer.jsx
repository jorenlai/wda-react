import dayjs from "dayjs"
import Countdown from 'react-countdown'
import { po } from "../jrx/Util"
import { useEffect, useState } from "react"

export default function Timer({startTime,length,onComplete}){
    if(length==null){
        return null
    }else{
        const startTimeD=dayjs(startTime)
        const nowLength=startTimeD.add(length,'millisecond')
        const date=startTime + length


        return <div title={`${startTimeD.format('hh:mm:ss')} ~ ${nowLength.format('hh:mm:ss')}`}>
            Timer: <Countdown date={date} onComplete={onComplete} key={startTimeD.valueOf()}/>
        </div>
    }
}