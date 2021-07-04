import { SettInfo } from './reducer'
import { createAction } from '@reduxjs/toolkit'

// protocol wide info
export const updateSettData = createAction<{ setts: Array<SettInfo> }>('setts/updateSettData')
