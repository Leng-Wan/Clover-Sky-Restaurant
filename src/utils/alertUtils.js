function checkIsOverThreshold(status, statusSince, currentTime, alertThresholds)
{
    const elapsedMs = currentTime - statusSince
    const elapsedMinutes = Math.max(0, Math.floor(elapsedMs / 60000))
    const isOverThreshold = elapsedMinutes > alertThresholds[status]
    return isOverThreshold
}

export default checkIsOverThreshold