import { updateSettData } from './actions'
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
interface Setts {
  setts: Array<SettInfo>
}

const initialState: Setts = {
  setts: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(updateSettData, (state, { payload: { setts } }) => {
    state.setts = setts
  })
})
