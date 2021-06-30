import { BoostData } from 'state/boosts/reducer'
const API_URL = 'https://badger-analytics.herokuapp.com'
export async function fetchBoosts() {
  const boostArray: Array<BoostData> = []
  try {
    const result = await fetch(`${API_URL}/boosts`)
    const json = await result.json()
    for (const item of Object.entries(json['userData'])) {
      const address = item[0]
      const data: any = item[1]
      boostArray.push({
        address: address,
        boost: data.boost,
        stakeRatio: data.stakeRatio,
        nftMultiplier: data.nftMultiplier,
        nativeBalance: data.nativeBalance,
        nonNativeBalance: data.nonNativeBalance,
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
