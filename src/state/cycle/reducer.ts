import { createReducer } from '@reduxjs/toolkit'
import { addCyclePage, addCycle } from './actions'
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
  cycles: {
    [cycleNumber: number]: CycleData
  }
}
export const initalState: CycleState = {
  cyclePages: {},
  cycles: {},
}
export default createReducer(initalState, (builder) => {
  builder
    .addCase(addCyclePage, (state, { payload: { cycles, page } }) => {
      state.cyclePages[page] = cycles
      cycles.forEach((c) => {
        state.cycles[c.cycle] = c
      })
    })
    .addCase(addCycle, (state, { payload: { cycle } }) => {
      state.cycles[cycle.cycle] = cycle
    })
})
