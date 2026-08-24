import { useStatus } from '../context/StatusContext'
import checkIsOverThreshold from '../utils/alertUtils'
import alertThresholds from '../data/alertThresholds'

export default function StatsPanel({currentTime})
{
    const {statusMap} = useStatus()
    const occupiedCount = Object.keys(statusMap).filter(tableId => statusMap[tableId].status !== 'empty').length
    const totalCount = Object.keys(statusMap).length
    const freeCount = totalCount - occupiedCount
    const attentionCount = Object.keys(statusMap).filter(tableId => checkIsOverThreshold(statusMap[tableId].status, statusMap[tableId].statusSince, currentTime,alertThresholds)).length

    return(
        <div className="flex justify-center gap-4 text-white">
            <div>Occupied: {occupiedCount}</div>
            <div>Free: {freeCount}</div>
            <div>Attention: {attentionCount}</div>
        </div>
    )
}