import { NO_EARNINGS } from './../../constants/index'
import { updatePrices, updateSettData, updateVaultInfo } from './actions'
import { AppState, AppDispatch } from './../index'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettInfo, Prices, RewardsSource } from './reducer'
import { fetchVaultInfo, fetchPrices } from 'data/setts'
import { useState, useEffect } from 'react'
export const useUpdateSetts = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (setts: Array<SettInfo>) => {
      dispatch(
        updateSettData({
          setts,
        })
      )
    },

    [dispatch]
  )
}

export const useWhales = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address]?.whaleInfo)
}

export const useDeposits = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address]?.deposits)
}
export const useWithdrawals = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address]?.withdrawals)
}
export const useHarvests = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address]?.harvests)
}

const useVault = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address])
}

export const useUpdatePrices = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (prices: Prices) => {
      dispatch(
        updatePrices({
          prices,
        })
      )
    },
    [dispatch]
  )
}
const usePriceData = (address: string) => {
  const updatePrices = useUpdatePrices()
  const price = usePrice(address)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchPrices()
      if (!error) {
        updatePrices(data)
      }
    }
    if (!price) {
      fetch()
    }
  }, [address])

  return price
}
const usePrice = (address: string) => {
  return useSelector((state: AppState) => state.setts.prices[address])
}
export const usePrices = () => {
  return useSelector((state: AppState) => state.setts.prices)
}

export const useVaultData = (vaultAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const vault = useVault(vaultAddress)
  const price = usePriceData(vaultAddress)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchVaultInfo(vaultAddress, price)
      if (!error) {
        dispatch(
          updateVaultInfo({
            vaultAddress,
            vault: data,
          })
        )
      }
    }
    if (!vault) {
      fetch()
    }
  })
  return vault
}

export const useSetts = () => {
  return useSelector((state: AppState) => state.setts.setts)
}
export const useEarningsData = () => {
  const setts = useSetts()
  return setts
    .filter((s) => s.performanceFee != 0)
    .map((s) => {
      let nonBoostedYield = 0
      s.sources.forEach((source) => {
        if (!source.name.includes('Badger')) {
          nonBoostedYield += source.maxApr
        }
      })
      const yearlyRevenue = (((s.tvl * s.performanceFee) / 1e4) * nonBoostedYield) / 100
      const maintenanceCost = 49000
      return {
        vault: s.name,
        yield: nonBoostedYield,
        tvl: s.tvl,
        yearlyRevenue,
        maintenanceCost,
        grossProfit: yearlyRevenue - maintenanceCost,
      }
    })
}

export const useSettByAddress = (address: string) => {
  return useSelector((state: AppState) => {
    return state.setts.setts.find((s: SettInfo) => {
      return s.vaultToken == address
    })
  })
}
