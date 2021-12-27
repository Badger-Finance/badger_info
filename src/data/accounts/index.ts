import gql from 'graphql-tag'
import { nftClient, treeClient } from './../../apollo/client'
import { BADGER_API_URL, ANALYTICS_API_URL } from './../urls'
import { CHAIN } from 'constants/index'
import { AccountData, Balance, ScoreData } from 'state/accounts/reducer'

export async function fetchClaimedBalances(address: string) {
  const FETCH_CLAIMED_BALANCES = gql`
    query($addr: ID!) {
      user(id: $addr) {
        id
        balances(first: 50) {
          token {
            symbol
            id
          }
          amount
        }
      }
    }
  `
  try {
    const { data, errors, loading } = await treeClient.query({
      query: FETCH_CLAIMED_BALANCES,
      variables: {
        addr: address.toLowerCase(),
      },
    })
    const claimedBalancesMap: any = {}
    if (data.user) {
      data.user.balances.forEach((element: any) => {
        claimedBalancesMap[element.token.id] = element.amount
      })
    }

    return {
      error: false,
      data: claimedBalancesMap,
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    }
  }
}

export async function fetchAccountData(address: string) {
  const url = `${BADGER_API_URL}/accounts/${address}?chain=eth`
  const noData = {
    balances: {},
    boost: 0,
    boostRank: 0,
    netWorth: 0,
  } as AccountData

  try {
    const result = await fetch(url)
    const json = await result.json()
    const { error, data } = await fetchClaimedBalances(address)
    if (json?.status == 500 || error) {
      return {
        error: true,
        data: noData,
      }
    }
    const balances = Object.keys(json.data).map((sett: any) => {
      const b = json.data[sett]
      let multiplier = json.multipliers[sett]
      if (!multiplier) {
        multiplier = 1
      }
      return {
        assetName: b.name,
        vaultAddress: sett,
        value: b.value,
        balance: b.balance,
        multiplier: multiplier,
      } as Balance
    })
    return {
      error: false,
      data: {
        balances: balances,
        boost: json.boost,
        boostRank: json.boostRank,
        netWorth: json.value,
        claimedBalances: data,
      } as AccountData,
    }
  } catch (error) {
    return {
      error: true,
      data: noData,
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
  const NFT_QUERY = gql`
    query($userId: ID!) {
      user(id: $userId) {
        id
        nfts(first: 100) {
          id
          amount
        }
      }
    }
  `
  try {
    const { data, error, loading } = await nftClient.query({
      query: NFT_QUERY,
      variables: {
        userId: address.toLowerCase(),
      },
    })
    if (error) {
      return {
        error: true,
        data: [],
      }
    } else {
      if (data.user) {
        return {
          error: false,
          data: data.user.nfts.map((n: any) => {
            const [token, id, user] = n.id.split('-')
            return {
              amount: n.amount,
              token: `${token}-${id}`,
            }
          }),
        }
      }
      {
        return {
          error: true,
          data: [],
        }
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      data: [],
    }
  }
}
