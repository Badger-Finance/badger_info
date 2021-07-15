import { updateBoostData, updateUnlockSchedules } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface BoostData {
  address: string
  boost: number
  stakeRatio: number
  nftMultiplier: number
  nativeBalance: number
  nonNativeBalance: number
}

export interface BoostsState {
  boosts: Array<BoostData>
  unlockSchedules: UnlockSchedules
}
export interface UnlockSchedules {
  [sett: string]: Array<Schedule>
}
export interface Schedule {
  sett: string
  token: string
  initialTokensLocked: number
  startTime: number
  endTime: number
  duration: number
}

export const initalState: BoostsState = {
  boosts: [],
  unlockSchedules: {},
}

export default createReducer(initalState, (builder) => {
  builder
    .addCase(updateBoostData, (state, { payload: { boosts } }) => {
      state.boosts = boosts
    })
    .addCase(updateUnlockSchedules, (state, { payload: { schedules } }) => {
      state.unlockSchedules = schedules
    })
})
