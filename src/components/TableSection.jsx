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
    return(
        <div>
            <h2 className="text-white text-center">{title}</h2>
            <div className={`${outerFlex} gap-4`}>
                {rowKeys.map(rowKey => (
                    <div key={rowKey} className={`${innerFlex} gap-4`}>
                        {rows[rowKey].map(table => (
                            <div key={table.id} className={`text-white flex justify-center items-center bg-slate-600 
                            ${table.capacity === 'large' && theme==="teal"? 
                            "w-20 h-40 rounded-lg"
                            :table.capacity === 'large' 
                            ?"w-20 h-14 rounded-lg"
                            :"w-14 h-14 rounded-full"
                            }`}>
                                {table.id}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}