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
        boost: data.boost || 0,
        stakeRatio: data.stakeRatio || 0,
        nftMultiplier: data.nftMultiplier || 0,
        nativeBalance: data.nativeBalance || 0,
        nonNativeBalance: data.nonNativeBalance || 0,
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
    const result = await fetch(`${ANALYTICS_API_URL}/schedules`)
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
