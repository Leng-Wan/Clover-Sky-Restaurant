import { floorPlan } from "../data/floorPlan";

export function getInitialStatusMap()
{
    const statuses = {}
    floorPlan.forEach(floor => {
        statuses[floor.id] = floor.status
    })

    return statuses
}

export function statusReducer(state, action)
{
    switch (action.type)
    {
        case "ADVANCE_STATUS":{
            const currentStatus = state[action.tableId]
            const nextStatus = 
                currentStatus === "empty"? "seated"
                :currentStatus === "seated"?"ordered"
                :currentStatus === "ordered"?"served"
                :currentStatus === "served"?"bill"
                :"empty"

            return {...state, [action.tableId]:nextStatus}
        }
        case "RESET_TABLE_STATE":{
            return {...state,[action.tableId]:'empty'}
        }
        default: return state;
    }
}