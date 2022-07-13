import { StrategyInfo, VaultTransfers, HarvestInfo, WhaleInfo, VaultInfo } from './../../state/setts/reducer'
import { BADGER_API_URL } from './../urls'
import { CHAIN } from 'constants/index'
import gql from 'graphql-tag'
import { settsClient } from 'apollo/client'
import { formatBalanceAmount } from 'utils/numbers'
export async function fetchSetts() {
  try {
    const result = await fetch(`${BADGER_API_URL}/setts?chain=${CHAIN}`)
    const json = await result.json()
    return {
      error: false,
      data: json.map((sett: any) => {
        return {
          name: sett.name,
          vaultToken: sett.vaultToken,
          tvl: sett.value,
          ppfs: sett.pricePerFullShare,
          minMultiplier: sett.minApr ? sett.minApr / sett.apr : 1,
          maxMultiplier: sett.maxApr ? sett.maxApr / sett.apr : 1,
          minApr: sett.minApr || sett.apr,
          maxApr: sett.maxApr || sett.apr,
          performanceFee: sett.strategy.performanceFee,
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
    const result = await fetch(`${BADGER_API_URL}/prices?chain=${CHAIN}`)
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
    query($vaultAddr: ID, $zeroAddr: ID) {
      sett(id: $vaultAddr) {
        id
        pricePerFullShare
        token {
          symbol
          decimals
        }
        strategy {
          id
        }
        harvests(first: 10, orderBy: timestamp, orderDirection: desc) {
          id
          amount
          blockNumber
        }
      }
      userSettBalances(first: 10, orderBy: netShareDeposit, orderDirection: desc, where: { sett: $vaultAddr }) {
        id
        user {
          id
        }
        netShareDeposit
        netDeposit
      }
      deposits: transfers(
        first: 10
        orderBy: timestamp
        orderDirection: desc
        where: { sett: $vaultAddr, from: $zeroAddr }
      ) {
        id
        amount
        to {
          id
        }
      }
      withdrawals: transfers(
        first: 10
        orderBy: timestamp
        orderDirection: desc
        where: { sett: $vaultAddr, to: $zeroAddr }
      ) {
        id
        amount
        from {
          id
        }
      }
    }
  `
  try {
    const { data, errors, loading } = await settsClient.query({
      query: FETCH_VAULT_INFO,
      variables: {
        vaultAddr: vaultAddress.toLowerCase(),
        zeroAddr: '0x0000000000000000000000000000000000000000'.toLowerCase(),
      },
    })
    let ppfs = data.sett.pricePerFullShare
    if (ppfs < 1) {
      ppfs *= 1e10
    }
    const decimals = data.sett.token.decimals
    const strategy: StrategyInfo = {
      address: data.sett.strategy?.id || 'undefined',
      numHarvests: Number(data.sett.totalHarvestCalls) || 0,
      totalEarnings: Number(data.sett.totalEarnings) || 0,
    }
    const harvests: Array<HarvestInfo> = data.sett.harvests.map((h: any) => {
      return {
        transactionHash: h.id.split('-')[0],
        earnings: Number(h.amount) / 1e18,
        blockNumber: Number(h.blockNumber),
      }
    })
    const whaleInfo: Array<WhaleInfo> = data.userSettBalances.map((w: any) => {
      return {
        address: w.user.id,
        shareBalance: Number(w.netShareDeposit) / 1e18,
        value: (Number(w.netDeposit) / 1e18) * sharePrice,
      }
    })
    const deposits: Array<VaultTransfers> = data.deposits.map(mapTransfers(decimals, sharePrice, ppfs))
    const withdrawals: Array<VaultTransfers> = data.withdrawals.map(mapTransfers(decimals, sharePrice, ppfs))
    const vaultInfo: VaultInfo = {
      strategy,
      deposits: deposits,
      withdrawals: withdrawals,
      whaleInfo: whaleInfo,
      harvests,
    }
    return {
      data: vaultInfo,
      error: false,
    }
  } catch (error) {
    console.log(error)
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
      address: action?.from?.id || action?.to?.id,
      transactionHash: action.id.split('-')[0],
      amount: action.amount / Math.pow(10, decimals),
      value: (action.amount / 1e18) * sharePrice,
    }
  }
}
