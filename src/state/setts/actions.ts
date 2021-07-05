import { SettInfo, WhaleInfo } from './reducer'
import { createAction } from '@reduxjs/toolkit'

// protocol wide info
export const updateSettData = createAction<{ setts: Array<SettInfo> }>('setts/updateSettData')
export const updateWhaleData = createAction<{ vault: string; whales: Array<WhaleInfo> }>('setts/updateWhaleInfo')
