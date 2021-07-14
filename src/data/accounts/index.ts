import { BADGER_API_URL, ANALYTICS_API_URL } from './../urls'
import { AccountData, Balance, ScoreData } from 'state/accounts/reducer'
export async function fetchAccountData(address: string) {
  const url = `${BADGER_API_URL}/accounts/${address}?chain=eth`
  try {
    const result = await fetch(url)
    const json = await result.json()
    if (json?.status == 500) {
      return {
        error: true,
      }
    }
    const balances = json.balances.map((b: any) => {
      let multiplier = json.multipliers[b.id]
      if (!multiplier) {
        multiplier = 1
      }
      return {
        assetName: b.name,
        vaultAddress: b.id,
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

    const conditions: Array<ScoreData> = []
    Object.keys(json.conditions).forEach((cond) => {
      if (!(cond in json.data)) {
        conditions.push({
          [json.conditions[cond]]: 0,
        })
      } else {
        conditions.push({
          [json.conditions[cond]]: json.data[cond],
        })
      }
    })
    return {
      error: false,
      data: conditions,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      data: [],
    }
  }
}

export async function fetchNftScore(address: string) {
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/nft_score/${address}`)
    const json = await result.json()
    console.log(json)
    if (!json.success) {
      return {
        error: true,
        data: {},
      }
    } else {
      return {
        error: false,
        data: {
          ...json.data,
          nfts: json.data.nfts.map((n: any) => {
            return {
              amount: n.amount,
              token: n.token.id,
            }
          }),
        },
      }
    }
  } catch (error) {
    return {
      error: true,
      data: {},
    }
  }
}
