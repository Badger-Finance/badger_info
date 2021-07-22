import { StrategyInfo, VaultTransfers, HarvestInfo, WhaleInfo, VaultInfo } from './../../state/setts/reducer'
import { BADGER_API_URL } from './../urls'
import gql from 'graphql-tag'
import { settsClient } from 'apollo/client'
import { formatBalanceAmount } from 'utils/numbers'
export async function fetchSetts() {
  try {
    const result = await fetch(`${BADGER_API_URL}/setts`)
    const json = await result.json()
    return {
      error: false,
      data: json.map((sett: any) => {
        return {
          name: sett.name,
          vaultToken: sett.vaultToken,
          tvl: sett.value,
          ppfs: sett.ppfs,
          minMultiplier: sett.minApr ? sett.minApr / sett.apr : 1,
          maxMultiplier: sett.maxApr ? sett.maxApr / sett.apr : 1,
          minApr: sett.minApr || sett.apr,
          maxApr: sett.maxApr || sett.apr,
          sources: sett.sources.map((s: any) => {
            return {
              name: s.name,
              minApr: s.boostable ? s.minApr : s.apr,
              maxApr: s.boostable ? s.maxApr : s.apr,
              boostable: s.boostable,
            }
          }),
        }
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      data: [],
    }
  }
}
export async function fetchPrices() {
  try {
    const result = await fetch(`${BADGER_API_URL}/prices`)
    const json = await result.json()
    return {
      data: json,
      error: false,
    }
  } catch (error) {
    return {
      data: {},
      error: true,
    }
  }
}
export async function fetchVaultInfo(vaultAddress: string, sharePrice: number) {
  const FETCH_VAULT_INFO = gql`
    query($vaultAddr: ID) {
      vault(id: $vaultAddr) {
        id
        pricePerFullShare
        shareToken {
          symbol
          decimals
        }
        currentStrategy {
          id
        }
        totalEarnings
        totalHarvestCalls
        balances(first: 10, orderBy: shareBalance, orderDirection: desc) {
          account {
            id
          }
          shareBalance
        }
        deposits(first: 10, orderBy: blockNumber, orderDirection: desc) {
          amount
          id
          account {
            id
          }
          transaction {
            blockNumber
          }
        }
        withdrawals(first: 10, orderBy: blockNumber, orderDirection: desc) {
          amount
          id
          account {
            id
          }
          transaction {
            blockNumber
          }
        }
        harvests(first: 10, orderBy: pricePerFullShareAfter, orderDirection: desc) {
          earnings
          transaction {
            id
            blockNumber
          }
        }
      }
    }
  `
  try {
    const { data, errors, loading } = await settsClient.query({
      query: FETCH_VAULT_INFO,
      variables: {
        vaultAddr: vaultAddress.toLowerCase(),
      },
    })
    let ppfs = data.vault.pricePerFullShare
    if (ppfs < 1) {
      ppfs *= 1e10
    }
    const decimals = data.vault.shareToken.decimals
    const strategy: StrategyInfo = {
      address: data.vault.currentStrategy?.id || 'undefined',
      numHarvests: Number(data.vault.totalHarvestCalls) || 0,
      totalEarnings: Number(data.vault.totalEarnings) || 0,
    }
    const deposits: Array<VaultTransfers> = data.vault.deposits.map(mapTransfers(decimals, sharePrice, ppfs))
    const withdrawals: Array<VaultTransfers> = data.vault.withdrawals.map(mapTransfers(decimals, sharePrice, ppfs))

    const harvests: Array<HarvestInfo> = data.vault.harvests.map((h: any) => {
      return {
        transactionHash: h.transaction.id,
        earnings: Number(h.earnings),
        blockNumber: h.transaction.blockNumber,
      }
    })
    const whaleInfo: Array<WhaleInfo> = data.vault.balances.map((b: any) => {
      if (data.vault.pricePerFullShare < 1) {
        data.vault.pricePerFullShare *= 1e10
      }
      return {
        address: b.account.id,
        shareBalance: Number(b.shareBalance),
        value: (Number(b.shareBalance) * sharePrice) / ppfs,
      }
    })
    const vaultInfo: VaultInfo = {
      strategy,
      deposits,
      withdrawals,
      whaleInfo,
      harvests,
    }
    return {
      data: vaultInfo,
      error: false,
    }
  } catch (error) {
    return {
      data: {
        strategy: {
          address: 'Vault not found',
          numHarvests: 0,
          totalEarnings: 0,
        },
        deposits: [],
        withdrawals: [],
        whaleInfo: [],
        harvests: [],
      },
      error: true,
    }
  }
}
function mapTransfers(decimals: number, sharePrice: number, ppfs: number) {
  return (action: any) => {
    return {
      address: action.account.id,
      transactionHash: action.id.split('-')[1],
      amount: action.amount / Math.pow(10, decimals),
      value: ((action.amount / Math.pow(10, decimals)) * sharePrice) / ppfs,
    }
  }
}
