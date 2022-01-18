import { getAddress } from '@ethersproject/address'
import { CHAIN } from './../../constants/index'
import { BoostData } from 'state/boosts/reducer'
import gql from 'graphql-tag'
import { treeClient } from './../../apollo/client'
import { ANALYTICS_API_URL } from 'data/urls'
export async function fetchBoosts() {
  const boostArray: Array<BoostData> = []
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/boosts`)
    let json = await result.json()
    json = json.data
    for (const item of Object.entries(json['boosts']['userData'])) {
      const address = item[0]
      const data: any = item[1]
      boostArray.push({
        address: address,
        boost: Number(data.boost) || 0,
        stakeRatio: Number(data.stakeRatio) || 0,
        nftMultiplier: Number(data.nftMultiplier) || 0,
        nativeBalance: Number(data.nativeBalance) || 0,
        nonNativeBalance: Number(data.nonNativeBalance) || 0,
        nftBalance: Number(data.nftBalance) || 0,
      })
    }
    return {
      error: false,
      data: boostArray,
    }
  } catch (error) {
    return {
      error: true,
      data: [],
    }
  }
}
export async function fetchSchedules() {
  const currentTime = Math.floor(Date.now() / 1000)
  console.log(currentTime)
  const FETCH_SCHEDULES = gql`
    query($endBlock: UnlockSchedule_filter) {
      unlockSchedules(first: 1000, where: $endBlock, orderBy: timestamp, orderDirection: desc) {
        id
        amount
        start
        end
        duration
        token {
          id
          symbol
        }
        vault
      }
    }
  `
  try {
    const scheduleData: any = {}
    const { data, errors, loading } = await treeClient.query({
      query: FETCH_SCHEDULES,
      variables: {
        endBlock: {
          end_gt: currentTime,
          start_lt: currentTime,
        },
      },
    })
    data.unlockSchedules.forEach((s: any) => {
      const addr = getAddress(s.vault)
      const schedule = {
        sett: addr,
        token: s.token.id,
        initialTokensLocked: s.amount,
        startTime: s.start,
        endTime: s.end,
        duration: s.duration,
      }
      if (addr in scheduleData) {
        scheduleData[addr].push(schedule)
      } else {
        scheduleData[addr] = [schedule]
      }
    })
    return {
      error: false,
      data: scheduleData,
    }
  } catch (error) {
    return {
      error: true,
      data: [],
    }
  }
}
