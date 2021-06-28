import { updateBoostData } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface BoostData {
  address: string
  boost: number
  stakeRatio: number
  nftMultiplier: number
  nativeBalance: number
  nonNativeBalance: number
}

interface BoostsState {
  boosts: Array<BoostData>
}

export const initalState: BoostsState = {
  boosts: [],
}

export default createReducer(initalState, (builder) => {
  builder.addCase(updateBoostData, (state, { payload: { boosts } }) => {
    state.boosts = boosts
  })
})
