import { getTimestampOfBlock } from 'data/cycles'
export function msToTime(ms: number) {
  const seconds = (ms / 1000).toFixed(1)
  const minutes = (ms / (1000 * 60)).toFixed(1)
  const hours = (ms / (1000 * 60 * 60)).toFixed(1)
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1)
  if (Number(seconds) < 60) return seconds + ' Sec'
  else if (Number(minutes) < 60) return minutes + ' Min'
  else if (Number(hours) < 24) return hours + ' Hrs'
  else return days + ' Days'
}

export async function calcTimeBetweenBlocks(startBlock: number, endBlock: number) {
  const { error: errorStart, data: startTime } = await getTimestampOfBlock(startBlock)
  const { error: errorEnd, data: endTime } = await getTimestampOfBlock(endBlock)
  if (!errorStart && !errorEnd) {
    return {
      error: false,
      data: {
        diff: msToTime((endTime - startTime) * 1000),
        startDate: unixToDate(startTime),
        endDate: unixToDate(endTime),
      },
    }
  } else {
    return { error: true, data: {} }
  }
}
export function dateToString(date: Date) {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return `${dateString} ${time}`
}

export function unixToDateString(unixTimestamp: number) {
  return unixToDate(unixTimestamp).toUTCString()
}
function unixToDate(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000)
}
