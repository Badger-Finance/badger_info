import { CHAIN } from './../../constants/index'
import { BoostData } from 'state/boosts/reducer'
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
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/schedules?chain=${CHAIN}`)
    const json = await result.json()
    Object.entries(json.data.schedules).map(([sett, data]: any) => {
      json.data.schedules[sett] = data
    })
    return {
      error: false,
      data: json.data.schedules,
    }
  } catch (error) {
    return {
      error: false,
      data: {},
    }
  }
}
