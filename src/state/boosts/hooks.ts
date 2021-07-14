import { updateBoostData, updateUnlockSchedules } from 'state/boosts/actions'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, AppDispatch } from '../index'
import { BoostData, UnlockSchedules } from './reducer'
import { fetchSchedules } from 'data/boosts'

export function useUpdateBoostData() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((boosts: Array<BoostData>) => dispatch(updateBoostData({ boosts })), [dispatch])
}

export function useBoostData(): Array<BoostData> {
  return useSelector((state: AppState) => state.boosts.boosts)
}

function useSchedules(): UnlockSchedules {
  return useSelector((state: AppState) => state.boosts.unlockSchedules)
}

export function useSchedulesData() {
  const dispatch = useDispatch<AppDispatch>()
  const schedules = useSchedules()
  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchSchedules()
      if (!error) {
        dispatch(updateUnlockSchedules({ schedules: data }))
      }
    }
    if (!Object.keys(schedules).length) {
      fetch()
    }
  }, [schedules, dispatch])
  return schedules
}
