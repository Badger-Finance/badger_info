import { AccountData, ScoreData, Nft } from './reducer'
import { createAction } from '@reduxjs/toolkit'

export const updateAccountData = createAction<{ address: string; accountData: AccountData }>('account/updateBalances')
export const updateScoreData = createAction<{ address: string; scoreData: Array<ScoreData> }>('account/updateScoreData')
export const updateNftData = createAction<{
  address: string
  nftData: Array<Nft>
}>('account/updateNftData')
