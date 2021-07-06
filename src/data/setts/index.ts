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

export async function fetchVaultInfo(vaultAddress: string) {
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
        deposits(first: 10, orderBy: pricePerFullShare, orderDirection: desc) {
          amount
          id
          account {
            id
          }
          transaction {
            blockNumber
          }
          pricePerFullShare
        }
        withdrawals(first: 10, orderBy: pricePerFullShare, orderDirection: desc) {
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
    const decimals = data.vault.shareToken.decimals
    const strategy: StrategyInfo = {
      address: data.vault.currentStrategy?.id || 'undefined',
      numHarvests: Number(data.vault.totalHarvestCalls) || 0,
      totalEarnings: Number(data.vault.totalEarnings) || 0,
    }

    const deposits: Array<VaultTransfers> = data.vault.deposits.map(mapTransfers(decimals))
    const withdrawals: Array<VaultTransfers> = data.vault.withdrawals.map(mapTransfers(decimals))

    const harvests: Array<HarvestInfo> = data.vault.harvests.map((h: any) => {
      return {
        transactionHash: h.transaction.id,
        earnings: h.earnings,
        blockNumber: h.transaction.blockNumber,
      }
    })
    const whaleInfo: Array<WhaleInfo> = data.vault.balances.map((b: any) => {
      return {
        address: b.account.id,
        shareBalance: Number(b.shareBalance),
        underlyingBalance: Number(b.shareBalance / data.vault.pricePerFullShare),
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
    console.log(error)
    throw Error(error)
  }
}
function mapTransfers(decimals: number) {
  return (action: any) => {
    return {
      address: action.account.id,
      transactionHash: action.id.split('-')[1],
      amount: action.amount / decimals,
      blockNumber: action.transaction.blockNumber,
    }
  }
}
