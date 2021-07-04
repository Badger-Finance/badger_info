import { updateSettData } from './actions'
import { createReducer } from '@reduxjs/toolkit'

export interface SettInfo {
  name: string
  vaultToken: string
  tvl: number
  ppfs: number
  minApr: number
  maxApr: number
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
