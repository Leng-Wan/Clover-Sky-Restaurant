import { floorPlan } from "../data/floorPlan";

export function getInitialStatusMap()
{
    const statuses = {}
    floorPlan.forEach(floor => {
        statuses[floor.id] = {status:floor.status, statusSince:Date.now()}
    })

    return statuses
}

export function statusReducer(state, action)
{
    switch (action.type)
    {
        case "ADVANCE_STATUS":{
            const tableState = state[action.tableId]
            const currentStatus = tableState.status
            const nextStatus = 
                currentStatus === "empty"? "seated"
                :currentStatus === "seated"?"ordered"
                :currentStatus === "ordered"?"served"
                :currentStatus === "served"?"bill"
                :"empty"

            return {...state, [action.tableId]:{status:nextStatus, statusSince:Date.now()}}
        }
        case "RESET_TABLE_STATE":{
            return {...state,[action.tableId]:{status:'empty', statusSince:Date.now()}}
        }
        default: return state;
    }
}