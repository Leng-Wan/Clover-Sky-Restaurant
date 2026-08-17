import { getInitialStatusMap,statusReducer } from "../reducers/statusReducer";
import { useReducer, createContext, useContext } from "react";

const StatusContext = createContext()
export default function StatusProvider({children})
{   
    const [statusMap, dispatch] = useReducer(statusReducer, getInitialStatusMap())

    const ctxValue = {statusMap, dispatch}

    return (
        <StatusContext.Provider value={ctxValue}>
            {children}
        </StatusContext.Provider>
    )
}

export function useStatus()
{
    return useContext(StatusContext)
}
