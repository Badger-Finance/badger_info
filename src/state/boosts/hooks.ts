import { updateBoostData } from 'state/boosts/actions'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, AppDispatch } from '../index'
import { BoostData } from './reducer'

export function useUpdateBoostData() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((boosts: Array<BoostData>) => dispatch(updateBoostData({ boosts })), [dispatch])
}

export function useBoostData(): Array<BoostData> {
  return useSelector((state: AppState) => state.boosts.boosts)
}
