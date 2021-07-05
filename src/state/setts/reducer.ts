import { updateSettData, updateWhaleData } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface SettInfo {
  name: string
  vaultToken: string
  tvl: number
  ppfs: number
  minApr: number
  maxApr: number
  sources: Array<RewardsSource>
}
export interface RewardsSource {
  name: string
  minApr: number
  maxApr: number
  boostable: boolean
}

export interface WhaleInfo {
  address: string
  shareBalance: number
  underlyingBalance: number
}
interface Setts {
  setts: Array<SettInfo>
  whales: {
    [vault: string]: Array<WhaleInfo>
  }
}

const initialState: Setts = {
  setts: [],
  whales: {},
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateSettData, (state, { payload: { setts } }) => {
      state.setts = setts
    })
    .addCase(updateWhaleData, (state, { payload: { vault, whales } }) => {
      state.whales[vault] = whales
    })
})
