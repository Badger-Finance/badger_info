import { updateSettData, updateVaultInfo } from './actions'
import { AppState, AppDispatch } from './../index'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettInfo, WhaleInfo } from './reducer'
import { fetchVaultInfo } from 'data/setts'
import { useState, useEffect } from 'react'

export const useUpdateSetts = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (setts: Array<SettInfo>) =>
      dispatch(
        updateSettData({
          setts,
        })
      ),
    [dispatch]
  )
}

export const useWhales = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address]?.whaleInfo)
}

const useVault = (address: string) => {
  return useSelector((state: AppState) => state.setts.vaults[address])
}

export const useVaultData = (vaultAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const vault = useVault(vaultAddress)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchVaultInfo(vaultAddress)
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
export const useSettByAddress = (address: string) => {
  return useSelector((state: AppState) => {
    return state.setts.setts.find((s: SettInfo) => {
      return s.vaultToken == address
    })
  })
}
