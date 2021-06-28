import { createAction } from '@reduxjs/toolkit'
import { BoostData } from './reducer'
export const updateBoostData = createAction<{ boosts: Array<BoostData> }>('boosts/updateBoostData')
