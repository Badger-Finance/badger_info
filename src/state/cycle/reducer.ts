import { createReducer } from '@reduxjs/toolkit'
import { addCyclePage, addCycle, addCycleError, addHarvestData } from './actions'
export interface CycleData {
  cycle: number
  merkleRoot: string
  contentHash: string
  startBlock: number
  endBlock: number
}

interface Token {
  address: string
  symbol: string
}

export interface TokenDist {
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
  errors: {
    [cycleNumber: number]: boolean
  }
  harvests: Array<any>
}
export const initalState: CycleState = {
  cyclePages: {},
  harvests: [],
  cycles: {},
  errors: {},
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
    .addCase(addCycleError, (state, { payload: { cycleNumber, errorStatus, error } }) => {
      state.errors[cycleNumber] = errorStatus
    })
    .addCase(addHarvestData, (state, { payload: { harvests } }) => {
      state.harvests = harvests
    })
})
