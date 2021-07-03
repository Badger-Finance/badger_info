import { AccountData, ScoreData } from './reducer'
import { createAction } from '@reduxjs/toolkit'

export const updateAccountData = createAction<{ address: string; accountData: AccountData }>('account/updateBalances')
export const updateScoreData = createAction<{ address: string; scoreData: Array<ScoreData> }>('account/updateScoreData')
