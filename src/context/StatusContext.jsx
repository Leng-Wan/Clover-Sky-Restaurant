import {statusReducer } from "../reducers/statusReducer";
import { useReducer, createContext, useContext, useEffect,useState } from "react";

const StatusContext = createContext()
export default function StatusProvider({children})
{   
    const [isLoading, setIsLoading] = useState(true)
    const [statusMap, dispatch] = useReducer(statusReducer, {})
    useEffect(() =>{
            async function FetchingDataFromAPI()
            {
                const res = await fetch("http://localhost:3000/tables")
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

