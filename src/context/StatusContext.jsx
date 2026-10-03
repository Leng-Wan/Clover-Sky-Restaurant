import {statusReducer } from "../reducers/statusReducer";
import { useReducer, createContext, useContext, useEffect,useState } from "react";
import.meta.env 

const StatusContext = createContext()
export default function StatusProvider({children})
{   
    const [isLoading, setIsLoading] = useState(true)
    const [statusMap, dispatch] = useReducer(statusReducer, {})
    useEffect(() =>{
            async function FetchingDataFromAPI()
            {
                const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}/tables`)
                const data = await res.json()
                dispatch({type:"INIT_STATUS", tables:data})
                setIsLoading(false)
            }
    
            FetchingDataFromAPI()
        },[]
        )
    const ctxValue = {statusMap, dispatch}

    return (isLoading !== true ?  <StatusContext.Provider value={ctxValue}>
            {children}
        </StatusContext.Provider> : <div>Loading.....</div>)
}

export function useStatus()
{
    return useContext(StatusContext)
}

