import { BADGER_API_URL } from './../urls'
import gql from 'graphql-tag'
import { settsClient } from 'apollo/client'
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

export async function fetchWhales(vaultAddress: string) {
  const FETCH_WHALES = gql`
    query($vaultAddr: AccountVaultBalance_filter) {
      accountVaultBalances(first: 6, where: $vaultAddr, orderBy: shareBalance, orderDirection: desc) {
        account {
          id
        }
        shareBalance
      }
    }
  `
  try {
    const { data, errors, loading } = await settsClient.query({
      query: FETCH_WHALES,
      variables: {
        vaultAddr: {
          vault: vaultAddress.toLowerCase(),
        },
      },
    })
    return {
      data: data.accountVaultBalances.map((avb: any) => {
        return {
          address: avb.account.id,
          shareBalance: avb.shareBalance,
        }
      }),
      error: false,
    }
  } catch (error) {
    console.log(error)
    return {
      data: {},
      error: true,
    }
  }
}
