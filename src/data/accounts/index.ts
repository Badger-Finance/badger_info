import { BADGER_API_URL, ANALYTICS_API_URL } from './../urls'
import { AccountData, Balance } from 'state/accounts/reducer'
export async function fetchAccountData(address: string) {
  const url = `${BADGER_API_URL}/accounts/${address}?chain=eth`
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

export async function fetchScores(address: string) {
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/scores/${address}`)
    const json = await result.json()
    //TODO: convert json to right ScoreData
    return {
      error:false,
      data:json
    }

    
  } catch(error) {
    return {
      error:true,
      data:{}
    }
  }
}
