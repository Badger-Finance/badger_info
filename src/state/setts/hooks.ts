import { updateSettData, updateWhaleData } from './actions'
import { AppState, AppDispatch } from './../index'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettInfo, WhaleInfo } from './reducer'
import { fetchWhales } from 'data/setts'
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

export const useUpdateWhales = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (whales: Array<WhaleInfo>, vault: string) =>
      dispatch(
        updateWhaleData({
          vault,
          whales,
        })
      ),
    [dispatch]
  )
}

export const useWhales = (address: string) => {
  return useSelector((state: AppState) => state.setts.whales[address])
}

export const useWhaleData = (address: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const whaleData = useWhales(address)
  const sett = useSettByAddress(address)
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchWhales(address)
      if (!error) {
        dispatch(
          updateWhaleData({
            vault: address,
            whales: data.map((w: any) => {
              return {
                ...w,
                underlyingBalance: w.shareBalance / (sett?.ppfs || 1),
              }
            }),
          })
        )
      }
    }
    if (!whaleData) {
      fetch()
    }
  }, [address, whaleData, dispatch])
  return whaleData
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
