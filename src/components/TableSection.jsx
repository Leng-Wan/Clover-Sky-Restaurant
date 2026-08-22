import { useStatus } from "../context/StatusContext"
import statusColors from "../data/statusColor"
import alertThresholds from "../data/alertThresholds"

export default function TableSection({title, tables, theme, layout, currentTime})
{
    const rows = {}
    const groupKey = layout === 'row' ? 'y' : 'x'
    const outerFlex = layout === 'row' ? "flex flex-col" : "flex"
    const innerFlex = layout === 'row' ? "flex" : 'flex flex-col'
    tables.forEach(table => {
        if(!rows[table[groupKey]])
        {
            rows[table[groupKey]] = []
        }
        rows[table[groupKey]].push(table)
    })

    const rowKeys = Object.keys(rows).sort((a,b) => a-b)
    const {statusMap, dispatch} = useStatus()

    return(
        <div className="flex flex-col items-center">
            <h2 className="text-white">{title}</h2>
            <div className={`${outerFlex} gap-4`}>
                {rowKeys.map(rowKey => (
                    <div key={rowKey} className={`${innerFlex} gap-4`}>
                        {rows[rowKey].map(table => {
                            const tableState = statusMap[table.id]
                            const currentStatus = tableState.status
                            const elapsedMs = currentTime - tableState.statusSince
                            const elapsedMinutes = Math.max(0,Math.floor(elapsedMs / 60000))
                            const isOverThreshold = elapsedMinutes > alertThresholds[currentStatus]
                            return (
                                <div
                                    key={table.id}
                                    className={`text-white flex flex-col justify-center items-center cursor-pointer ${statusColors[currentStatus]}
                                    ${currentStatus !== 'empty' ? "w-30 h-28 rounded-lg"
                                    : table.capacity === 'large' && theme === "teal" ? "w-20 h-40 rounded-lg"
                                    : table.capacity === 'large' ? "w-20 h-14 rounded-lg"
                                    : "w-14 h-14 rounded-full"
                                    } ${isOverThreshold ? "border-red-500 border-2":""}`}
                                    onClick={() => {
                                        if(currentStatus !== 'bill')
                                        {
                                            dispatch({type:'ADVANCE_STATUS', tableId:table.id})
                                        }
                                    }}
                                >
                                    <div>
                                         {table.id}
                                    </div>
                                    <div>
                                         {currentStatus !== 'empty' && `${currentStatus} - ${elapsedMinutes}m ago`}
                                    </div>
                                    {currentStatus === 'bill' && (
                                        <button
                                            className="text-sm px-2 py-1 rounded-full bg-white text-violet-600"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                dispatch({type: 'RESET_TABLE_STATE', tableId: table.id})
                                            }}
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}