import { createAction } from '@reduxjs/toolkit'
import { BoostData, UnlockSchedules } from './reducer'
export const updateBoostData = createAction<{ boosts: Array<BoostData> }>('boosts/updateBoostData')
export const updateUnlockSchedules = createAction<{ schedules: UnlockSchedules }>('boosts/updateUnlockSchedules')
