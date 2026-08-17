import { useStatus } from "../context/StatusContext"
export default function TableSection({title, tables, theme, layout})
{
    const rows = {}
    const groupKey = layout === 'row'?'y':'x'
    const outerFlex = layout === 'row'? "flex flex-col": "flex"
    const innerFlex = layout === 'row'?"flex":'flex flex-col'
    tables.forEach(table => {
        if(!rows[table[groupKey]])
        {
            rows[table[groupKey]] = []
        }
        rows[table[groupKey]].push(table)
    })

    const rowKeys = Object.keys(rows).sort((a,b)=> a-b)
    const {statusMap, dispatch} = useStatus()
    const statusColors = {
        empty:'bg-slate-600',
        seated:'bg-blue-500',
        ordered:'bg-amber-500',
        served:'bg-emerald-500',
        bill:'bg-violet-500'
    }
    return(
        <div>
            <h2 className="text-white text-center">{title}</h2>
            <div className={`${outerFlex} gap-4`}>
                {rowKeys.map(rowKey => (
                    <div key={rowKey} className={`${innerFlex} gap-4`}>
                        {rows[rowKey].map(table => {
                            const currentStatus = statusMap[table.id]
                            return (
                            <div key={table.id} className={`text-white flex justify-center items-center ${statusColors[currentStatus]}
                            ${table.capacity === 'large' && theme==="teal"? 
                            "w-20 h-40 rounded-lg"
                            :table.capacity === 'large' 
                            ?"w-20 h-14 rounded-lg"
                            :"w-14 h-14 rounded-full"
                            }`} onClick={() => dispatch({type:'ADVANCE_STATUS', tableId: table.id})}>
                                {table.id}
                                {currentStatus === 'bill' && <button onClick={(e)=>{
                                    e.stopPropagation()
                                    dispatch({type:'RESET_TABLE_STATE', tableId:table.id})
                                }}>Reset Table</button>}
                            </div>
                        )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}