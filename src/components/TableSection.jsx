import { useStatus } from "../context/StatusContext"
import statusColors from "../data/statusColor"

export default function TableSection({title, tables, theme, layout})
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
                            const currentStatus = statusMap[table.id]
                            return (
                                <div
                                    key={table.id}
                                    className={`text-white flex flex-col justify-center items-center cursor-pointer ${statusColors[currentStatus]}
                                    ${currentStatus === 'bill' ? "w-24 h-24 rounded-lg"
                                    : table.capacity === 'large' && theme === "teal" ? "w-20 h-40 rounded-lg"
                                    : table.capacity === 'large' ? "w-20 h-14 rounded-lg"
                                    : "w-14 h-14 rounded-full"
                                    }`}
                                    onClick={() => {
                                        if(currentStatus !== 'bill')
                                        {
                                            dispatch({type:'ADVANCE_STATUS', tableId:table.id})
                                        }
                                    }}
                                >
                                    {table.id}
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