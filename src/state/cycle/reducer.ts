import { createReducer } from '@reduxjs/toolkit'
import { addCyclePage } from './actions'
export interface CycleData {
  cycle: number
  merkleRoot: string
  contentHash: string
  startBlock: number
  endBlock: number
  totalTokenDist: TokenDist
}
interface TokenDist {
  [sett: string]: {
    [token: string]: number
  }
}

interface CycleState {
  cyclePages: {
    [cyclePages: number]: Array<CycleData>
  }
}
export const initalState: CycleState = {
  cyclePages: {},
}
export default createReducer(initalState, (builder) => {
  builder.addCase(addCyclePage, (state, { payload: { cycles, page } }) => {
    state.cyclePages[page] = cycles
  })
})
