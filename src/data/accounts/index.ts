const API_URL = 'https://staging-api.badger.finance/v2'
import { AccountData, Balance } from 'state/accounts/reducer'
export async function fetchAccountData(address: string) {
  const url = `${API_URL}/accounts/${address}?chain=eth`
  try {
    const result = await fetch(url)
    const json = await result.json()
    const balances = json.balances.map((b: any) => {
      let multiplier = json.multipliers[b.id]
      if (!multiplier) {
        multiplier = 1
      }
      return {
        assetName: b.name,
        value: b.value,
        balance: b.balance,
        multiplier: multiplier,
      } as Balance
    })
    return {
      error: false,
      data: {
        balances,
        boost: json.boost,
        boostRank: json.boostRank,
        netWorth: json.value,
      } as AccountData,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
    }
  }
}
