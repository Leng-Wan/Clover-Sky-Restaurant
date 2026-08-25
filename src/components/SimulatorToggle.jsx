import {useState,useEffect} from 'react'
import {useStatus} from '../context/StatusContext'

export default function SimulatorToggle()
{
    const [toggle, setToggle] = useState(false)
    const {statusMap, dispatch} = useStatus()

    useEffect(()=>{
        if(toggle === true)
        {
            const intervalId = setInterval(() => {
            const tableIds = Object.keys(statusMap)
            const numberOfTables = tableIds.length
            const randomIndex = Math.floor(Math.random() * numberOfTables)
            const randomTableId = tableIds[randomIndex]
                dispatch({type:"ADVANCE_STATUS", tableId: randomTableId})
            },3000)
            return ()=> clearInterval(intervalId)
        }
    },[toggle])

    return(
        <div>
            <button onClick={()=> setToggle(!toggle)} className='text-sm p-4 rounded-full bg-white text-violet-600'>
                {toggle ? "Stop Simulator":"Start Simulator"}
            </button>
        </div>
    )
}

