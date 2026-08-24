import statusColors from '../data/statusColor'

export default function Lengend()
{
    const statusKeys = Object.keys(statusColors)
    return(
    <div className="flex gap-4 justify-center items-end bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        {statusKeys.map(status => (
            <div key={status} className="flex justify-center items-center gap-2">
                <div className={`w-4 h-4 rounded ${statusColors[status]}`}></div>
                <span className="text-white">{status}</span>
            </div>
        ))}
    </div>
)
}