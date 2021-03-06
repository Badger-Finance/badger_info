import { createAction } from '@reduxjs/toolkit'
import { CycleData } from './reducer'
export const addCyclePage = createAction<{ cycles: Array<CycleData>; page: number }>('cycle/addCyclePage')
export const addCycle = createAction<{ cycle: CycleData }>('cycle/addCycle')
export const addCycleError = createAction<{ cycleNumber: number; errorStatus: boolean; error?: string }>(
  'cycle/addCycleError'
)
export const addHarvestData = createAction<{ harvests: any }>('cycle/addHarvestData')
